# Chapter9 요점정리
### `classList.contains()`
해당 element가 contains() 안의 클래스를 가지고 있는지 판단하는 메서드.
```html
<div id="contains">
    contains이란 클래스를 포함하고 있나요?
</div>

<script src="chapter9.js"></script>
```
```javascript
var div = document.querySelector('div');
console.log(div.classList.contains('contains'));
```
![image](https://user-images.githubusercontent.com/66666533/111130508-a1ce5f80-85ba-11eb-92ab-6caaa3336613.png)
<hr>

### javascript의 타이머 기능
1. `Date() 객체`
    ```javascript
    var now = new Date();   //Date 객체 생성
    console.log(now);
    //웹 페이지의 한 곳을 클릭했을 때의 시간에서 처음 로딩된 시간을 뺀 시각을 출력한다.
    document.addEventListener('click', function() {
        var clickedTime = new Date();
        console.log('clickedTime - now : ', clickedTime-now);
    });
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111138452-4b195380-85c3-11eb-8d86-a57450f69f97.png)
    이 때 시간의 단위는 `ms`이므로 clickedTime - now는 1.91초 이다.

2. `performance.now()`
    ```javascript
    var now = performance.now();
    console.log(now);
    document.addEventListener('click', function() {
        var clickedTime = performance.now();
        console.log('clickedTime - now : ', clickedTime-now);
    });
    ```

    ![image](https://user-images.githubusercontent.com/66666533/111138923-dc88c580-85c3-11eb-92b7-c76039cea0db.png)

    now는 문서가 로딩되는데 걸린 시간이다. performance.now()의 시간 단위도 `ms`이다.<br>
    Date()와 performance.now()의 차이는 `Date()는 날짜 개념이라면 performance.now()는 시간(ms초)의 개념`이고, `performance.now()가 좀 더 정밀하게 소숫점 단위까지 보여준다`는 것이다.  

3. `console.time(), console.timeEnd()`
    ```javascript
    console.time('test');
    document.addEventListener('click', function() {
        console.timeEnd('test');
    });
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111146567-f1b62200-85cc-11eb-9a6f-d68fb348247a.png)

    console.time('test')로 'test' 타이머를 실행하고, console.timeEnd('test')로 'test' 타이머를 종료한다. timeEnd가 될 때까지의 시간을 출력한다. 여기서 주의할 점은 console.time(`'test'`)이면 console.timeEnd(`'test'`)여야 한다. 'test1', 'test2', ... 와 같이 'test'와 다르면 안된다.  
<hr>  

### 호출 스택(call stack)
`비동기 함수는 실행이 끝나면 바로 call stack에서 빠져나간다.`
```javascript
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
```
![image](https://user-images.githubusercontent.com/66666533/111151183-748dab80-85d2-11eb-86bc-748c7945adf3.png)

1. a() 호출, call stack에 a 추가
2. console.log('a'); call stack 추가&실행
3. console.log('a'); call stack 삭제
4. b() 호출, call stack에 b 추가
5. c() 호출, call stack에 c 추가
6. console.log('c'); call stack 추가&실행
7. console.log('c'); call stack 삭제
8. d() 호출, call stack에 d 추가
9. console.log('d'); call stack 추가&실행
10. console.log('d'); call stack 삭제
11. d() call stack 삭제
12. console.log('b'); call stack 추가&실행
13. console.log('b'); call stack 삭제
14. c() call stack 삭제
15. b() call stack 삭제
16. a() call stack 삭제
<hr>

### 재귀 함수와 call stack
```javascript
function a() {
    a();
}

a();
```
위와 같은 재귀함수 a가 있다. 이 함수의 call stack을 표현해보면 아래와 같다.

<img src="https://user-images.githubusercontent.com/66666533/111156526-2fb94300-85d9-11eb-80ca-cd0001afca73.jpg" width=300px; height=400px;>

call stack에는 지정된 크기가 있기 때문에 call stack이 넘치게 되면 `Maximum call stack exceeded error`가 발생한다.

이를 해결하는 방법은 아래와 같다.
```javascript
function a() {
    console.log('a');
    setTimeout(function() {
        a();
    }, 0);
}

a();
```
1. a()를 호출하고 call stack에 a()가 쌓인다.
2. console.log('a')가 call stack에 쌓인다.
3. console.log('a')가 실행된다.
4. console.log('a')가 call stack에서 빠져나온다.
5. setTimeout()이 call stack에 쌓인다.
6. setTimeout() 안의 function은 다른 공간에 저장된다.
7. setTimeout()은 할 일이 끝났기 때문에 call stack에서 빠져나온다.
8. a()도 call stack에서 빠져나온다.
9. 다른 공간에 저장돼 있던 function()은 시간에 맞춰(여기서는 0) call stack에 저장된다.
10. a()를 호출하고 call stack에 a()가 쌓인다.
11. 2~8의 과정
12. function()도 call stack을 빠져나온다.
13. 5~12의 과정이 계속 반복된다.