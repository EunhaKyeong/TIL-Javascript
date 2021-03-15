var tbody = document.querySelector('tbody'); 
var boardArr = Array();   //지뢰 후보군 배열

document.querySelector("#startBtn").addEventListener("click", function() {
    tbody.innerHTML = '';   //테이블 초기화
    boardArr = []; //지뢰 후보군 배열 초기화
    var isStart = true;    //첫 판인지 판단하는 변수(첫 판이면 true, 아니면 false)
    var isEnd = false;  //게임 종료됐는지 판단하는 변수(종료됐으면 true, 아니면 false)

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

    //지뢰찾기 표 만들기
    for (var i=0; i<row; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (var j=0; j<col; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);

            //마우스 왼쪽 클릭했을 때
            td.addEventListener("click", function(e) { 
                var currentTd = e.currentTarget;
                var clickedMine = col*currentTd.parentElement.rowIndex + currentTd.cellIndex    //클릭한 칸의 인덱스
                //currentTd.classList[0]==='clickedTd'
                if (isEnd===true || currentTd.classList.contains('clickedTd') || ['!', '?'].includes(currentTd.textContent)) { //게임이 종료됐으면
                    return false;
                }

                currentTd.classList.add("clickedTd");   //클릭된 곳 색 변경
                if (mineArr.indexOf(clickedMine)!==-1) {    //클릭한 칸에 지뢰가 심어져 있으면
                    if (isStart===true) {   //첫 판에서 지뢰 클릭하면 지뢰를 새로 추가해야 한다.
                        isStart = false;    //이제 첫번째 판 아니므로 false로 변경
                        mineArr.splice(mineArr.indexOf(clickedMine), 1);    //지뢰 배열에서 클릭된 칸 삭제
                        var addedMine = boardArr.splice(Math.floor(Math.random()*boardArr.length), 1)[0];   //새롭게 추가된 지뢰의 인덱스
                        mineArr.push(addedMine);    //지뢰 배열에 추가된 지뢰 요소 추가
                    } else {
                        currentTd.textContent = '펑';
                        isEnd = true;
                        alert('게임 종료!');
                        //지뢰 심기(인덱스 기준)
                        for (var index=0; index<mineArr.length; index++) {
                            var mine = mineArr[index];
                            document.querySelectorAll("tr")[parseInt(mine/col)].children[mine%col].textContent='X';
                        }

                        return false;
                    }
                }    //일반칸이면
                if (isStart===true) {
                    isStart = false;
                }
                    
                var aroundArr = [];  //aroundArr : 주변 칸 인덱스값 배열
                var rowIndex = currentTd.parentElement.rowIndex;  //클릭한 칸의 행 인덱스
                var cellIndex = currentTd.cellIndex;  //클릭한 칸의 열 인덱스
                
                //클릭된 칸을 기준으로 둘러싸인 칸의 인덱스 배열
                if (rowIndex===0 && cellIndex===0) {
                    aroundArr = [1, clickedMine+col, 1+col];
                } else if (rowIndex===0 && cellIndex===col-1) {
                    aroundArr = [clickedMine-1, clickedMine-1+col, clickedMine+col];
                } else if (rowIndex===row-1 && cellIndex===0) {
                    aroundArr = [clickedMine-col, clickedMine-col+1, clickedMine+1];
                } else if (rowIndex===row-1 && cellIndex===col-1) {
                    aroundArr = [clickedMine-col-1, clickedMine-col, clickedMine-1];
                } else if (rowIndex===0) {
                    aroundArr = [clickedMine-1, clickedMine+1, clickedMine-1+col, clickedMine+col, clickedMine+1+col];
                } else if (rowIndex===row-1) {
                    aroundArr = [clickedMine-1-col, clickedMine-col, clickedMine+1-col, clickedMine-1, clickedMine+1];
                } else if (cellIndex===0) {
                    aroundArr = [clickedMine-col, clickedMine-col+1, clickedMine+1, clickedMine+col, clickedMine+1+col];
                } else if (cellIndex===col-1) {
                    aroundArr = [clickedMine-1-col, clickedMine-col, clickedMine-1, clickedMine-1+col, clickedMine+col];
                } else {
                    aroundArr = [clickedMine-1-col, clickedMine-col, clickedMine+1-col, 
                                 clickedMine-1, clickedMine+1, 
                                 clickedMine-1+col, clickedMine+col, clickedMine+1+col];
                }              

                //주변 지뢰 개수
                var aroundMineCnt = aroundArr.filter(
                    function(around) {
                        return mineArr.indexOf(around) !== -1;
                    }).length;

                if (aroundMineCnt===0) { //주변에 지뢰가 없으면
                    aroundArr.map(
                        function(around) {
                            around = document.querySelectorAll("tr")[parseInt(around/col)].children[around%col];
                            //아직 열리지 않은 것들만 click();
                            if (around.classList[0]!=='clickedTd') {
                                around.click();
                            }
                        })
                } else {
                    currentTd.textContent = aroundMineCnt;
                }
            });

            //마우스 오른쪽 클릭했을 때 : '' or 'X' -> '!', '!' -> '?', '?' -> ''
            td.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                isStart = false;
                //e.currentTarget.classList[0]==='clickedTd'
                if (isEnd===true || e.currentTarget.classList.contains('clickedTd') || !['', '!', '?'].includes(e.currentTarget.textContent)) {
                    e.preventDefault();
                } else if (['', 'X'].includes(e.currentTarget.textContent)) {
                    e.currentTarget.textContent = '!';
                } else if (e.currentTarget.textContent==='!') {
                    e.currentTarget.textContent = '?';
                } else {
                    e.currentTarget.textContent = '';
                }
            });
        }
    }
});

