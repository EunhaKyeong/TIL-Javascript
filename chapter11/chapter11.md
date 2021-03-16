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

