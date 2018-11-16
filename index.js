$('#board').addClass('hidden');
// $('#gameOver').addClass('hidden');

isSelected = false;
$('.buttonDifficulty').on('click', function () {
  var name = $('#name').val();
  console.log(name);
  
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
    $('#attempts').html('Intentos: Nº ' + totalClicks);
    console.log(totalClicks);
    $('#greeting').addClass('hidden');
    $('#board').removeClass('hidden');
  }
})

$('#easy').on('click', function () {
  var level = 'FACIL';
  $('#chooseLevel').append(level);
  var attempts = 18;
  fillAttempts(attempts);
})

$('#medium').on('click', function () {
  var level = 'INTERMEDIO';
  $('#chooseLevel').append(level);
  var attempts = 12;
  fillAttempts(attempts);
})

$('#expert').on('click', function () {
  var level = 'EXPERTO';
  $('#chooseLevel').append(level);
  var attempts = 9;
  fillAttempts(attempts);
})


function fillAttempts (attempts) {
  $('#findAttempts').append('Encontra todos los pares en menos de ' + attempts + ' intentos');
}




// IMAGENES DEL BOARD



var images = ['images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg', 'images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 'images/peces.jpg', 'images/unichancho.jpg', 'images/zapas.jpg'];

window.onload = function() {
  images = shuffle(images);

  var imagesLength = $(images).length
  console.log("todas las img",$('.images'))
 
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
 

 console.log("todas las img",$('.images'))
 
 $(document).on('click', '.images', function () {
   var visible = $(this).attr('data-img');
   $(this).attr('src', visible);
 })


var howManyClicks = 0;
var totalClicks = 0;
var piceOne;
var piceOneId;
var piceTwo;
var piceTwoId;
var equalPices = 0;

$('.images').on('click', function () {
  howManyClicks++;
  if (howManyClicks === 1) {
    piceOne = $(this).attr('data-img');
    piceOneId = $(this).attr('id');
  } else {
    piceTwo = $(this).attr('data-img');
    piceTwoId = $(this).attr('id');
    totalClicks++;
    $('#attempts').html('Intentos: Nº ' + totalClicks);
    if (piceOne !== piceTwo) {
      setTimeout(function() {
        piceOne = $(`#${piceOneId}`).attr('src', 'images/tapada.jpg');
        piceTwo = $(`#${piceTwoId}`).attr('src', 'images/tapada.jpg');
      }, 700)
    } else {
      piceOne = $(`#${piceOneId}`).addClass('backAndWithe')
      piceTwo = $(`#${piceTwoId}`).addClass('backAndWithe')
      equalPices++
      console.log( 'CANTIDAD DE PIEZAS IGUALES', equalPices)
    }
    howManyClicks = 0;
  }
  game();
})




//INTENTOS 

function game () {
  if (equalPices === 6) {
    $('#gameOver').removeClass('hidden');
    $('.message').append(`Ganaste 🎉 ! con ${totalClicks} intentos.`)
  } else {
    if (totalClicks === 18  && attempts === 18) {
      $('.message').append('Perdiste! ');
    } else if (totalClicks === 12 && attempts === 12) {
      $('.message').append('Perdiste! ');
    } else if (totalClicks === 9  && attempts === 9) {
      $('.message').append('Perdiste! ');
    }
  }
}










// function flipImage () {
//   $("#card").flip({trigger: 'click'});
// }


// $(document).on('click', '.images', function () {
//   $(this).attr('src','images[i]');
//   flipImage();
// })






