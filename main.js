$(document).ready(function() {
    let cardOne = null;
    let cardTwo = null;
    const images = [
        '01.jpg',
        '02.jpg',
        '03.jpg',
        '04.jpg',
        '05.jpg',
        '06.jpg',
        '07.jpg',
        '08.jpg',
        '09.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg'
    ];
    let fullSetOfCards = images.concat(images);
    let flag = 0;
    createCardElements();
    clickHandler();

    function shuffleCards(imagesArray) {
        for (var i = imagesArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = imagesArray[i];
            imagesArray[i] = imagesArray[j];
            imagesArray[j] = temp;
        }

        return imagesArray;
    }

    function createCardElements() {
        let shuffledSetOfCards = shuffleCards(fullSetOfCards);
        for (i=0; i<shuffledSetOfCards.length; i++) {
            let divClassCard = '<div class="card"><img class="base" src="assets/bayc-logo.jpg" alt=""><img class="image" src="ape-assets/' + shuffledSetOfCards[i] + '" alt=""></div>';
            $(divClassCard).appendTo('.game-board');
        }
        $('.image').hide();
    }

    function clickHandler() {
        $('.card').click(function() {
            let checkForClass = $(this).attr('class');
            let num = checkForClass.indexOf('tagged');
            
            if (num >= 0) {
                return
            }
    
            $(this).addClass('tagged');
            let card = $(this).find('img.image');
            $(card).show();
    
            let imageName = $(card).attr('src');
            checkSrcName(imageName);
    
            if (cardTwo !== null) {
                $('.card').off();
                checkCards();
            }
        });
    }

    function checkSrcName(imageName) {
        if (cardOne == null) {
            cardOne = imageName;
        } else {
            cardTwo = imageName;
        }
    }

    function checkCards() {
        if (cardOne == cardTwo) {
            console.log('we have a match!');
            setTimeout(function() {
                removeCards();
            }, 2000);
        } else {
            console.log('no match');
            $('.card').removeClass('tagged');
            setTimeout(function() {
                $('.image').hide();
                $('.base').show();
            }, 2000);
        }

        setTimeout(function() {
            clickHandler();
        }, 2000);

        cardOne = null;
        cardTwo = null;
    }

    function removeCards() {
        $('.tagged').css('visibility', 'hidden');
        flag--;
    }

});



