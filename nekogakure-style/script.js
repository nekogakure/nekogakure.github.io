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
const init_footer = () => {
  const footer_inner = `
    <div>
      <p class="footer-text">
        Copyright &copy; All rights reserved by nekogakure.
      </p>
    </div>`;
  const footer=document.createElement("footer");
  footer.innerHTML=footer_inner;
  document.body.append(footer);
};
const main = () => {
  init_header();
  init_footer();
}; 
main();