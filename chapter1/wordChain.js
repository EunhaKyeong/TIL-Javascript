var body = document.body;
var word = document.createElement("div");
word.textContent = "쌀과자";
body.append(word);
var form = document.createElement("form");
body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);

form.addEventListener("submit", function(event) {//콜백함수, 익명함수
    event.preventDefault(); //form submit 시 다른 페이지로 넘어가도록 돼 있어서 새로고침됨. 이를 막기 위한 메서드.
    if (word.textContent[word.textContent.length-1]===input.value[0]) {
        alert("정답입니다!");
        word.textContent = input.value;
        input.value = null;
        input.focus();
    } else {
        alert("틀렸습니다!");
        input.focus();
    }
});

//끝말잇기 만들기
// var word = "쌀과자";

// alert("끝말잇기를 시작합니다! 첫단어 : " + word);
// while(true) {
//     var nextWord = prompt("단어를 입력하세요 현재 단어 : " + word);
//     if (word[word.length-1]===nextWord[0]) {
//         word = nextWord;
//     } else {
//         alert("끝말잇기를 종료합니다.");
//         break;
//     }
// }