/* globals $,_ */

var app = {};
app.init = function() {};
app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
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

app.fetch = function() {
  $("li").remove();

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var messages = data.results;
      _.each(messages, function(object) {
        var name = app.checkHacks(object.username);
        var text = app.checkHacks(object.text);
        var string = '<li>'+ object.createdAt + '://////      ' + name + ': ' + text + '</li>';
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

var newMessage = {
  'username': 'MC Hammer',
  'text': 'Can\'t touch this',
  'roomname': 'backAlley'
};
app.send(newMessage);
app.fetch();


// setInterval(app.fetch,5000);
