//日付の設定
const blog_start = {
  year: 2024,
  month: 4
}
let today = new Date();
today = {
  year: today.getFullYear(),
  month: today.getMonth() + 1
}
const data_list_length = 1 + 12 * (today.year - blog_start.year) + today.month - blog_start.month;
//ドメイン等の設定
const domain = new URL(window.location.href);
const blog_domain = domain.hostname;
const load_more_button = document.querySelector("#load-more");
const getData = (name) => {
  fetch(name + ".json")
    .then((res) => res.json())
    .then((apiData) => {
      const infos = apiData.info;
      for (let i = 0; i < infos.length; i++) {
        const info = infos[i];
        const box = document.createElement("button");
        box.className = "blog-button show-blog-button";
        box.onclick = () => {
          window.location.href = info.index;
        }
        const thumbnail = document.createElement("img");
        thumbnail.src = info.thumbnail;
        thumbnail.alt = info.name;
        thumbnail.loading = "lazy";
        const loading = document.createElement("img");
        loading.src = "data:image/svg+xml;base64,PHN2ZyAgIHZlcnNpb249IjEuMSIgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICAgdmlld0JveD0iLTYwIC02MCAxMjAgMTIwIiAgIGZpbGw9Im5vbmUiICAgc3Ryb2tlPSIjNzc3Ij4gICA8Zz4gICA8YW5pbWF0ZVRyYW5zZm9ybSAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iICAgICBhdHRyaWJ1dGVUeXBlPSJYTUwiICAgICB0eXBlPSJyb3RhdGUiICAgICBmcm9tPSIwIDAgMCIgICAgIHRvPSIzNjAgMCAwIiAgICAga2V5VGltZXM9IjA7IDEiICAgICBrZXlTcGxpbmVzPSIwLjUsIDAuMjMsIDAuNSwgMC43NyIgICAgIGNhbGNNb2RlPSJzcGxpbmUiICAgICBkdXI9IjJzIiAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gICA8YW5pbWF0ZSAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiICAgICAgIHZhbHVlcz0iI2YwMDsjZmYwOyMwZjA7IzBmZjsjMDBmOyNmMGY7I2YwMCIgICAgICAgZHVyPSI1cyIgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgPGVsbGlwc2UgY3g9Ii0yNSIgY3k9IjAiIHJ4PSIyNSIgcnk9IjIwIiBzdHJva2Utd2lkdGg9IjIiIC8+ICAgPGVsbGlwc2UgY3g9IjI1IiBjeT0iMCIgcng9IjI1IiByeT0iMjAiIHN0cm9rZS13aWR0aD0iMiIgLz4gICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNTAiIHN0cm9rZS13aWR0aD0iNCIgLz4gICA8L2c+IDwvc3ZnPiA=";
        loading.alt = "loading...";
        loading.className = "loading-infinity";
        const title = document.createElement("div");
        title.innerHTML = "<h1>" + info.title + "</h1><p>date: " + info.date + "</p>";
        box.innerHTML = loading.outerHTML + thumbnail.outerHTML + title.outerHTML;
        const insert_button = () => {
          document.querySelector("#blog-button-section").insertBefore(box, load_more_button);
        }
        setTimeout(insert_button, 200);
      }
    }).catch((err) => console.log(`データが取得できませんでした：${err}`));
};
let load_count = data_list_length;
const load_articles = () => {
  if (load_count > 0) {
    const year_and_month = (blog_start.year + ~~((blog_start.month + load_count - 1) / 12)).toString() + "-" + ((blog_start.month + load_count - 2) % 12 + 1).toString().padStart(2,"0");
    const pathname = "/article-" + blog_start.year.toString() + "/index/" + year_and_month;
    getData(pathname);
    if (load_count <= 1) {
      load_more_button.style.opacity = 0;
      load_more_button.classList.add("hide-blog-button");
      load_more_button.classList.remove("show-blog-button");
    }
    load_count--;
    const next_year_and_month = (blog_start.year + ~~((blog_start.month + load_count - 1) / 12)).toString() + "/" + ((blog_start.month + load_count - 2) % 12 + 1).toString().padStart(2,"0");
    document.querySelector("#load-more div p").innerHTML = "next: "+next_year_and_month;
  }
}
load_articles();
//検索機能
const article_search_input = document.querySelector("#list-head div input");
const search_articles = () => {
  const search_query = article_search_input.value.replace("　", " ").toLowerCase();
  const blog_buttons = document.querySelector("#blog-button-section").children;
  if (search_query == "") {
    for (let i = 0; i < blog_buttons.length; i++) {
      blog_buttons[i].style.display = "";
    }
    return null;
  }
  const search_querys = search_query.split(" ");
  for (let i = 0; i < blog_buttons.length; i++) {
    const blog_button = blog_buttons[i];
    const button_inner = blog_button.innerHTML;
    const title = button_inner.substring(button_inner.indexOf("<div>") + 5, button_inner.indexOf("</div>")).toLowerCase();
    blog_button.style.display = "";
    for (let j = 0; j < search_querys.length; ++j) {
      if (-1 == title.indexOf(search_querys[j])) {
        blog_button.style.display = "none";
      }
    }
  }
  if (load_count > 0) {
    load_more_button.style.display = "";
  }
  return search_query;
}
