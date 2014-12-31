/* globals $,_ */

var app = {};
app.init = function() {};

app.currentRoom = '<script>background-color: red</script>';

app.send = function(message) {
  var newMessage = {
    'username': window.location.search.substring(10),
    'text': message,
    'roomname': app.currentRoom
  };
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(newMessage),
    contentType: 'application/json',
    success: function (data){
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


app.checkHacks = function(value){
  if(value) {
    return value.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  return value;
};

app.fetch = function(room) {

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    //url: 'https://api.parse.com/1/classes/chatterbox?where={"username":"yolo"}?order=createdAt',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $('#main li').remove();
      var messages = data.results;
      _.each(messages, function(object) {
        var name = app.checkHacks(object.username);
        var text = app.checkHacks(object.text);
        var currRoom = app.checkHacks(object.roomname);

        if(room && room === currRoom){
          var string = '<li><strong>' + name + '</strong>: ' + text + '</li>';
        }
        else if(!room){
          var string = '<li><strong>' + name + '</strong>: ' + text + '</li>';
        }

        $('#main').append(string);
      });
    }
  });
};

app.clearMessages = function() {};
app.addMessage = function() {};

// $.get('https://api.parse.com/1/classes/chatterbox', function(data) {
//   messages = data.results;
//   console.log(messages);
//   _.each(messages, function(object) {
//     var string = '<li>' + object.createdAt + '://////      ' + object.username + ': ' + object.text + '</li>';
//     $('#main').append(string);
//   });
// });

//app.send(newMessage);
app.fetch();


//setInterval(app.fetch,3000);

// $(document).ready(function() {
//   $('button').on('click', function() {
//   alert('hello');
//   });
// });



$(document).ready(function() {
  $('#message').submit(function(event) {
    if ($('input:first').val()) {
      app.send($('input:first').val());
      $('input:first').val('');
    }
    event.preventDefault();
  });
});

$(document).ready(function() {
  $('#room').submit(function(event) {
    if ($('#roomtext').val()) {
      app.currentRoom = $('#roomtext').val();
      $('#roomtext').val('');
    }
    event.preventDefault();
  });
});

$(document).ready(function() {
  $('#rooms').on('click', 'p', function() {
    app.fetch($(this).text());
  });
});

app.getRooms = function(){
  var rooms =  {};

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var messages = data.results;
      _.each(messages, function(object) {
        var room = app.checkHacks(object.roomname);
        rooms[room] = room;
      });

      for(var key in rooms){
        var string = '<p>'+ key + '</p>';
        $('#rooms').append(string);
      }
    }
  });
  return rooms;
};

app.getRooms();
