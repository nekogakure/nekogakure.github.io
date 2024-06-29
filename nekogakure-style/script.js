const init_header = () => {
  const header_inner = `
    <h1>
      <a href="/">ねこがくれのホームページ</a>
    </h1>
    <nav class="pc-nav">
      <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/blog">BLOG</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
    </nav>
  `;
  const header = document.createElement("header");
  header.innerHTML = header_inner;
  document.body.prepend(header);
};
const main=()=>{
  init_header();
};main();