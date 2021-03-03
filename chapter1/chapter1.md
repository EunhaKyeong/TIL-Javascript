1. ==, != 대신 ===, !== 사용하기
2. undefined : 자료형 종류 중 하나, 선언만 되고 값은 넣어지지 않은 변수.
3. null : 자료형 종류 중 하나. 빈 값
4. 
```javascript
var test;
```
이때 test는 undefined
``` javascript
test = 10;
```
여기서 test를 다시 빈 값으로 만들고 싶을 때
``` javascript
test = undefined
```
도 되고, 
``` javascript
test = null 
```
둘 다 가능하다. 하지만 **undefined는 쓰지 말고 null을 사용하자.**

5. null과 ""
null은 빈값이고 ""은 문자이다.
6. 자바스크립트에서는 문자열을 만들 때 작은 따음표를 가장 많이 쓴다.
7. NaN : 자료형 종류 중 하나. Not a Number. 숫자형