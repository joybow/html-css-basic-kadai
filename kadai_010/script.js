$(function (){
  // ボタンアニメーション
  $('.button-more').on('mouseover', function(){
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });

  $('.button-more').on('mouseout', function(){
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    }, 100);
  });
  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
    swipe: true,
  });

  $('#submit').on('click', function(event){
    // formタグによる送信を拒否
    event.preventDefault();

    // 入力チェックをした結果、エラーがあるかないかの判定
    let result = inputCheck();
    // エラー判定とメッセージを取得
    let error =result.error;
    let message = result.message;
    if(error == false){
      // Ajaxでformを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result){
          alert('お問い合わせを送信しました')
        },
        error: function (xhr, resp, text){
          alert('お問い合わせを送信できませんでした。')
        }
      })
    } else{
      // エラーメッセージを表示する
      alert(message);
    }
  });

  $('#name').blur( function(){
    inputCheck();
  });
  $('#furigana').blur( function(){
    inputCheck();
  });
  $('#email').blur( function(){
    inputCheck();
  });
  $('#tel').blur( function(){
    inputCheck();
  });
  $('#message').blur( function(){
    inputCheck();
  });
  $('#agree').click( function(){
    inputCheck();
  });
  $('#prefecture').blur( function(){
    inputCheck();
  });
  
  //問い合わせフォームの入力チェック 
  function inputCheck(){
    // エラーのチェック結果
    let result;
    // エラーメッセージのテキスト
    let message = '';
    // エラーがなければfalse、エラーがあればtrue
    let error = false;
    // 名前のチェック
    if($('#name').val() == '') {
      // エラーありということ
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      // エラーなしで通す
      $('#name').css('background-color', '#fafafa');
    }
    if($('#furigana').val() == '') {
      // エラーありということ
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      // エラーなしで通す
      $('#furigana').css('background-color', '#fafafa');
    }
    if($('#message').val() == '') {
      // エラーありということ
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラーなしで通す
      $('#message').css('background-color', '#fafafa');
    }
    // メールアドレスのチェック
    if ($('#email').val()== '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1){
      // エラー
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      // エラーなし
      $('#email').css('background-color', '#fafafa');
    }
    if($('#prefecture:selected').val(0)){
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を選択して下さい\n';
    }

    // 電話番号のチェック（未入力はOK,未入力でない場合'-'を必須に）
    // つまり、telの条件として’入力した内容’は-が含まれないを比較（!=）等しい場合はfalseを返す
    // ’’と-が含まれていないか？という条件を比較→入力した内容に-が含まれている若しくは何も入力されていない場合はtrueを返す
    if($('#tel').val()!= '' && $('#tel').val().indexOf('-') == -1){
      // エラーあり
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else{
      // エラーがなかった場合
      $('#tel').css('background-color', '#fafafa');
    }
    // 個人情報のボックスの部分
    if($('#agree').prop('checked') == false){
      error = true;
      message += '個人情報の取り扱いについてご同意頂ける場合は、チェックボックスにチェックしてください\n';
    }
    // エラーの有無で送信ボタンを切り替え
    if(error == true) {
      $('submit').attr('src', 'images/button-submit.png')
    } else{
      $('#submit').attr('src', 'images/button-submit-blue.png')
    }
    // オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうかを返す
    return result;
  }

  
});




