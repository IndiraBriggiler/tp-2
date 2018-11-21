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

$('#board').addClass('hidden');
$('#gameOver').addClass('hidden');

isSelected = false;
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
    
    $('#helloName').append('Hola ' + name);
    $('.images').attr('src', 'images/tapada.jpg');
    $('#attempts').html('Intentos: ' + totalClicks);
    $('#greeting').addClass('hidden');
    $('#board').removeClass('hidden');
  }
})

$('#easy').on('click', function () {
  level = 'FACIL';
  if (name !== "") {
  $('#chooseLevel').append(level);
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
  $('#findAttempts').append('Encontra todos los pares en menos de ' + attempts + ' intentos');
}

// IMAGENES DEL BOARD

var images = ['images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg', 'images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg'];

window.onload = function() {
  images = shuffle(images);
  var imagesLength = $(images).length;
  for (i = 0; i < imagesLength; i++) {
     $('.images').eq(i).attr('data-img', images[i]);
   }
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
  
$(document).on('click', '.images', function () {
   var visible = $(this).attr('data-img');
  $(this).attr('src', visible);

  // $(this).id().flip({trigger: 'click'});

})


// IMAGEN FLIP 


// }
// $(document).on('click', '.images', function () {
//   $(this).attr('src','images[i]');
//   flipImage();
// })


//SELECCCIONAR FICHAS IGUALES O NO

$('.images').on('click', function () {
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
      if (piceOne !== piceTwo) {
        setTimeout(function() {
          piceOne = $(`#${piceOneId}`).attr('src', 'images/tapada.jpg');
          piceTwo = $(`#${piceTwoId}`).attr('src', 'images/tapada.jpg');
        }, 500)
      } else {
        if (piceOneId !== piceTwoId) {
          piceOne = $(`#${piceOneId}`).addClass('backAndWithe')
          piceTwo = $(`#${piceTwoId}`).addClass('backAndWithe')
          equalPices++
        }
      }
      howManyClicks = 0;
    }
  }
  game();
})


//SCORE





//PERDER O GANAR

function game () {
  if (equalPices < 6) {
    if (totalClicks == 18  && attempts == 18) {
      $('.message').append('Perdiste! 😢');1
      $('#gameOver').removeClass('hidden');
      $('.buttonDifficulty').prop('disabled', false);
    } else if (totalClicks == 12 && attempts == 12) {
      $('#gameOver').removeClass('hidden');
      $('.message').append('Perdiste! 😢');  
     $('.buttonDifficulty').prop('disabled', false); 
    } else if (totalClicks == 9  && attempts == 9) {
      $('#gameOver').removeClass('hidden');
      $('.message').append('Perdiste! 😢');
      $('.buttonDifficulty').prop('disabled', false);
    }
  } else {
    if (equalPices === 6) {
    $('#gameOver').removeClass('hidden');
    $('.buttonDifficulty').prop('disabled', false);
    $('.message').append(`Ganaste 🎉 ! con ${totalClicks} intentos.`);

    if (localStorage.getItem('ranking') == null) {
      score = [];
    } else {
      score = localStorage.getItem('ranking');
    }

    var ranking = {
      rankingName : name,
      rankingLevel : level,
      rankingAttempts : attempts
    }

    score.push(ranking);
    localStorage.setItem('ranking', JSON.stringify(score));

    var ranking = localStorage.getItem(ranking);
    if (ranking !== null) {
      ranking = JSON.parse(ranking);
      for (i = 0; i < ranking.length; i++) {
        $('#rankingName').append(ranking[i].rankingName);
        $('#rankingLevel').append(ranking[i].rankingLevel);
        $('#rankingAttempts').append(ranking[i].rankingAttempts);
      }
    }

    }
  }

  // var ranking = localStorage.getItem(ranking);
  // if (ranking !== null) {
  //   ranking = JSON.parse(ranking);
  //   for (i = 0; i < ranking.length; i++) {
  //     $('#rankingName').append(ranking[i].rankingName);
  //     $('#rankingLevel').append(ranking[i].rankingLevel);
  //     $('#rankingAttempts').append(ranking[i].rankingAttempts);
  //   }
  // }
  

}


//VOLVER A JUGAR

$('#btnPlayAgain').on('click', function () {
  console.log('hola')
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
})


