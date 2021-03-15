var table = document.getElementsByTagName("table")[0];
var turn = 'X'; //차례. 'X' : 나, 'O' : 컴퓨터
var isEnd = false;  //게임 끝났는지 체크
var tttArray = [];  //전체 3X3 2차원 배열
var clickableArr = [];  //3X3 2차원 배열을 1차원으로 펼친 배열
var tttRows = [];   //row를 가지고 있는 1차원 배열

//한 줄이 완성됐는지 확인하는 함수
function checkOneline(clicked) {
    for (var i=0; i<3; i++) {   //row or col이 같은지 체크
        //row 같은지
        if (tttArray[i][0].textContent===tttArray[i][1].textContent&&tttArray[i][1].textContent===tttArray[i][2].textContent) {
            if (tttArray[i][0].textContent!==''&&tttArray[i][1].textContent!==''&&tttArray[i][2].textContent!=='') {
                alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                isEnd = true;
                break;
            }
        }
        //col 같은지 
        else if (tttArray[0][i].textContent===tttArray[1][i].textContent&&tttArray[1][i].textContent===tttArray[2][i].textContent) {
            if (tttArray[0][i].textContent!==''&&tttArray[1][i].textContent!==''&&tttArray[2][i].textContent!=='') {
                alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                isEnd = true;
                break;
            }
        }
    }
    //대각선방향(왼->오)
    if (tttArray[0][0].textContent!==''&&tttArray[1][1].textContent!==''&&tttArray[2][2].textContent!=='') { 
        if (tttArray[0][0].textContent===tttArray[1][1].textContent&&tttArray[1][1].textContent===tttArray[2][2].textContent) {
            alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
            isEnd = true;
        }
    }
    //대각선방향(오->왼)
    if (tttArray[0][2].textContent!==''&&tttArray[1][1].textContent!==''&&tttArray[2][0].textContent!=='') { 
        if (tttArray[0][2].textContent===tttArray[1][1].textContent&&tttArray[1][1].textContent===tttArray[2][0].textContent) {
            alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
            isEnd = true;
        }
    }
    
    return isEnd;
}

//칸 클릭 시 이벤트 함수
var tdClick = function(event) {
    var clicked = event.target;

    if (isEnd===true) { //게임이 종료됐으면
        alert("게임이 종료되었습니다. 다시 시작하세요!");
    } else if (clicked.textContent==='') {    //클릭한 칸이 비어있으면
        clicked.textContent = turn;
        clickableArr.splice(clickableArr.indexOf(clicked), 1);

        if (clickableArr.length===0) {
            alert("무승부입니다!");
            isEnd = true;
            return false;
        }

        if (checkOneline(clicked)) {    //내가 이겼으면 클릭이벤트 함수 실행 중단
            return false;
        } else {    //아니면 컴퓨터 차례
            turn = 'O';
        }
        
        //컴퓨터 차례
        setTimeout(function() {
            clicked = clickableArr[Math.floor(Math.random()*clickableArr.length)];
            clicked.textContent = 'O';
            clickableArr.splice(clickableArr.indexOf(clicked), 1);

            if (checkOneline(clicked)) {
                return false;
            } else {
                turn = 'X';
            }
        }, 1000);
        
    } else {    //비어있지 않으면
        alert("이미 클릭된 칸입니다.");
    }
};

//다시 시작 버튼을 클릭하면 테이블의 모든 내용이 삭제됨.
function restart() {
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            tttArray[i][j].textContent = '';
        }
    }
    clickableArr = clickableArr.splice().concat(tttArray[0], tttArray[1], tttArray[2]);  //tttArray 2차원 배열을 1차원 배열로
    isEnd = false;
    turn = 'X';
};

//3X3 배열 만들기
for (var i=0; i<3; i++) {
    var tmpArray = [];
    var row = table.children[0].children[i];
    tttRows.push(row);
    for (var j=0; j<3; j++) {
        row.children[j].addEventListener("click", tdClick);
        tmpArray.push(row.children[j]);
    }
    tttArray.push(tmpArray);
}

clickableArr = clickableArr.concat(tttArray[0], tttArray[1], tttArray[2]);  //tttArray 2차원 배열을 1차원 배열로

document.getElementsByTagName("button")[0].addEventListener("click", restart);