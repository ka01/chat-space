$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class="lower-message__image" src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
    <div class="message__talker-info">
    <div class="talker-name">
    ${message.user_name}
    </div>
    <div class="date">
    ${message.date}
    </div>
    </div>
    <div class="message-text">
    <p class="lower-message__content">
    ${content}
    </p>
    </div>
    ${img}
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
    })
    .fail(function(data){
      alert('メッセージを入力してください。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
})