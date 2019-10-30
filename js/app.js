// Search functionality on submit
document.getElementById('searchForm')
  .addEventListener('submit', (e) => {
    let searchText = document.getElementById('searchText').value;
    getMovies(searchText);
    e.preventDefault();
})

// Retrieve movies from api
const getMovies = (searchText) => {
  const movieContainer = document.getElementById('movies');
  fetch(`http://www.omdbapi.com/?apikey=52292305&s=${searchText}`)
    .then(response => response.json())
    .then(data => {
      let movies = data.Search;
      let movieContent = ``;
      movies.forEach(movie => {
        movieContent += `
          <div class="collection">
            <img src="${movie.Poster}" title="${movie.Title}" alt="${movie.Title}">
            <h5>${movie.Title}</h5>
          </div>
          `;
        movieContainer.innerHTML = movieContent;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}