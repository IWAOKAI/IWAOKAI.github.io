'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'メニューを開く');
}));
const form = document.getElementById('application-form');
const confirmation = document.getElementById('confirmation');
function setStep(confirming) {
  form.hidden = confirming; confirmation.hidden = !confirming;
  document.getElementById('progress-input').classList.toggle('active', !confirming);
  document.getElementById('progress-confirm').classList.toggle('active', confirming);
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.getElementById('nickname');
  if (!name.value.trim()) { name.setCustomValidity('お名前・ニックネームを入力してください。'); name.reportValidity(); return; }
  const fields = [['お名前・ニックネーム', name.value.trim()], ['メールアドレス', document.getElementById('email').value], ['お住まいの地域', document.getElementById('region').value || '未選択'], ['対象条件・説明の確認', '確認済み']];
  const list = document.getElementById('confirmation-data'); list.replaceChildren();
  fields.forEach(([label, value]) => { const dt = document.createElement('dt'); dt.textContent = label; const dd = document.createElement('dd'); dd.textContent = value; list.append(dt, dd); });
  setStep(true); confirmation.focus();
});
document.getElementById('nickname').addEventListener('input', event => event.target.setCustomValidity(''));
document.getElementById('edit-form').addEventListener('click', () => { setStep(false); document.getElementById('nickname').focus(); });
function clearInput() { form.reset(); document.getElementById('nickname').setCustomValidity(''); document.getElementById('confirmation-data').replaceChildren(); setStep(false); }
document.getElementById('clear-form').addEventListener('click', () => { clearInput(); document.getElementById('nickname').focus(); });
window.addEventListener('pagehide', clearInput);
const dialog = document.getElementById('info-dialog');
const dialogContent = {
  privacy: { title: '個人情報の取り扱いについて', body: '<p>このページは開設準備中の画面見本です。フォームは動作確認用で、実際の個人情報は入力しないでください。</p><h3>この画面での入力</h3><p>入力は確認画面の表示にのみ使用します。運営側への送信、ブラウザーへの保存、アクセス解析への送信は行いません。「入力内容を消して終了する」ボタンで入力を消去できます。</p><h3>正式な受付開始にあたって</h3><p>運営者名、問い合わせ先、利用目的、保存期間、第三者提供の有無、削除依頼の窓口等を記載した方針を公開してから受付を開始します。現在の文章は、正式な受付に適用されるプライバシーポリシーではありません。</p><h3>閲覧時の通信</h3><p>ページの配信に必要な通信は発生し、配信サービス側でアクセスログが記録される場合があります。広告・アクセス解析・外部フォントは組み込んでいません。</p>' },
  operator: { title: '運営・サービス情報', body: '<p>「ふたりの余白」は仮のサービス名称です。現在は開設準備中で、相談・入会のお申し込みを受け付けていません。</p><h3>サービスの方針</h3><p>性行為を前提にしない結婚を希望する18歳以上の独身の方を対象に、互いの意思を尊重する出会いの支援を構想しています。</p><h3>正式な受付開始前に公開する情報</h3><p>運営事業者の正式名称・所在地・連絡先、料金、支援内容、入会条件、契約・解約条件、個人情報の取り扱いを公開します。現在、成婚実績や在籍会員数を示すものではありません。</p><p>この画面から契約・支払い・応募の送信は行われません。</p>' }
};
function openInfo(key) { const data = dialogContent[key]; document.getElementById('dialog-title').textContent = data.title; document.getElementById('dialog-body').innerHTML = data.body; dialog.showModal(); }
document.getElementById('privacy-open').addEventListener('click', () => openInfo('privacy'));
document.getElementById('privacy-footer').addEventListener('click', () => openInfo('privacy'));
document.getElementById('operator-open').addEventListener('click', () => openInfo('operator'));
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
document.getElementById('dialog-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
document.getElementById('year').textContent = String(new Date().getFullYear());

const planner = document.getElementById('styles');
function updateStyle() {
  const housing = planner.querySelector('input[name="housing"]:checked').value;
  const children = planner.querySelector('input[name="children"]:checked').value;
  const titles = {
    'together/wish': '同じ家で、子どもとの将来も考えたい。',
    'together/no': 'ふたりの暮らしを、同じ家で。',
    'together/undecided': '一緒に暮らしながら、将来を考えたい。',
    'separate/wish': '住まいは別々に、子どもとの将来も考えたい。',
    'separate/no': 'それぞれの住まいから、支え合いたい。',
    'separate/undecided': '住まいは別々に、将来を話し合いたい。',
    'undecided/wish': '子どもとの将来を、選択肢にしたい。',
    'undecided/no': '子どもを持たない将来を、考えたい。',
    'undecided/undecided': 'まだ決まっていなくても、大丈夫。'
  };
  const housingText = {
    together: '家事や生活費の分担、寝室、ひとりで過ごす時間も、話し合いたいテーマです。',
    separate: '会う頻度や住む場所、日々の連絡や困ったときの助け合いを、一緒に考えていけます。',
    undecided: '暮らし方は、今すぐ決めなくても大丈夫。心地よい距離を少しずつ言葉にしてみましょう。'
  };
  const childrenText = {
    wish: '子どもへの希望や育児の分担も、相手と共有したい大切なこと。希望の実現を約束するものではありません。',
    no: '子どもを持たない希望も、お互いの意思を確かめながら大切にしていきましょう。',
    undecided: '子どもについても、まだ答えが出ていなくて構いません。'
  };
  document.getElementById('style-result-title').textContent = titles[housing + '/' + children];
  document.getElementById('style-result-text').textContent = housing === 'undecided' && children === 'undecided'
    ? '住まいと子どもについて、今の気持ちを選んでみてください。答えを急いで出す必要はありません。'
    : housingText[housing] + childrenText[children];
}
planner.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', updateStyle));
function resetStyle() {
  planner.querySelector('input[name="housing"][value="undecided"]').checked = true;
  planner.querySelector('input[name="children"][value="undecided"]').checked = true;
  updateStyle();
}
document.getElementById('planner-reset').addEventListener('click', resetStyle);
window.addEventListener('pagehide', resetStyle);
