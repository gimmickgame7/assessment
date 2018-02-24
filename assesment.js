/*
要件
1.診断結果のパターンのデータを取得できる
2.名前を入力すると診断結果が出力される関数
  i.入力が同じ名前なら、同じ診断結果を出力する処理
  ii.診断結果の文章のうち名前の部分を、入力された名前におきかえる処理
  練習hogehoge
*/

//即時関数という
(function(){
  'use strict';
  const userNameInput = document.getElementById('user-name');
  const assesmentButton = document.getElementById('assesment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');


  /*
  指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
  function removeAllchildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }


  //無名関数
  // assesmentButton.onclick = function() {
  //   console.log('ボタンが押されました');
  // };
  //無名関数はこっちの書き方でもおk(アロー関数と呼ぶ)
  assesmentButton.onclick = () => {
    const userName = userNameInput.value;
    //名前が空の時は処理を終了する（ガード句という）
    if(userName.length === 0){
      return; //戻り値なしに、その場で終了する
    }

    //診断結果表示エリアの作成
    removeAllchildren(resultDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assesment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    console.log(userName);


    //ツイートエリアの作成
    removeAllchildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = '#あなたのいいところ　をツイートする';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
  };


  //constは一度代入すると再代入できない定数の宣言
  const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
  ];

  //2.名前を入力すると診断結果が出力される関数
      /*
      * 名前の文字列を渡すと診断結果を返す関数
      * @param {string} userName　ユーザーの名前
      * @return {string}　診断結果
      */

  function assesment(userName) {
     //全文字のコード番号を取得してそれを足し合わせる
     let sumOfcharCode = 0;
     //名前の文字すべての文字コードを足し合わせている
     for(let i = 0; i < userName.length; i++){
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
     }

     //文字のコード番号の合計を回答数で割って添え字の数値を求める
     const index = sumOfcharCode % answers.length;
     let result = answers[index];

     //診断結果のパターンの数で割った余りを使って、配列から診断結果を取得する
     // const result = answers[index];

     //TODO{userName}をユーザーの名前に置き換える
    return result.replace(/\{userName\}/g, userName);
    return result;
  }

    // テストコード
    console.assert(
        assesment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );

console.assert(
    assesment('太郎') === assesment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
})();
