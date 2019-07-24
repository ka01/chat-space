$(document).on('turbolinks:load', function() {

  var index = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
  </div>`
  index.append(html);
  }

  function changeUser(userName, userId) {
    var chatUser = $(".chat-group-users");
    var html =`
          <div class='chat-group-user clearfix js-chat-user' id='${ userId }'>
          <input name='group[user_ids][]' type='hidden' value='${ userId }'>
          <p class='chat-group-user__name'>${ userName }</p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
          </div>
          `
    chatUser.append(html);
  };

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else if(users.length == 0 ) {
        alert('一致するユーザーが見つかりません。');
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });
  $('#user-search-result').on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var userName = $(this).attr('data-user-name');
    var userId = $(this).attr('data-user-id');
    changeUser(userName, userId);
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});