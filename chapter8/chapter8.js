//target VS currentTarget
document.querySelector("#form").addEventListener("click", function(e) {
    console.log("target : " + e.target);
    console.log("currentTarget : " + e.currentTarget);
})

//innerHTML
var form = document.querySelector("#form");
console.log(form.innerHTML);

//Array.filter()
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var filteredArr = arr.filter(function(a) {
    return a%2==0;
});
console.log(filteredArr);

//Array.concat()
arr.concat([11, 12, 13]);
console.log(arr);
arr = arr.concat([11, 12, 13]);
console.log(arr);

// function closer(j) {
//     setTimeout(function() {
//         console.log(j);
//     }, j*1000);
// };
// for (var i=0; i<10; i++) {
//     closer(i);
// }

// console.log("클로저2");
// for (i=0; i<10; i++) {
//     function closer(j) {
//         setTimeout(function() {
//             console.log(j)
//         }, j*1000);
//     }
//     closer(i);
// }

// for (var i=0; i<10; i++) {
//     (function closer(j) {
//         setTimeout(function() {
//             console.log(j);
//         }, j*1000);
//     })(i);
// }

form.classList.add("test");