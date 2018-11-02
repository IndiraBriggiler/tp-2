// $('#board').addClass('hidden');






isSelected = false;
$('.buttonDifficulty').on('click', function () {
  isSelected = true;
  if (isSelected === true){
    $('.buttonDifficulty').prop('disabled', true);
  }
  var name = $('#name').val();
  $('#helloName').append('Hola ' + name);
  $('.images').attr('src', 'images/tapada.jpg');
  var attemptsNow = 0;
  $('#attempts').append('Intentos: Nº ' + attemptsNow)
})




//VER QUE SOLO SE PUEDA HACER CLICK UNA SOLA VEZ
// yo lo haria con un buleano
//`isSelected` que estaria en false al principio
//y que cuando clickeas en cualquier boton se ponga en true
// y a los buttons les pondria disable si ese boolean esta en true





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

//CAPAZ ME CONVIENE PONER TODO EN UN OBJETO

var boardGreeting = {
  level: level,
  attempts: attempts,
  
}



// IMAGENES DEL BOARD

// if (NO HAGO CLICK){
//   $('.images').append()
// }

//



