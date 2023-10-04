//menampilkan film
const tombol = document.querySelector(".button-search");
tombol.addEventListener("click", () => {
  const inputText = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=c07afade&s=" + inputText.value)
    .then((respone) => respone.json())
    .then((respone) => {
      const movies = respone.Search;
      const MovieContainer = document.querySelector(".movie-container");
      let cards = "";
      movies.forEach((m) => {
        cards += showcards(m);
      });
      MovieContainer.innerHTML = cards;
      const modal = document.querySelector(".modal-body");
      const btnModal = document.querySelectorAll(".btn-detail-modal");
      btnModal.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdb = this.dataset.imdb;
          fetch("http://www.omdbapi.com/?apikey=c07afade&i=" + imdb)
            .then((respone) => respone.json())
            .then((m) => {
              modal.innerHTML = showDeatil(m);
            });
        });
      });
    });
});

function showcards(m) {
  return `<div class="col-md-4 my-5">
            <div class="card" style="width: 18rem">
            <img src="${m.Poster}" class="card-img-top" alt="" />
            <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <p class="year">${m.Year}</p>
                <a class="btn btn-detail-modal btn-primary"data-bs-toggle="modal"
                data-bs-target="#exampleModal" data-imdb = "${m.imdbID}">Show Detail</a>
            </div>
            </div>
        </div>`;
}
function showDeatil(m) {
  return `<div class="col">
                <img src="${m.Poster}" alt="" />
                </div>
                <div class="col">
                <ul class="list-group">
                    <li class="list-group-item">Judul : ${m.Title}</li>
                    <li class="list-group-item">Genre : ${m.Genre}</li>
                    <li class="list-group-item">Pemain : ${m.Actors}</li>
                    <li class="list-group-item">Sinopsis : ${m.Plot}</li>
                </ul>
                </div>
                </div>
                <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>`;
}
const input = document.querySelector(".input-keyword");
