function jsonOutput() {
  // XMLHttpRequestインスタンスを作成
  let request = new XMLHttpRequest();

  // JSONファイルが置いてあるパスを記述
  request.open('GET', './article-2024/index/2024-06.json');
  request.send();

  // JSON読み込み時の処理
  request.onreadystatechange = () => {
    // 全てのデータを受信・正常に処理された場合
    if (request.readyState == 4 && request.status == 200) {
      // JSONデータを変換
      let json = JSON.parse(request.responseText);

      // 生成したHTMLを入れておく変数
      let html = '';
      // 生成したモーダル用のHTMLを入れておく変数
      let modal = '';

      // JSONにあるオブジェクト数の分だけfor文で処理
      for (let i = 0; i < json.length; i++) {
        // ポップアップ表示の場合
        if (json[i].display === 'popup') {
          let htmlParts =
            '<div class="p-parts js-modalOpen" aria-expanded="false" aria-controls="modal_' +
            // 配列のインデックスは0から始まるため、分かりやすく+1して正の整数にしている
            (i + 1) +
            '">' +
            '<figure><img src="' +
            json[i].image +
            '" alt=""></figure>' +
            '<p class="p-parts__title">' +
            json[i].title +
            '</p>' +
            '<div>';

          // 先述の変数の中に、出来上がったHTMLを格納
          html += htmlParts;

          // モーダル生成
          let modalParts =
            '<div class="p-modal" id="modal_' +
            (i + 1) +
            '" aria-hidden="true">' +
            '<div class="p-modal__wrap">' +
            '<button class="js-modalClose" aria-controls="modal_' +
            (i + 1) +
            '"></button>' +
            '<h3 class="p-modal__title">' +
            json[i].title +
            '</h3>' +
            '<figure class="p-modal__image"><img src="' +
            json[i].image +
            '" alt="' +
            json[i].title +
            '"></figure>' +
            '<div class="p-modal__text">' +
            '<p>' +
            json[i].text +
            '</p>' +
            '<a class="link" href="' +
            json[i].url +
            '" target="_blank">リンク先へ飛ぶ' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>';

          // 先述の変数の中に、出来上がったモーダル用HTMLを格納
          modal += modalParts;
        } else {
          // アンカーリンクの場合
          let htmlParts =
            '<div class="p-parts">' +
            '<a href="' +
            json[i].url +
            '" target="_blank">' +
            '<figure><img src="' +
            json[i].image +
            '" alt=""></figure>' +
            '<p class="p-parts__title">' +
            json[i].title +
            '</p>' +
            '</a>' +
            '</div>';

          // 先述の変数の中に、出来上がったHTMLを格納
          html += htmlParts;
        }
      }

      // 変数に格納したHTMLを出力
      document.getElementById('container').innerHTML = html;
      document.getElementById('modal').innerHTML = modal;
    }
  };
}
