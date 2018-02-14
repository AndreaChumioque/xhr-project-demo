const init = function() {
  const form = document.getElementById('search-form');
  const xhrBtn = document.getElementById('submit-xhr');
  const fetchBtn = document.getElementById('submit-fetch');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  const apiKey = '1632d85543424075afa47db2d2ba2362';
  let articles;

  xhrBtn.addEventListener('click', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNewsXHR();
  });

  fetchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    
    let uri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${apiKey}&?sort=newest`;

    fetch(uri)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        createNews(data);
      })
      .catch(function(error) {
        handleError();
        console.log(error);
      });
  });

  function getNewsXHR() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${apiKey}&?sort=newest`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }

  function handleError() {
    console.log('Se ha producido un error.');
    responseContainer.innerHTML = '<p>Lo sentimos! Se ha producido un error.</p>';
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    createNews(data);
  }

  function createNews(data) {
    articles = data.response.docs;
    articles.length = 5;
    console.log(articles);

    for (article of articles) {
      let li = document.createElement('li');
      let heading = document.createElement('a');
      let content = document.createElement('p');

      li.className = 'articleClass';
      heading.className = 'articleTitle';
      heading.innerText = article.headline.main;
      heading.setAttribute('href', article.web_url);
      content.innerText = article.snippet;
      li.appendChild(heading);
      li.appendChild(content);

      if (article.multimedia.length) {
        console.log(article.multimedia[13].url);
        let thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', `https://static01.nyt.com/${article.multimedia[15].url}`);
        li.appendChild(thumbnail);
      }

      responseContainer.appendChild(li);
    }
  }
};

window.addEventListener('load', init);