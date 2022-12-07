// Resposta by Adejane Moreira
const URL_BASE = `https://6388fbf0a4bb27a7f796c4f7.mockapi.io/`;
const ajax = new XMLHttpRequest();
let dataPosts = [];
let page = 1;
let limit = 4;
let userId = 1;

const loadMore = document.querySelector('#carregar-mais');
loadMore.addEventListener('click', function () {
  getDataFromPost(page++);
});

function getDataFromUser() {
  return new Promise((resolve) => {
    ajax.onreadystatechange = async function () {
      if (ajax.readyState == ajax.DONE) {
        dataUser = JSON.parse(this.responseText);
        resolve(dataUser);
      }
    };
    ajax.open('GET', URL_BASE + `user/${userId}`, true);
    ajax.send();
  });
}

function getDataFromTotal() {
  return new Promise((resolve) => {
    ajax.onreadystatechange = async function () {
      if (ajax.readyState == ajax.DONE) {
        let total = JSON.parse(this.responseText);
        resolve(total.length);
      }
    };
    ajax.open('GET', URL_BASE + `user/${userId}/posts`, true);
    ajax.send();
  });
}

function disableLoadMoreButton() {
  const element = document.getElementById('carregar-mais');
  element.classList.add('disabled');
}

async function getDataFromPost(page) {
  const user = await getDataFromUser();
  const total = await getDataFromTotal();

  console.log(total, dataPosts.length);

  if (total >= dataPosts.length) {
    loadMore.disabled = true;
    disableLoadMoreButton();
  }

  ajax.open(
    'GET',
    URL_BASE + `user/${userId}/posts?page=${page}&limit=${limit}`,
    true
  );
  ajax.send();

  ajax.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      data = JSON.parse(this.responseText);
      dataPosts = data;
      data.map((post) => {
        createPost(post, user);
      });
    }
  };
}

const createPost = async function (post, user) {
  const paginationDiv = document.querySelector('.pagination');
  paginationDiv.insertAdjacentHTML(
    'beforebegin',
    `
    <article class="box post post-excerpt">
          <header>
            <h2><a href="#">${post ? post.titlePost : null}</a></h2>
            <p>${post ? post.captionPost : null}</p>
          </header>
          <div class="info">
            <span class="date"><span class="month">Dez</span> <span class="day">01</span><span class="year">,
                2022</span></span>
            <ul class="stats">
              <li><a href="#" class="icon fa-comment">86</a></li>
              <li><a href="#" class="icon fa-heart">99</a></li>
              <li><a href="#" class="icon brands fa-twitter">21</a></li>
              <li><a href="#" class="icon brands fa-facebook-f">21</a></li>
            </ul>
          </div>
          <a href="#" class="image featured"><img src="${
            post ? post.imagePost : null
          }" alt="" /></a>
          <p>
            ${post ? post.textPost : null}
          </p>
          <p class="author-avatar">
            <strong>Create by</strong>
            ${user.userName}
            <img src="${user.avatar}" />
          </p>
        </article>
  `
  );
};
