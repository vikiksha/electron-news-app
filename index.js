const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("31693f932afa43988c1bb5c41e2c398f");
const newsList = document.querySelector("#news-list");
const categories = document.querySelectorAll(".offcanvas-body");
let news;
const createNews = function (category) {
  newsapi.v2
    .topHeadlines({
      category: category,
      language: "en",
      country: "us",
    })
    .then((res) => {
      console.log(res);
      news = res.articles;
      displayNews(news);
    })
    .catch((err) => console.log(err));
};
createNews("business");

const displayNews = function (allNews) {
  newsList.innerHTML = "";
  newsList.insertAdjacentHTML(
    "afterbegin",
    `<li class="d-flex me-auto">
                <input
                  class="form-control"
                  type="text"
                  value=""
                  placeholder="Search for news"
                  style="width: 350px"
                  onchange="search(this)"
                />
              </li>
              <hr />`
  );
  allNews.forEach((news) => {
    let singleNews = `<li class="d-flex gap-2" style="width: 500px">
                <img
                  class="img-circle media-object pull-left"
                  src="${news.urlToImage}"
                  width="50"
                  height="50"
                />
                <div class="media-body flex-grow-1 me-2">
                  <strong><a href="${news.url}" onclick="openWindow(event)">${
      news.title
    }</a></strong>
                  <div class="d-flex justify-content-between">
                    <span>${news.publishedAt}</span>
                    <span>Author: ${news.author ?? " "}</span>
                  </div>
                  <p>${news.description}</p>
                </div>
              </li>
`;
    newsList.insertAdjacentHTML("beforeend", singleNews);
  });
};

// target the link to another window
const openWindow = function (event) {
  event.preventDefault();
  let link = event.target.href;
  window.open(link);
};

categories.forEach((el) => {
  el.addEventListener("click", (event) => {
    let category = event.target.id;
    categories.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
    createNews(category);
  });
});

const search = function (input) {
  let query = input.value;
  let filterNews = news.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filterNews);
  displayNews(filterNews);
};
