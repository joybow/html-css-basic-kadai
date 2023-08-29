const btnClick = document.getElementById('btn')

btnClick.addEventListener('click',() =>{
  setTimeout(()=> {
  document.getElementById('text').innerHTML=('ボタンをクリックしました！');
  },2000);
});
