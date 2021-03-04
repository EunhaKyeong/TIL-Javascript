/*
랜덤하게 들어온 구구단 문제를 푸는 프로그램
*/
var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);

var div = document.createElement("div");
div.textContent = num1 + "X" + num2 + "=";
document.body.append(div);
var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (Number(input.value)===num1*num2) {
        alert("정답입니다!");
        num1 = Math.floor(Math.random()*9) + 1;
        num2 = Math.floor(Math.random()*9) + 1;
        div.textContent = num1 + "X" + num2 + "=";
        input.value = null;
        input.focus();
    } else {
        alert("틀렸습니다!");
        input.focus();
    }
})

// while(true) {
//     var num1 = Math.floor(Math.random()*9) + 1;
//     var num2 = Math.floor(Math.random()*9) + 1;
    
//     while(true) {
//         var answer = prompt(num1 + "X" + num2 + "=");
//         if (Number(answer)===num1*num2) {
//             alert("정답입니다!");
//             break;
//         } else if (answer===null) 
//             break;
//         else 
//             alert("틀렸습니다!");
//     }
    
//     if (answer===null)
//         break;
// }
