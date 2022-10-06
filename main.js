$(document).ready(function() {
    $('.game-over').hide();
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
    const giphy = [
        'https://giphy.com/embed/EWWdvQngcLt6g',
        'https://giphy.com/embed/3ohryhNgUwwZyxgktq',
        'https://giphy.com/embed/lSPtp0kCFqKsgtsQ8k',
        'https://giphy.com/embed/xT5LMqGuvNAOr06YcU',
        'https://giphy.com/clips/buzzfeed-buzzfeed-celeb-owen-wilson-the-cast-of-cars-3-take-a-written-drivers-Atx1IgqtSq7B5MB3BN',
        'https://giphy.com/embed/gK6c42eKAKXQnM0TEw',
        'https://giphy.com/embed/249HnqKvOomiHHbacr',
        'https://giphy.com/embed/xUPGcJMf2O2owgCXCg',
        'https://giphy.com/embed/GRdos3E3CYylsjonC1',
        'https://giphy.com/embed/GMDicB9AQQ2FxYPAZZ',
        'https://giphy.com/embed/nqi89GMgyT3va',
        'https://giphy.com/embed/l3q2Z6S6n38zjPswo',
        'https://giphy.com/embed/xeXEpUVvAxCV2',
        'https://giphy.com/embed/vvz5AVSb96m0FY9XFb',
        'https://giphy.com/embed/AGd0FlElEhcRy',
        'https://giphy.com/embed/l0HlxRrCYYFVVfwWY',
        'https://giphy.com/embed/26FfgASqOyPzxjhRe',
        'https://giphy.com/embed/0nj9dmVLbtmvW4OZvr',
        'https://giphy.com/embed/XD9WaokEhO1JQkTyKp',
        'https://giphy.com/embed/10ERZqYioLWJ6U',
    ];
    let fullSetOfCards = images.concat(images);
    let flag = 0;
    let matches = 0;
    let misses = 0;
    
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
                misses++;
                $('.misses').text(misses);
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
        matches++;
        $('.wins').text(matches);
        checkScoreBoard();
    }

    function checkScoreBoard() {
        if (matches == 12) {
            $('.game-board').remove();
            gameWon();
        }
    }

    function gameWon() {
        $('.score-board').remove();
        $('.game-over').show();
        $('.game-over iframe').attr('src', giphy[Math.round(Math.random())]);
    }

});



