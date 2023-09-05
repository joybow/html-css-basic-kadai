let untyped ='';
let typed ='';
let score = 0;


// 必要なhtml要素の取得
const untypedfield =document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

const textLists= [
  'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
]

const createText = () => {
  // 正タイプした文字列をクリア
  typed='';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random()*textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
createText();

// キー入力の判定
function keyPress(e) {
  // 間違った場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
  return;
  }
  // 合っている場合
  // スコアをプラスさせる
  score++;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
  let count = typed.length;
  countNumber.textContent = count;
};

const rankCheck = score => {
  // スコアの値を返す
  // return `${score}文字打てました！`;
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100){
    text =`あなたのランクはDです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200){
    text = `あなたのランクはCです。\nAランクまであと${200 - score}文字です。`;
  } else if(score <300){
    text = `あなたのランクはBです。\nSランクまであと${300 - score}文字です。`;
  } else if(score < 300){
    text = `あなたのランクはAです。\nおめでとうございます`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n 【OK】リトライ/ 【キャンセル】終了`;
};

const gameOver = id =>{
  clearInterval(id);

  const result = confirm(rankCheck(score));
  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のhtml要素(p要素)を取得する
  let time =count.textContent;
  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが０になったらタイマーを停止する
    if(time <=0){
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click',() => {
  // カウントダウンタイマーを開始する
  timer();
  // ランダムなテキストを表示する
  createText();
  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';
    // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

countNumber.textContent;

untypedfield.textContent = 'スタートボタンで開始';
document.addEventListener('keypress',keyPress);