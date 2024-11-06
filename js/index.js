
// 获取每日答案
const date = new Date();
const xhr = new XMLHttpRequest();
let solutionArray;
xhr.responseType = 'json';
xhr.open('GET', `https://wordle.geek-tech.group/api/wordle/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay().toString().padStart(2, '0')}`);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        solution = xhr.response.solution;
        solutionArray = xhr.response.solution.toUpperCase().split('');
        console.log('成功获取结果');
        
    }
};
 


//屏幕键盘输入
let currentRow = 0;
let currentCol = 0;
let inputArray = [];
const letters = document.querySelectorAll('.letter');
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;
        if (keyValue === 'Enter') {
            //没输入完直接return，此时enter不起作用
            if (currentCol !== 5) {
                return;
            }
            // 获取输入数组
            for(let i = (currentRow)*5; i < (currentRow+1)*5 ; i++){
                inputArray.push(letters[i].textContent);
            }
            let count = 0;
            // 检测结果，添加类名
            for (let i = 0; i < 5; i++) {
                letters[currentRow * 5 + i].classList.remove('white');
                if (inputArray[i] === solutionArray[i]) {
                    count++;
                    letters[currentRow * 5 + i].classList.add('green');
                    keys.forEach(key => {
                        if (key.textContent === inputArray[i]) {
                            key.className = '';
                            key.classList.add('key','green');
                        }
                    });
                } else if (solutionArray.includes(inputArray[i])) {
                    letters[currentRow * 5 + i].classList.add('yellow');
                    keys.forEach(key => {
                        if (key.textContent === inputArray[i]) {
                            key.className = '';
                            key.classList.add('key','yellow');
                        }
                    });
                } else {
                    letters[currentRow * 5 + i].classList.add('gray');
                    keys.forEach(key => {
                        if (key.textContent === inputArray[i]) {
                            key.className = '';
                            key.classList.add('key','gray');
                        }
                    });
                }
            }
            if (count === 5) {
                alert('你过关！(过关的小曲~~)');
            }
            count = 0;
            inputArray = [];
            currentRow++;
            currentCol = 0;
            return;
        }
        if (keyValue === 'Del') {
            if (currentCol > 0) {
                letters[currentRow * 5 + --currentCol].textContent = '';
                letters[currentRow * 5 + currentCol].classList.add('original');
                letters[currentRow * 5 + currentCol].classList.remove('white');
                
            }
            return;
        }
        // 处理普通字母键
        if (currentCol < 5) {
            letters[currentRow * 5 + currentCol].textContent = keyValue;
            letters[currentRow * 5 + currentCol].classList.remove('original');
            letters[currentRow * 5 + currentCol].classList.add('white');
            currentCol++;
        }
    });
    key.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
});

//物理键盘输入
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();

    if (key === 'ENTER') {
        document.getElementById('enter').click();
        return;
    }
    if (key === 'BACKSPACE' || key === 'DELETE') {
        document.getElementById('del').click();
        return;
    }

    // 普通字母键处理
    keys.forEach((keyElement) => {
        if (keyElement.textContent === key) {
            keyElement.click();
        }
    });
});
