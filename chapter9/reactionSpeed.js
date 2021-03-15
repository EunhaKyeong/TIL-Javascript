var div = document.querySelector('div');
var startTime;  //시작시간
var endTime;    //종료시간
var result = document.createElement('p');   //결과 p 태그
var chageColorFunc;

div.addEventListener('click', function() {
    var divClass = div.classList;
    if (divClass.contains('blue')) {    //파란색 -> 빨간색
        divClass.remove('blue');
        divClass.add('red');
        div.textContent = '초록색으로 바뀌면 클릭하세요!';

        //1초~3초 사이의 랜덤 초 후 click
        chageColorFunc = setTimeout(function() {
                            startTime = new Date(); //시작!
                            div.click();    //빨간색 -> 초록색
                        }, Math.random()*(2001)+1000);
    } else if (divClass.contains('red')) {  //빨간색 -> 초록색
        divClass.remove('red');
    
        if (!startTime) {   //초록색으로 바뀌기 전에 누르면
            clearTimeout(chageColorFunc);
            divClass.add('blue');
            div.textContent = '너무 빨리 눌렀습니다! 다시 시작하세요!';
        } else {
            divClass.add('green');
        }
    } else {    //초록색 -> 파란색
        endTime = new Date();    //종료!

        divClass.remove('green');
        divClass.add('blue');
        div.textContent = '클릭하면 시작합니다!';
        div.appendChild(result).textContent = endTime-startTime + ' ms';

        startTime = null;
    }
})