$(function() {

  var index = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
  </div>`
  index.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(".chat-group-form__field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        alert('一致するユーザーが見つかりません。');
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });
});