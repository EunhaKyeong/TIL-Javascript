## 배열.splice(int index, int deleteCnt)
- 배열의 index 위치에서 deleteCnt개 요소 제거.
- 제거된 요소 리턴 -> 배열 객체로!
``` javascript
var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var num = numArray.splice(3, 1); //3번 위치에서 1개 요소 삭제. num = 4
console.log(num);   //output : [4] <- 배열 객체!
console.log(num[0]);    //output : 4 <- Number!
console.log(numArray);  //ouput : [1, 2, 3, 5, 6, 7, 8 9]
```

## 배열.push(elements)
- 배열의 맨 마지막에 elemets(하나 또는 여러개)를 추가함.
```javascript
    var numArray = [1, 2, 3, 4, 5];
    numArray.push(6);
    console.log(numArray);  //output : [1, 2, 3, 4, 5, 6]
```