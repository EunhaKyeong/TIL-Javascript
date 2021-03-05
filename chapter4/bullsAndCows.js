//숫자야구
var count = 10;
var numArray = setNumArray();

var body = document.body;
var resultDiv = document.createElement("div");
body.append(resultDiv);
var form = document.createElement("form");
body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = '입력';
form.append(button);
var countDiv = document.createElement("div");
countDiv.textContent = '남은 횟수' + count;
body.append(countDiv);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value===numArray.join('')) {  //정답일 때
        alert("정답입니다!");
        input.value = null;
        numArray = setNumArray();
        count = 10;
        countDiv.textContent = '남은 횟수' + count;
    } else if (input.value.length!==4) {    //입력값의 길이가 4가 아닐 때
        alert("4자리 숫자여야 합니다.");
    } else if (count<=0) {
        alert("10번 입력이 완료되어 게임이 종료되었습니다. \n정답 : " + numArray.join(''));
        countDiv.textContent = '남은 횟수 : 0';
    } else {    //틀렸을 때
        alert("틀렸습니다!");
        var strike = 0;
        var ball = 0;
        var inputArray = input.value.split('');

        for (var i=0; i<4; i++) {
            if (Number(inputArray[i])===numArray[i])    //같은 자리의 숫자가 같으면 스트라이크
                strike++;
            else if (inputArray.indexOf(String(numArray[i]))!==-1)  //자리는 달라도 숫자가 numArray에 존재하면 볼
                ball++;
        }

        resultDiv.textContent = strike + 'Strike ' + ball + 'Ball';
        countDiv.textContent = '남은 횟수' + --count;

        if (count<=0) {
            alert("10번 입력이 완료되었습니다. 게임을 종료합니다.\n정답 : " + numArray.join(''));
        }
    }
    
});

function setNumArray() {
    var fullNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numArray = [];
    for (var i=0; i<4; i++) {
        var spliceNum = fullNumArray.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        numArray.push(spliceNum);
    }
    console.log(numArray);

    return numArray;
};