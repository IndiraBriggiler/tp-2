// $('#board').addClass('hidden');



var level = level;




$('#easy').on('click', function () {
  var level = '';
  level = 'FACIL';
  $('#chooseLevel').append(level);
  var name = $('#name').val();
  $('#helloName').append('Hola ' + name);
})