import config from '../config.js';
const { API_KEY } = config;

// Search functionality on submit
document.getElementById('searchForm')
  .addEventListener('submit', (e) => {
    let searchText = document.getElementById('searchText').value;
    getMovies(searchText);
    e.preventDefault();
});

// Retrieve movies from api
const getMovies = (searchText) => {
  const movieContainer = document.querySelector('.container');
  fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`)
    .then(response => response.json())
    .then(data => {
      let movies = data.Search;
      let movieContent = ``;
      movies.forEach(movie => {
        if (movie.Poster !== 'N/A'){
          movieContent += `
          <div class="collection">
            <div class="img-contain">
              <img src="${movie.Poster}" title="${movie.Title}" alt="${movie.Title}" onerror="this.onerror=null;this.src='https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg';" >
            </div>
            <h5>${movie.Title}</h5>
            <button type="button">Details</button>
          </div>
          `;
        }
        movieContainer.innerHTML = movieContent;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
