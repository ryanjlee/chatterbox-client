/* globals $,_ */

var messages;

$.get('https://api.parse.com/1/classes/chatterbox', function(data) {
  messages = data.results;
  console.log(messages);
  _.each(messages, function(object) {
    var string = '<li>' + object.createdAt + '://////      ' + object.username + ': ' + object.text + '</li>';
    $('#main').append(string);
  });
});

// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'GET',
//   dataType: 'json',
//   success: console.log("success")
// });
