import 'bootstrap';
import './scss/app.scss';


const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click',function(){
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('http://www.omdbapi.com/?apikey=3643c910&s='+inputKeyword.value)
   .then(response =>response.json())
   .then(response =>{
    const movies = response.Search;
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
    //ketika tombol detail diklik
    const modalButton = document.querySelectorAll('.modal-detail-button');
    modalButton.forEach(btnn => {
      btnn.addEventListener('click',function(){
        const imdbid = this.dataset.imdbid;
        console.log(imdbid);
        fetch('http://www.omdbapi.com/?apikey=3643c910&i='+imdbid)
          .then(response=>response.json())
          .then(response=>{
            console.log(response);
            const movieDetail = showMovieDetail(response);
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = movieDetail;
          });
      })
    })
  });
});

function showCards(m){
  return `<div class="col-md-4 mt-5">
  <div class="card" >
      <img class="card-img-top" src="${m.Poster}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted ">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" 
        data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show detail</a>
      </div>
    </div>
</div>`;
}

function showMovieDetail(m){
  return  `
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} - ${m.Year}</h4></li>
          <li class="list-group-item"><strong>Director:  </strong> ${m.Director}</li>
          <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
          <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
          <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`;
}

