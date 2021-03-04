1. window 객체  
- 브라우저에서 제공하는 객체.
- window는 전역 객체이기 때문에 생략 가능하다.
```javascript
window.alert("hi");
```
와
```javascript
alert("hi");
```
는 같다.  

- javascript에서는 window 객체를 지원하지만 node.Js에서는 window 객체를 지원하지 않는다.

2. document 객체  
- window 객체 안에 들어 있는 객체.
- 하나의 브라우저의 한 페이지를 말한다.

3. 태그 안에 들어가는 글자들은 textContent, input과 같은 입력 태그에 입력된 값들은 value.