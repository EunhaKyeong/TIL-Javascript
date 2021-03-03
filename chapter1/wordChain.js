//끝말잇기 만들기

var word = "쌀과자";

alert("끝말잇기를 시작합니다! 첫단어 : " + word);
while(true) {
    var nextWord = prompt("단어를 입력하세요 현재 단어 : " + word);
    if (word[word.length-1]===nextWord[0]) {
        word = nextWord;
    } else {
        alert("끝말잇기를 종료합니다.");
        break;
    }
}