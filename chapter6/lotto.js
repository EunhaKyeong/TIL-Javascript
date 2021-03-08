var ballArr = Array(45).fill(null).map(function(ball, index) {
    return index+1;
});

//랜덤으로 뽑힌 값을 배열 맨 뒤로 보낸다.
//길이가 -1씩 줄어든다.(크기가 10인 배열에서 처음에 인덱스 0~9 범위의 요소에서 뽑았다면 그 다음에는 인덱스 0~8 범위의 요소에서 뽑는다.)
for (var i=ballArr.length-1; i>0; i--) {
    var randomIdx = Math.floor(Math.random()*(i+1));
    var temp = ballArr[i];
    ballArr[i] = ballArr[randomIdx];
    ballArr[randomIdx] = temp;
}

var winBall = ballArr.slice(0, 6);
var bonusBall = ballArr[ballArr.length-1];

function showLottoBall(num, idName) {
    var ballDiv = document.createElement("div");

    ballDiv.textContent = num;
    ballDiv.style.display = 'inline-block';
    ballDiv.style.border = '1px solid black';
    ballDiv.style.borderRadius = '20px';
    ballDiv.style.width = '40px';
    ballDiv.style.height = '40px';
    ballDiv.style.textAlign = 'center';
    ballDiv.style.marginLeft = '10px';
    ballDiv.style.fontSize = '25px';

    if (num <= 9) {
        ballDiv.style.backgroundColor = "red";
    } else if (num <= 19) {
        ballDiv.style.backgroundColor = "orange";
    } else if (num <= 29) {
        ballDiv.style.backgroundColor = "yellow";
    } else if (num <= 39) {
        ballDiv.style.backgroundColor = "blue";
    } else {
        ballDiv.style.backgroundColor = "green";
    }
    
    document.querySelector(idName).appendChild(ballDiv);
};

setTimeout(function() {showLottoBall(winBall[0], "#win-container")}, 1000);
setTimeout(function() {showLottoBall(winBall[1], "#win-container")}, 2000);
setTimeout(function() {showLottoBall(winBall[2], "#win-container")}, 3000);
setTimeout(function() {showLottoBall(winBall[3], "#win-container")}, 4000);
setTimeout(function() {showLottoBall(winBall[4], "#win-container")}, 5000);
setTimeout(function() {showLottoBall(winBall[5], "#win-container")}, 6000);
setTimeout(function() {showLottoBall(bonusBall, "#bonus-container")}, 7000);

