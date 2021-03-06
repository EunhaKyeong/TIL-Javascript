var turn = 'X'; //차례. 처음은 X부터 시작.
var isEnd = false;  //게임 끝났는지 체크

//칸 클릭 시 이벤트 함수
var tdClick = function(event) {
    var clicked = event.target;
    
    if (isEnd===true) { //게임이 종료됐으면
        alert("게임이 종료되었습니다. 다시 시작하세요!");
    } else if (clicked.textContent===' ') {    //클릭한 칸이 비어있으면
        clicked.textContent = turn;
        if (clicked.textContent==='X')
            turn = 'O';
        else 
            turn = 'X';

        for (var i=0; i<3; i++) {   //row or col이 같은지 체크
            //row 같은지
            if (tttArray[i][0].textContent===tttArray[i][1].textContent&&tttArray[i][1].textContent===tttArray[i][2].textContent) {
                if (tttArray[i][0].textContent!==' '&&tttArray[i][1].textContent!==' '&&tttArray[i][2].textContent!==' ') {
                    alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                    isEnd = true;
                    break;
                }
            }
            //col 같은지 
            else if (tttArray[0][i].textContent===tttArray[1][i].textContent&&tttArray[1][i].textContent===tttArray[2][i].textContent) {
                if (tttArray[0][i].textContent!==' '&&tttArray[1][i].textContent!==' '&&tttArray[2][i].textContent!==' ') {
                    alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                    isEnd = true;
                    break;
                }
            }
        }
        //대각선방향(왼->오)
        if (tttArray[0][0].textContent!==' '&&tttArray[1][1].textContent!==' '&&tttArray[2][2].textContent!==' ') { 
            if (tttArray[0][0].textContent===tttArray[1][1].textContent&&tttArray[1][1].textContent===tttArray[2][2].textContent) {
                alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                isEnd = true;
            }
        }
        //대각선방향(오->왼)
        if (tttArray[0][2].textContent!==' '&&tttArray[1][1].textContent!==' '&&tttArray[2][0].textContent!==' ') { 
            if (tttArray[0][2].textContent===tttArray[1][1].textContent&&tttArray[1][1].textContent===tttArray[2][0].textContent) {
                alert("게임이 종료되었습니다!\n" + clicked.textContent + "승리!");
                isEnd = true;
            }
        }
    } else {    //비어있지 않으면
        alert("값이 들어있으면 변경할 수 없습니다.");
    }
};

//다시 시작 버튼을 클릭하면 테이블의 모든 내용이 삭제됨.
function restart() {
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            tttArray[i][j].textContent = ' ';
        }
    }
    isEnd = false;
    turn = 'X';
};

//3X3 배열 만들기
var table = document.getElementsByTagName("table")[0];
var tttArray = [];  //전체 3X3 2차원 배열
var tttRows = [];   //row를 가지고 있는 1차원 배열
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
document.getElementsByTagName("button")[0].addEventListener("click", restart);