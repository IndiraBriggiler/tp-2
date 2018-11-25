var attempts = 0;
var howManyClicks = 0;
var totalClicks = 0;
var piceOne;
var piceOneId;
var piceTwo;
var piceTwoId;
var equalPices = 0;
var level;
var name;
var score;



//VOLVER A JUGAR

$('#btnPlayAgain').on('click', function () {
  attempts = 0;
  howManyClicks = 0;
  totalClicks = 0;
  piceOne = "";
  piceOneId = "";
  piceTwo = "";
  piceTwoId = "";
  equalPices = 0;

  name = $('#name').val("");
  
  $('#board').addClass('hidden');
  $('#gameOver').addClass('hidden');
  $('#greeting').removeClass('hidden');
  
  $('.buttonDifficulty').prop('disabled', false);
  
  $('.images').removeClass('backAndWithe');

  isSelected = false;

  reset();

  play ();
})


// TABLERO AL INICIO

$('#board').addClass('hidden');
$('#gameOver').addClass('hidden');


var isSelected = false;
$('.buttonDifficulty').on('click', function () {
  name = $('#name').val();  
  if (name == '') {
    $('#nameRequired').removeClass('hidden');
    setTimeout(function() {
      $('#nameRequired').addClass('hidden');
    }, 2000)
  } else {
    isSelected = true;
    if (isSelected === true){
      $('.buttonDifficulty').prop('disabled', true);
    }
    
    $('#helloName').html('Hola ' + name);
    $('.images').attr('src', 'images/tapada.jpg');
    $('#attempts').html('Intentos: ' + totalClicks);
    $('#greeting').addClass('hidden');
    $('#board').removeClass('hidden');
  }
})

$('#easy').on('click', function () {
  level = 'FACIL';
  if (name !== "") {
  $('#chooseLevel').html(level);
  attempts = 18;
  fillAttempts(attempts);
  }
})

$('#medium').on('click', function () {
  level = 'INTERMEDIO';
  if (name !== "") {
  $('#chooseLevel').append(level);
  attempts = 12;
  fillAttempts(attempts);
  }
})

$('#expert').on('click', function () {
  level = 'EXPERTO';
  if (name !== "") {
    $('#chooseLevel').append(level);
    attempts = 9;
    fillAttempts(attempts);
  }
 
})

function fillAttempts (attempts) {
  $('#findAttempts').html(`Encontra todos los pares en menos de <span class="attemptsNumber"> ${attempts} </span> intentos`);
}

// IMAGENES DEL BOARD

var images = ['images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg', 'images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg'];

window.onload = function() {
  reset();
};

function shuffle(images) {
  var j
  var x
  var i
  for (i = images.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = images[i];
      images[i] = images[j];
      images[j] = x;
  }
  return images;
}



function reset () {
  images = shuffle(images);
  var imagesLength = $(images).length;
  for (i = 0; i < imagesLength; i++) {
     $('.images').eq(i).attr('data-img', images[i]);
   }


}

  
// $(document).on('click', '.images', function () {
//   var visible = $(this).attr('data-img');
//   $(this).attr('src', visible);
// })



//SELECCCIONAR FICHAS IGUALES O NO

function play () {
  $('.images').on('click', function () {
    var visible = $(this).attr('data-img');
    $(this).attr('src', visible);
    $(this).parent('.oneImageContainer').addClass('flip');
    howManyClicks++;
    if (howManyClicks === 1) {
      piceOne = $(this).attr('data-img');
      piceOneId = $(this).attr('id');
    } else {
      if (piceOneId !== $(this).attr('id')) {
        piceTwo = $(this).attr('data-img');
        piceTwoId = $(this).attr('id');
        totalClicks++;
        $('#attempts').html('Intentos: Nº ' + totalClicks);
        if (howManyClicks == 2) {
          setTimeout(function() {
          $('.images').parent('.oneImageContainer').removeClass('flip');            
          }, 900) 
        }
        if (piceOne !== piceTwo) {   
          setTimeout(function() {
            piceOne = $(`#${piceOneId}`).attr('src', 'images/tapada.jpg');
            piceTwo = $(`#${piceTwoId}`).attr('src', 'images/tapada.jpg');
           
          }, 1000)
        } else {
          if (piceOneId !== piceTwoId) {
            piceOne = $(`#${piceOneId}`).addClass('backAndWithe');
            piceTwo = $(`#${piceTwoId}`).addClass('backAndWithe');
            $('#' + piceOneId).off('click');
            $('#' + piceTwoId).off('click');
            
  
            equalPices++
          }
        }
        howManyClicks = 0;
      }
    }
    game();
  })

}


play ();

//PERDER O GANAR

function game () {
  setTimeout(function() {
    if (equalPices < 6) {
      if (totalClicks == 18  && attempts == 18) {
        $('.message').html('Perdiste! 😢');1
        $('#gameOver').removeClass('hidden');
        $('.buttonDifficulty').prop('disabled', false);
      } else if (totalClicks == 12 && attempts == 12) {
        $('#gameOver').removeClass('hidden');
        $('.message').html('Perdiste! 😢');  
       $('.buttonDifficulty').prop('disabled', false); 
      } else if (totalClicks == 9  && attempts == 9) {
        $('#gameOver').removeClass('hidden');
        $('.message').html('Perdiste! 😢');
        $('.buttonDifficulty').prop('disabled', false);
      }
    } else {
      if (equalPices === 6) {
      $('#gameOver').removeClass('hidden');
      $('.buttonDifficulty').prop('disabled', false);
      $('.message').html(`Ganaste 🎉 ! con ${totalClicks} intentos.`);
  
      ranking (); 
      }
    }
  }, 900)
}


function ranking () {
  if (localStorage.getItem('ranking') == null) {
    score = []; 
  } else {
    score = JSON.parse(localStorage.getItem('ranking'));
  }

  var rankingObj = {
    rankingName : name,
    rankingLevel : level,
    rankingAttempts : totalClicks
  }

  score.unshift(rankingObj);

  localStorage.setItem('ranking', JSON.stringify(score));

  var ranking = localStorage.getItem('ranking');
  ranking = JSON.parse(ranking);


  if (ranking !== null) {
    console.log('ranking1');
    var max = 5;
    if (ranking.length < 5) {
      console.log('rankin2');
      max = ranking.length
    }
    for (i = 0; i < max; i++) {
      console.log('ranking 3');
      $('#ranking').append(`
        <div class="row">
          <div id="rankingName">
            <p>${ranking[i].rankingName}</p>
          </div>  
          <div id="rankingLevel">
            <p>${ranking[i].rankingLevel}</p>
          </div>
          <div id="rankingAttempts">
            <p>${ranking[i].rankingAttempts}</p>
          </div>
        </div>
      `)
      score = []; 
    }
  }
}
