var tbody = document.querySelector('tbody'); 
var boardArr = Array();   //지뢰 후보군 배열
var isStart = true;    //첫 판인지 판단하는 변수(첫 판이면 true, 아니면 false)
var isEnd = false;  //게임 종료됐는지 판단하는 변수(종료됐으면 true, 아니면 false)

document.querySelector("#startBtn").addEventListener("click", function() {
    tbody.innerHTML = '';   //테이블 초기화
    boardArr = []; //지뢰 후보군 배열 초기화

    // 입력받은 테이블 줄, 칸, 지뢰갯수
    var row = Number(document.querySelector("#row").value);
    var col = Number(document.querySelector("#col").value);
    var mine = Number(document.querySelector("#mine").value);
    var totalCell = row*col;    //전체 칸 수

    if (mine>totalCell) {
        alert('지뢰가 전체 칸보다 더 많습니다. 다시 입력하세요.')

        return false;
    }
    
    //지뢰 랜덤으로 추출하기(인덱스 기준)
    for (var index=0; index<totalCell; index++) {
        boardArr.push(index);
    }
    var mineArr = [];
    for (var cnt=0; cnt<mine; cnt++) {
        mineArr.push(boardArr.splice(Math.floor(Math.random()*boardArr.length), 1)[0]);
    }
    console.log(mineArr);

    //지뢰찾기 표 만들기
    for (var i=0; i<row; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (var j=0; j<col; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);

            //마우스 왼쪽 클릭했을 때
            td.addEventListener("click", function(e) { 
                if (isEnd===true) {
                    e.preventDefault();
                } else if (e.currentTarget.textContent==='X') {    //클릭한 칸에 지뢰가 심어져 있으면
                    if (isStart===true) {   //첫 판에서 지뢰 클릭하면 지뢰를 새로 추가해야 한다.
                        isStart = false;    //이제 첫번째 판 아니므로 false로 변경
                        var clickedMine = col*e.currentTarget.parentElement.rowIndex + e.currentTarget.cellIndex    //클릭한 칸의 인덱스
                        e.currentTarget.textContent = '';   //클릭된 칸은 이제 지뢰 없으니까 빈 칸
                        mineArr.splice(mineArr.indexOf(clickedMine), 1);    //지뢰 배열에서 클릭된 칸 삭제
                        var addedMine = boardArr.splice(Math.floor(Math.random()*boardArr.length), 1)[0];   //새롭게 추가된 지뢰의 인덱스
                        mineArr.push(addedMine);    //지뢰 배열에 추가된 지뢰 요소 추가
                        document.querySelectorAll("tr")[parseInt(addedMine/col)].children[addedMine%col].textContent='X';   //추가된 칸에 지뢰 표시
                    } else {
                        e.currentTarget.textContent = '펑';
                        isEnd = true;
                        alert('게임 종료!');
                    }
                } else {
                    if (isStart===true) {
                        isStart = false;
                    }
                }
            });
        }
    }

    //지뢰 심기(인덱스 기준)
    for (var index=0; index<mineArr.length; index++) {
        var mine = mineArr[index];
        document.querySelectorAll("tr")[parseInt(mine/col)].children[mine%col].textContent='X';
    }
});

