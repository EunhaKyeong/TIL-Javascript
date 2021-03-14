# Chpater8 내용 정리
1. `onContextMenu()` : 마우스 오른쪽 클릭 이벤트 리스너
<hr>

2. `target`과 `currentTarget`의 차이  
아래와 같은 html 파일이 있다. 
    ``` html
    <!--chapter8.html-->
    <body>
        <form id="form">
            <input type="text" value="이름">
            <input type="text" value="나이">
            <input type="submit" value="제출">
        </form>

        <script src="chapter8.js"></script>
    </body>
    ```  
    그리고 form 태그에 click 이벤트 리스너를 추가하는 JS 파일이 있다.
    ```javascript
    //chapter8.js
    document.querySelector("#form").addEventListener("click", function(e) {
        console.log("target : " + e.target);
        console.log("currentTarget : " + e.currentTarget);
    })
    ```

    ![image](https://user-images.githubusercontent.com/66666533/111070873-07691000-8517-11eb-860e-60ac1c4ce4b2.png)

    이름 입력칸을 클릭했을 때 `e.target은 현재 클릭된 입력칸에 대한 정보를 출력`하는 것을 확인할 수 있고, `e.currentTarget은 click event 리스너가 설정돼 있는 form 태그에 대한 정보를 출력`하는 것을 확인할 수 있다.
<hr>

3. `innerHTML`  : 내부 html 코드를 불러온다.
    ```javascript
    //target.js
    var form = document.querySelector("#form");
    console.log(form.innerHTML);
    ```
    [출력결과]
    ![image](https://user-images.githubusercontent.com/66666533/111070914-2d8eb000-8517-11eb-8f15-1c6893593d28.png)
<hr>

4. `Array.filter()` : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환.  
    ```javascript
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var filteredArr = arr.filter(function(a) {
        return a%2==0;  //arr 배열 요소들 중에서 짝수인 요소만 모아 새로운 배열인 filteredArr 생성.
    });
    console.log(filteredArr);
    ```
    [출력결과]
    ![image](https://user-images.githubusercontent.com/66666533/111070940-44cd9d80-8517-11eb-85b2-0d46ecffb543.png)
<hr>

5. `Array.cancat()` : 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환.  

    ```javascript
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.concat([11, 12, 13]);
    console.log(arr);
    arr = arr.concat([11, 12, 13]);
    console.log(arr);
    ```
    [출력결과]
    ![image](https://user-images.githubusercontent.com/66666533/111070967-62026c00-8517-11eb-8e91-8b031e75084a.png)

    `기존 배열에 합쳐지는 것이 아니라 새 배열을 반환한다는거에 주의!`
<hr>

6. 클로저
    ```javascript
    for(var i=1; i<=10; i++) {
        setTimeout(function() {
            console.log(i);
        }, (i-1)*1000);
    }
    ```
    내가 만들고 싶었던 동작은 1~10의 숫자를 1초에 한번씩 출력하도록 하는 동작이다. 하지만 출력 결과에서는 `1초에 한번씩 10만 출력되는 것`을 확인할 것이다. 이것이 바로 `클로저 문제`이다!

    <br>

    ### 발생이유?
    이런 문제가 발생하는 이유는 `for문과 비동기함수인 setTimeout의 내부 익명함수가 서로 다르게 움직이기 때문`이다. 우리가 생각할 땐 for문이 한 번 실행된 후(i=1) 익명함수가 실행되고, 또 다시 for문이 한번 실행되고(i=2), 익명함수가 실행돼야 할 것 같지만 그렇지 않다.
    <br>

    for문이 실행되고 나면 i가 1부터 10까지 변하기 시작한다. 하지만 컴퓨터는 엄청나게 빠른 친구이기 때문에 
    `1초가 되기도 전에 이미 i는 10이 돼 있는 상태`이다. 하지만 setTimeout 내부의 익명함수는 `1초에 한번씩 호출`된다. 그러다 보니 이미 10으로 바껴있는 i밖에 만날 수 없는 것이다.
    
    <br>

    ### 해결방법
    - 첫번째 방법
    
        ```javascript
        function closer(j) {
            setTimeout(function() {
                console.log(j);
            }, j*1000);
        };

        for (var i=0; i<10; i++) {
            closer(i);
        }
        ```
        외부에 setTimeout 내용이 들어간 closer 함수를 만든 후 for문을 이용해 closer 함수를 호출한다. 가장 먼저 for문이 실행되는데 closer 함수가 1초가 지나기 전에 모두 호출되게 된다. 이후 closer 함수에서 시간에 맞게 i값을 호출해준다. 이 방법은 동일한 내용을 실행하는 closer 함수가 여러 곳에서 활용될 때 사용하면 좋은 방법이다.

    - 두번째 방법

        ```javascript
        for (var i=0; i<10; i++) {
            (function closer(j) {
                setTimeout(function() {
                    console.log(j);
                }, j*1000);
            })(i);
        }
        ```
        for문 안에서 closer 함수를 선언하고 바로 실행시키는 방법이다. 1초가 지나기 전에 for문이 1~10까지 모두 실행되면서 closer함수를 선언과 동시에 바로 실행된다. closer 함수는 얻은 인자를 가지고 시간에 맞춰 콘솔에 출력한다. 이 방법은 내부에 작성한 closer 함수가 한 부분에서만 사용될 때 사용하면 좋은 방법이다.
<hr>

7. `Element.classList` : Element의 클래스 속성을 가져온다. 반환형은 DOMTokinList이다.
    ```html
    <form id="form">
        <input type="text" value="이름">
        <input type="text" value="나이">
        <input type="submit" value="제출">
    </form>
    ```
    ```javascript
    var form = document.getElementById("#form");

    form.classList.add("memberForm");   //id가 form인 해당 element의 클래스 속성으로 memberForm 추가
    console.log(form.innerHTML);

    form.classList.remove("memberForm");    //id가 form인 element의 memberForm 클래스 속성 삭제
    console.log(form.innerHTML);
    ```
