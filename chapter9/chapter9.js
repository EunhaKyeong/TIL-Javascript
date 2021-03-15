//classList.contains()
var div = document.querySelector('div');
console.log(div.classList.contains('contains'));

//Date()
var now = new Date();   //Date 객체 생성
console.log(now);
//웹 페이지의 한 곳을 클릭했을 때의 시간에서 처음 로딩된 시간을 뺀 시각을 출력한다.
document.addEventListener('click', function() {
    var clickedTime = new Date();
    console.log('clickedTime - now : ', clickedTime-now);
});

//performance.now()
var now = performance.now();
console.log(now);
document.addEventListener('click', function() {
    var clickedTime = performance.now();
    console.log('clickedTime - now : ', clickedTime-now);
});

//console.time(), console.timeEnd()
console.time('test');
document.addEventListener('click', function() {
    console.timeEnd('test');
});

//call stack
function a() {
    console.log('a');   
    function b() {
        c();
        function c() {
            console.log('c');
            function d() {
                console.log('d');
            }
            d();
        }
        console.log('b');
    }
    b();
}

a();

//call stack(재귀함수)
function e() {
    console.log('e');
    setTimeout(function() {
        e();
    }, 0);
}
e();