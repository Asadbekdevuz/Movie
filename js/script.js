let elMovieForm = document.querySelector(".form");
let elMovieFormInput = document.querySelector(".input-form");
let elMovieYear = document.querySelector(".form-input-year");
let elMovieType = document.querySelector(".select-type")  ;
let elMoreBtn = document.querySelector(".more-btn");

let elModalImg = document.querySelector(".modal-img");
let elModalTitle = document.querySelector(".modal-title");
let elModalYear = document.querySelector(".modal-year");
let elModalType = document.querySelector(".modal-type");

let elMoviesSpinner = document.querySelector(".movies__spinner");

let elMovieList = document.querySelector(".list");

let elMovieTemplate = document.querySelector(".template").content;

let elMoviesPaginations =document.querySelector(".js-movies-paginations");

let elMoviesPage = document.querySelector(".js-movies-page")

let page = 1;

let inputVal = "batman"

let selectVal = "movie"

let inputYearVal = ''


// REMOVE SPINNER
function spinnerRemove() {
  elMoviesSpinner.classList.remove("d-none");
}
// ADD SPINNER
function spinnerAdd() {
  elMoviesSpinner.classList.add("d-none");
}
spinnerRemove()


function objItem(obj) {
    let elMovieItem = elMovieTemplate.cloneNode(true)
    elMovieItem.querySelector(".card-img").src = obj.Poster;
    elMovieItem.querySelector(".title").textContent = obj.Title.slice(0, 15) + "..";
    elMovieItem.querySelector(".more-btn").dataset.imdbID = obj.imdbID;

    return elMovieItem
}

function render (arr) {
  elMovieList.innerHTML  = "";
  renderModal(arr)
  let wrapperList = document.createDocumentFragment();

  arr.forEach(element => {
      wrapperList.appendChild(objItem(element))
  });

  console.log(wrapperList);
  elMovieList.appendChild(wrapperList);
} 


const fetchingMovies = async (name = "batman", page = 1,type = "movie", year ) => {
  try {
    let respons = await fetch(`https://omdbapi.com/?apikey=918e78c6&s=${name}&page=${page}&type=${type}&y=${year}`)
    let data = await respons.json()
    console.log(data.Search);
    render(data.Search);
  }catch(e) {
    console.log(e.message);
  }
  finally{
    spinnerAdd()
  }
}   

fetchingMovies()

elMovieForm.addEventListener("submit", function(evt){
  evt.preventDefault()
 
  elMovieList.innerHTML = ""
  spinnerRemove()

  elMoviesPage.textContent = "Page: 1"
  page = 1

  inputVal = elMovieFormInput.value;

  selectVal = elMovieType.value;

  inputYearVal = elMovieYear.value;

  fetchingMovies(inputVal, page, selectVal, inputYearVal) 

})




function renderModal(data){
  elMovieList.addEventListener("click", (evt) => {
    if(evt.target.matches(".more-btn")){
      let id = evt.target.dataset.imdbID
      let findMovie = data.find(el => {
        return el.imdbID === id
      })

      console.log(findMovie);
    
      elModalImg.src = findMovie.Poster;
      elModalTitle.textContent = `Title: ${findMovie.Title}`;
      elModalYear.textContent = `Year: ${findMovie.Year}`;
      elModalType.textContent = `Type: ${findMovie.Type}`;
      

    }
  })

}


for (let index = 1; index <= 10; index++) {
    elMoviesPaginations.innerHTML += `
        <button class = "btn btn-outline-primary" onClick ="moviesPage(${index})">${index}</button>
    `
}

function moviesPage(index) {
  elMoviesPage.textContent = `Page: ${index}`
  page = index;

  fetchingMovies(inputVal, page, selectVal, inputYearVal) 
}
