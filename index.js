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
var images;
var theme;
var harry = ['images/harry/dobby.jpg', 'images/harry/dumbledore.jpg', 'images/harry/harry.jpg', 'images/harry/hermoinie.jpg', 'images/harry/ron.jpg', 'images/harry/voldemort.jpg', 'images/harry/dobby.jpg', 'images/harry/dumbledore.jpg', 'images/harry/harry.jpg', 'images/harry/hermoinie.jpg', 'images/harry/ron.jpg', 'images/harry/voldemort.jpg'];
var animals = ['images/animals/alce.jpg', 'images/animals/epelante.jpg', 'images/animals/nena.jpg', 'images/animals/peces.jpg', 'images/animals/unichancho.jpg', 'images/animals/zapas.jpg', 'images/animals/alce.jpg', 'images/animals/epelante.jpg', 'images/animals/nena.jpg', 'images/animals/peces.jpg', 'images/animals/unichancho.jpg', 'images/animals/zapas.jpg'];
var starWars = ['images/starWars/chewbacca.jpeg', 'images/starWars/darth.jpg', 'images/starWars/princess.jpeg', 'images/starWars/r2d2.jpg', 'images/starWars/team.jpeg', 'images/starWars/yoda.jpg', 'images/starWars/chewbacca.jpeg', 'images/starWars/darth.jpg', 'images/starWars/princess.jpeg', 'images/starWars/r2d2.jpg', 'images/starWars/team.jpeg', 'images/starWars/yoda.jpg'];
var yourTheme = [];
var url = "http://localhost:3000/";
let expert = $('#expert');
let medium = $('#medium');
let easy = $('#easy');

// ELEGIR THEME

$('#ownTheme').on('click', function () {
  $('.uploadImages').removeClass('hidden');
})

$('#frmUploader').submit(function (e) {
  $(this).ajaxSubmit({
    error: function (xhr) {
      status('Error: ' + xhr.status);
      $('.uploadImages').append(`
      <p>Error al cargar las imagenes</p>
      `)
    },
    success: function (response) {
      var imageName = e.target[0].files[0].name;
      yourTheme.push(url + imageName);
      yourTheme.push(url + imageName);
      $('.uploadImages').append(`
      <p>Imagenes cargadas correctamente</p>
      <button class="closeModal">Cerrar</button>
      `)
      images = yourTheme;
      theme = 'yourTheme';
      $(this).addClass('clicked');
    }
  });
  return false;
});

$('body').on('click', '.closeModal', function() {
  $('.uploadImages').addClass('hidden');
})

$('#harry').on('click', function () {
  images = harry;
  $(this).addClass('clicked');
  $('#body').addClass('harry');
  $('#body').removeClass('starWars');
  $('#body').removeClass('animals');
  $('#animals').removeClass('clicked');
  $('#starWars').removeClass('clicked');
  theme = 'harry';
  $(this).addClass('clicked');
})

$('#animals').on('click', function () {
  images = animals;
  $(this).addClass('clicked');
  $('#body').addClass('animals');
  $('#body').removeClass('starWars');
  $('#body').removeClass('harry');
  $('#harry').removeClass('clicked');
  $('#starWars').removeClass('clicked');
  theme = 'animals';
  $(this).addClass('clicked');
})

$('#starWars').on('click', function () {
  images = starWars;
  $(this).addClass('clicked');
  $('#body').addClass('starWars');
  $('#body').removeClass('animals');
  $('#body').removeClass('harry');
  $('#harry').removeClass('clicked');
  $('#animals').removeClass('clicked');
  theme = 'starWars';
  $(this).addClass('clicked');
})


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

  play();
})


// TABLERO AL INICIO

$('#board').addClass('hidden');
$('#gameOver').addClass('hidden');


var isSelected = false;
$('#letsPlay').on('click', function () {
  name = $('#name').val();
  if (name == '') {
    $('#nameRequired').removeClass('hidden');
    setTimeout(function () {
      $('#nameRequired').addClass('hidden');
    }, 2000)
  } else if (attempts == 0 ) {
    $('#levelRequired').removeClass('hidden');
    setTimeout(function () {
      $('#levelRequired').addClass('hidden');
    }, 2000)
  } else if (theme == undefined) {
    $('#themeRequired').removeClass('hidden');
    setTimeout(function () {
      $('#themeRequired').addClass('hidden');
    }, 2000)
  }  else {
    isSelected = true;
    if (isSelected === true) {
      $('.buttonDifficulty').prop('disabled', true);
    }

    $('#helloName').html('Hola ' + name);
    $('.images').attr('src', `images/cover/${theme}.jpg`);
    $('#attempts').html('Intentos: ' + totalClicks);
    $('#greeting').addClass('hidden');
    $('#board').removeClass('hidden');
  }
  reset();
})

easy.on('click', function () {
  level = 'FACIL';
  $(this).addClass('clicked');
  medium.removeClass('clicked');
  expert.removeClass('clicked');
  if (name !== "") {
    $('#chooseLevel').html(level);
    attempts = 18;
    fillAttempts(attempts);
  }
})

medium.on('click', function () {
  level = 'INTERMEDIO';
  $(this).addClass('clicked');
  expert.removeClass('clicked');
  easy.removeClass('clicked');
  if (name !== "") {
    $('#chooseLevel').append(level);
    attempts = 12;
    fillAttempts(attempts);
  }
})

expert.on('click', function () {
  level = 'EXPERTO';
  $(this).addClass('clicked');
  medium.removeClass('clicked');
  easy.removeClass('clicked');
  if (name !== "") {
    $('#chooseLevel').append(level);
    attempts = 9;
    fillAttempts(attempts);
  }

})

function fillAttempts(attempts) {
  $('#findAttempts').html(`Encontra todos los pares en menos de <span class="attemptsNumber"> ${attempts} </span> intentos`);
}

// IMAGENES DEL BOARD

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

function reset() {
  images = shuffle(images);
  var imagesLength = $(images).length;
  for (i = 0; i < imagesLength; i++) {
    $('.images').eq(i).attr('data-img', images[i]);
  }
}

window.onload = function () {
  reset();
}


//SELECCCIONAR FICHAS IGUALES O NO

function play() {
  $('.images').on('click', function () {
    var visible = $(this).attr('data-img');
    $(this).attr('src', visible);
    $(this).parent('.oneImageContainer').addClass('animated');
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
          setTimeout(function () {
            $('.images').parent('.oneImageContainer').removeClass('animated');
            $('.images').parent('.oneImageContainer').removeClass('flip');
          }, 900)
        }
        if (piceOne !== piceTwo) {
          setTimeout(function () {
            piceOne = $(`#${piceOneId}`).attr('src', `images/cover/${theme}.jpg`);
            piceTwo = $(`#${piceTwoId}`).attr('src', `images/cover/${theme}.jpg`);
          }, 1000)
        } else {
          if (piceOneId !== piceTwoId) {
            piceOne = $(`#${piceOneId}`).addClass('backAndWithe');
            piceTwo = $(`#${piceTwoId}`).addClass('backAndWithe');
            $('#' + piceOneId).off('click');
            $('#' + piceTwoId).off('click');
            setTimeout(function () {
              piceOne = $(`#${piceOneId}`).addClass('animated');
              piceTwo = $(`#${piceTwoId}`).addClass('animated');
              piceOne = $(`#${piceOneId}`).addClass('shake');
              piceTwo = $(`#${piceTwoId}`).addClass('shake');
            }, 500)

            equalPices++
          }
        }
        howManyClicks = 0;
      }
    }
    game();
  })

}


play();

//PERDER O GANAR

function game() {
  if (equalPices < 6) {
    if (totalClicks == 18 && attempts == 18) {
      $('.message').html('Perdiste! 😢'); 1
      $('#gameOver').removeClass('hidden');
      $('.buttonDifficulty').prop('disabled', false);
    } else if (totalClicks == 12 && attempts == 12) {
      $('#gameOver').removeClass('hidden');
      $('.message').html('Perdiste! 😢');
      $('.buttonDifficulty').prop('disabled', false);
    } else if (totalClicks == 9 && attempts == 9) {
      $('#gameOver').removeClass('hidden');
      $('.message').html('Perdiste! 😢');
      $('.buttonDifficulty').prop('disabled', false);
    }
  } else {
    if (equalPices === 6) {
      $('#gameOver').removeClass('hidden');
      $('.buttonDifficulty').prop('disabled', false);
      $('.message').html(`Ganaste 🎉 ! con ${totalClicks} intentos.`);

      ranking();
    }
  }
}


function ranking() {
  if (localStorage.getItem('ranking') == null) {
    score = [];
  } else {
    score = JSON.parse(localStorage.getItem('ranking'));
  }

  var ranking = {
    rankingName: name,
    rankingLevel: level,
    rankingAttempts: totalClicks
  }

  score.unshift(ranking);

  localStorage.setItem('ranking', JSON.stringify(score));

  var ranking = localStorage.getItem('ranking');
  ranking = JSON.parse(ranking);


  if (ranking !== null) {
    var max = 5;
    if (ranking.length < 5) {
      max = ranking.length
    }
    $('#ranking').html('')
    for (i = 0; i < max; i++) {
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
    }
  }
}
