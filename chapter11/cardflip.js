var row = 3;
var col = 4;

function init(row, col) {
    //카드색 배열
    var colors = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'skyblue', 'skyblue'];
    //랜덤으로 섞인 카드색 배열
    var colorsRand = [];
    while (colors.length>0) {
        colorsRand = colorsRand.concat(colors.splice(Math.floor(Math.random()*colors.length-1), 1));
    }
    console.log(colorsRand);

    for (var cnt=0; cnt<row*col; cnt++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
    
        (function(c) {
            card.addEventListener('click', function() {
                c.classList.toggle('fliped');
            })
        })(card);   
    }

    document.body.appendChild(card);
}

init(row, col);