$('#board').addClass('hidden');

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
    var attemptsNow = 0;
    $('#attempts').append('Intentos: Nº ' + attemptsNow)
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




// images.sort( function(a, b) {
//   Math.random() -0.5;
// )}

// var 



// var positionsOcupped = [ ];

// for (i = 0; i < 11; i++) {
//   var randomPosition = Math.floor((Math.random() * 11) + 1);
//   positionsOcupped.push(randomPosition);
// }











// var howManyClicks = 0;
// var totalClicks = 0;
// var piceOne = ;
// var piceTwo = ;


// $('.images').on('click', function () {
//   howManyClicks++;
//   if (howManyClicks === 2){
//     for (i = 0; i < 11; i++) {
//       if (piceOne.id !== piceTwo.id){
//         totalClicks++
//         return totalClicks
//       }
//     }
//   } else if (howManyClicks === 1) {
//     piceOne = 
//   }
// })

// for (i = 0; i < images.length; i++) {


// }





// function flipImage () {
//   $("#card").flip({trigger: 'click'});
// }


// $(document).on('click', '.images', function () {
//   $(this).attr('src','images/alce.jpg');
//   flipImage();
// })






