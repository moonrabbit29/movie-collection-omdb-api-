import 'bootstrap';
import './scss/app.scss';
import * as $ from 'jquery'


$('.search-button').on('click',function(){
  $.ajax({
      url: 'http://www.omdbapi.com/?apikey=3643c910&s='+$('.input-keyword').val(),
      success: results => {
          const movies = results.Search;
          let cards = ``;
          console.log(movies);
          movies.forEach(m => {
              cards += showCards(m);
          });
          $('.movie-container').html(cards);
  
          //ketika tombol detail di-klik
          $('.modal-detail-button').on('click', function () {
              $.ajax({
                  url: 'http://www.omdbapi.com/?apikey=3643c910&i=' + $(this).data('imdbid'),
                  success: m => {
                      if(typeof(m)==='undefined'){
                        prompt("Movie tidak tersedia")
                      }
                      console.log(m);
                      const movieDetail =
                      $('.modal-body').html(movieDetail);
                  },
                  error: (e) => {
                      console.log(e.responseText);
                  },
                  type : "GET"
              });
          })
  
      },
      error: (e) => {
          console.log("not working");
      },
      type: "POST"
  
  })
})

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

