/*6 : 가위 -165 : 바위 -343 : 보*/
var gawebaweboPositionXDict = {
    '보' : '-343px', 
    '바위' : '-165px', 
    '가위' : '6px'
};

var scores = {
    '가위' : 0, 
    '바위' : 1, 
    '보' : 2
};

var gawebaweboPositionXEntries = Object.entries(gawebaweboPositionXDict)
var gawebaweboPositionX = '';
var gawebaweboInterval = setInterval(function() {
    gawebaweboPositionX = document.querySelector("#gawebawebo").style.backgroundPositionX;
    if (gawebaweboPositionX==='-165px') {   //바위면 보로
        gawebawebo.style.backgroundPositionX = '-343px';    
    } else if (gawebaweboPositionX==='-343px') {    //보면 가위로
        gawebawebo.style.backgroundPositionX = '6px';
    } else {    //가위면 바위로
        gawebawebo.style.backgroundPositionX = '-165px';
    }
}, 100);

document.querySelectorAll(".btn").forEach(function(b) {
    b.addEventListener("click", function() {
        gawebaweboPositionX = document.querySelector("#gawebawebo").style.backgroundPositionX;  //클릭했을 때 컴퓨터의 그림 좌표

        clearTimeout(gawebaweboInterval);   //잠시 Interval 중단
        var computerTurn = Object.entries(gawebaweboPositionXDict).find(function(entriy) {
            return entriy[1]===gawebaweboPositionX; //좌표를 가지고 가위인지, 바위인지, 보인지를 알아냄.
        })[0];

        var score = scores[this.textContent] - scores[computerTurn];  //내 점수-컴퓨터점수
        if (score==0) {
            alert("비겼습니다.");
        } else if ([-1, 2].includes(score)) {
            alert("졌습니다.");
        } else {
            alert("이겼습니다.");
        }

        //다시 Interval 시작
        setTimeout(function() {
            gawebaweboInterval = setInterval(function() {
                gawebaweboPositionX = document.querySelector("#gawebawebo").style.backgroundPositionX;
                if (gawebaweboPositionX==='-165px') {
                    gawebawebo.style.backgroundPositionX = '-343px';
                } else if (gawebaweboPositionX==='-343px') {
                    gawebawebo.style.backgroundPositionX = '6px';
                } else {
                    gawebawebo.style.backgroundPositionX = '-165px';
                }
            }, 100);
        }, 0);
        

    });
});