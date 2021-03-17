# Chapter11 정리

### 1. `Element.className`
Element.classList.add()와 같은 기능
```javascript
var div = document.createElement('div');
div.className = 'chapter11';    //div.classList.add('chapter11')과 같은 기능
```

<hr>

### 2. `classList.toggle()`
매개변수로 클래스명을 입력하면 어떤 이벤트가 발생할 때 해당 클래스가 있으면 없애고, 없으면 추가하는 기능.
```html
<!-- chapter11.html -->
<style>
        div {
            width : 400px;
            height : 400px;
            background-color: yellow;
        }
        .toggle {
            background-color: limegreen;
        }
    </style>
</head>
<body>
    <div></div>
    
    <script src="chapter11.js"></script>
</body>
```
```javascript
//chapter11.js
var div = document.querySelector('div');
div.addEventListener('click', function() {
    this.classList.toggle('toggle');
});
```
**[실행결과] div 태그를 클릭할 때마다 toggle()로 인해 toggle 클래스가 추가되거나 삭제되는 것을 확인할 수 있다.**

![ezgif com-gif-maker](https://user-images.githubusercontent.com/66666533/111326428-e1c33e80-86af-11eb-97d8-96ad352c9eec.gif)

<hr>

### 3. 참조(얕은 복사)
- javascript에서 `일반 값(string, number, boolean, ...)은 복사(깊은 복사)가 된다.`
- javascript에서 `객체([], {}, ...)은 참조(얕은 복사)가 된다.`
- 복사(깊은 복사) 예시

    ```javascript
    var arr1 = {'a':'A', 'b':'B', 'c':'C'};
    var arr2 = arr1;

    arr2.a= 'D';
    console.log('arr1.a : ' + arr1.a);
    console.log('arr2.a : ' + arr2.a);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111486626-fddfe200-877a-11eb-9e05-433338e35d5b.png)

    - str1 변수에 'test'를 저장하고 str2 변수에 str1의 값을 저장한다.
    - str2 변수값을 'testtest'로 변경한다.
    - str2의 변수값이 변하더라도 str1은 영향을 받지 않는다. 이는 str2가 str1의 `값`만 가져왔기 때문이다.

- 참조(얕은 복사) 예시

    ```javascript
    var arr1 = {'a':'A', 'b':'B', 'c':'C'};
    var arr2 = {};
    Object.keys(arr1).forEach(function(key) {
        arr2[key] = arr1[key];
    });

    arr2.a= 'D';
    console.log('arr1.a : ' + arr1.a);
    console.log('arr2.a : ' + arr2.a);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111488719-d853d800-877c-11eb-97ee-3a9e1ab51b3b.png)

    - arr1 객체에 데이터를 저장하고, arr2 객체에 arr1 객체를 저장한다.
    - arr2의 key가 'a'인 value를 'D'로 변경한다.
    - arr2의 key만 변경했는데 arr1과 arr2의 key가 모두 변경된 것을 확인할 수 있다. 이는 arr2가 arr1의 값이 아닌 `주소`를 가져왔기 때문이다.

- 객체를 복사(깊은 복사) 하는법(딕셔너리)
    - 아래 예시는 딕셔너리 객체를 참조를 끊고 복사하는 방법이다.
    ```javascript
    var arr1 = {'a':'A', 'b':'B', 'c':'C'};
    var arr2 = {};
    Object.keys(arr1).forEach(function(key) {
        arr2.key = arr1[key];
    });

    arr2.a= 'D';
    console.log('arr1.a : ' + arr1.a);
    console.log('arr2.a : ' + arr2.a);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111488788-e9044e00-877c-11eb-9171-89df0ea28615.png)

    - 위와 같이 하면 깊은 복사가 가능하다. 하지만 깊은 복사가 되지 않는 객체도 존재한다. 아래의 예시를 보자.
    ```javascript
    var arr1 = {'a':'A', 'b':'B', 'c':{'d':'D'}};
    var arr2 = {};
    Object.keys(arr1).forEach(function(key) {
        arr2.key = arr1[key];
    });

    arr2.a = 'D';
    console.log('arr1.a : ' + arr1.a);
    console.log('arr2.a : ' + arr2.a);

    arr2.c.d = 'E';
    console.log('arr1.c.d : ' + arr1.c.d);
    console.log('arr2.c.d : ' + arr2.c.d);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111489576-98d9bb80-877d-11eb-8dfe-9a450f5dd80b.png)
    - arr1.a의 value는 'A'로 일반 문자이다. 따라서 값만 복사가 되기 때문에 arr2.a의 값을 변경하면 arr2.a만 변경된다.
    - 하지만 forEach문에서 `arr2.c = arr1.c`는 arr1.c가 `또 다른 객체이기 때문에 주소가 참조`된다. 이런 이유로 arr2.c.d를 변경하면 arr1.c.d도 변경되는 것이다.
    - 따라서 forEach()문을 사용하는 방법은 객체 안에 객체가 존재하지 않는, 즉 `1단계 객체`에서만 사용해야 한다.

- 객체 복사하기(배열)
    ```javascript
    var arr1 = [1, 2, 3, 4, 5];
    var arr2 = arr1.slice();
    arr2[0] = 6;    //1->6
    console.log('arr1[0] : ' + arr1[0]);
    console.log('arr2[0] : ' + arr2[0]);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111493680-24a11700-8781-11eb-9a0d-ecf8517fa970.png)
    - 배열을 복사할 때는 `배열.slice()`를 사용한다.
    - 하지만 이 방법도 1단계 객체일 때만 사용 가능하다.

- 2단계 이상의 객체 복사하는 방법
    ```javascript
    var obj1 = [1, 2, 3, [4, 5], 6, 7];
    var obj2 = JSON.parse(JSON.stringify(obj1));

    obj2[3][0] = 8;
    console.log('obj1[3][0] : ' + obj1[3][0]);
    console.log('obj2[3][0] : ' + obj2[3][0]);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111494397-c45ea500-8781-11eb-873a-c835d73466ca.png)
    - 2단계 이상의 객체를 복사할 때는 `JSON.parse(JSON.stringify())`를 사용한다.
    - 하지만 이 방법도 완전한 깊은 복사는 되지 않는다.
    - 또 성능이 최악이다.

- 객체들이 서로 참조관계인지 아닌지 확인하기
    ```javascript
    var a = 'a';
    var b = a;
    console.log(a===b);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111490684-8e6bf180-877e-11eb-86c0-ea986fdce12d.png)
    - 객체가 아닌 일반 자료형에서 `a===b`의 의미는 `두 변수의 값이 서로 같은가` 라는 것이다.
    - 하지만 객체에서의 `===`의 의미는 `두 객체가 서로 참조 관계인가` 라는 것이다.
    ```javascript
    var arr1 = {'a':'A', 'b':'B', 'c':{'d':'D'}};
    var arr2 = {};
    arr1 = arr2;
    console.log(arr1===arr2);
    ```
    ![image](https://user-images.githubusercontent.com/66666533/111491513-46010380-877f-11eb-828a-f87a955150f2.png)

    - arr2는 arr1을 참조하고 있으므로 arr1===arr2의 값이 true이다.