//toggle()
var div = document.querySelector('div');
div.addEventListener('click', function() {
    this.classList.toggle('toggle');
});

//복사(깊은 복사)
var str1 = 'test';
var str2 = str1;
var str2 = 'testtest';
console.log('str1 : ', str1);
console.log('str2 : ', str2);

//참조(얕은 복사)
var arr1 = {'a':'A', 'b':'B', 'c':'C'};
var arr2 = arr1;

arr2.a= 'D';
console.log('arr1.a : ' + arr1.a);
console.log('arr2.a : ' + arr2.a);

//객체를 복사(깊은 복사) 하는 법 - 딕셔너리
var arr1 = {'a':'A', 'b':'B', 'c':'C'};
var arr2 = {};
Object.keys(arr1).forEach(function(key) {
    arr2[key] = arr1[key];
});

arr2.a= 'D';
console.log('arr1.a : ' + arr1.a);
console.log('arr2.a : ' + arr2.a);

//위의 방법으로 깊은 복사했을 때 복사가 되지 않는 객체 예시 - 딕셔너리
var arr1 = {'a':'A', 'b':'B', 'c':{'d':'D'}};
var arr2 = {};
Object.keys(arr1).forEach(function(key) {
    arr2[key] = arr1[key];
});

arr2.a = 'D';
console.log('arr1.a : ' + arr1.a);
console.log('arr2.a : ' + arr2.a);

arr2.c.d = 'E';
console.log('arr1.c.d : ' + arr1.c.d);
console.log('arr2.c.d : ' + arr2.c.d);

//객체를 복사하는 법 - 배열
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.slice();
arr2[0] = 6;    //1->6
console.log('arr1[0] : ' + arr1[0]);
console.log('arr2[0] : ' + arr2[0]);

//2단계 이상일 때 객체를 복사하는 법
var obj1 = [1, 2, 3, [4, 5], 6, 7];
var obj2 = JSON.parse(JSON.stringify(obj1));

obj2[3][0] = 8;
console.log('obj1[3][0] : ' + obj1[3][0]);
console.log('obj2[3][0] : ' + obj2[3][0]);

//두 객체가 참조 관계인지 파악하는 법
var arr1 = {'a':'A', 'b':'B', 'c':{'d':'D'}};
var arr2 = {};
arr1 = arr2;
console.log(arr1===arr2);