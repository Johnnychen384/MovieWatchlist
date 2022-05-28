// Selectors----------------------------------------------------------------------------------------------------------->
const searchedMovie = document.getElementById('movieSearch');
const searchBtn = document.getElementById("movie-Btn");
const movieList = document.getElementById('movie-el');



// Events-------------------------------------------------------------------------------------------------------------->
searchBtn.addEventListener('click', searchMovies);
movieList.addEventListener('click', saveMovie);




// Functions----------------------------------------------------------------------------------------------------------->


// Takes value of searched movie title and inputs it into the url for dynamic fetching
// then it uses the data received as an argument for render function.
async function searchMovies() {
    
    event.preventDefault();
    const whatIsSearched = searchedMovie.value;
   

    // checks if input length is 3+ and if there is any movies already rendered.
    if(whatIsSearched.length >= 3 && movieList.childElementCount >= 10){
        
        while(movieList.firstChild){
            movieList.removeChild(movieList.firstChild)
        }
        
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=602ff4b1&s=${whatIsSearched}&r=json&plot=full`);
        const data = await response.json();
        render(data);
    } else if(whatIsSearched.length >= 3 && movieList.childElementCount < 10){
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=602ff4b1&s=${whatIsSearched}&r=json&plot=full`);
        const data = await response.json();
        render(data);
    } else {
        alert("Please fill in at least 3 characters!");
    };
};




// creates all the containers for the movies along with the data that fills it in.
async function render(data){
    for (let i = 0; i < 10; i++){
        const singleMovie = data.Search[i].Title;
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=602ff4b1&t=${singleMovie}&r=json&plot=full`);
        const data2 = await res.json();


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('row');
        movieContainer.classList.add('m-5');
        movieList.appendChild(movieContainer);

        // Contains Img ------------------------------------------------->
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('col-2');
        imgContainer.classList.add('d-none');
        imgContainer.classList.add('d-md-block');
        imgContainer.classList.add('d-lg-block');
        imgContainer.classList.add('d-xl-block');
        imgContainer.classList.add('d-xxl-block');
        imgContainer.innerHTML = `<img src="${data2.Poster}" style="width:60%;"/>`;
        movieContainer.appendChild(imgContainer);




        // Row Containing Movie Title/Add To WatchList ------------------>
        const innerMovieColContainer = document.createElement('div');
        innerMovieColContainer.classList.add('col-10');
        movieContainer.appendChild(innerMovieColContainer);

        const innerMovieRow = document.createElement('div');
        innerMovieRow.classList.add('row');
        innerMovieColContainer.appendChild(innerMovieRow);

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('col-8');
        movieTitle.classList.add('sm-col-7');
        movieTitle.classList.add('fs-5');
        movieTitle.innerHTML = `${data2.Title}`;
        innerMovieRow.appendChild(movieTitle);

        const addMoviebtn = document.createElement('button');
        addMoviebtn.classList.add('col-4');
        addMoviebtn.classList.add('md-col-2');
        addMoviebtn.classList.add('w-10');
        addMoviebtn.setAttribute('id', 'addMovieBtn');
        addMoviebtn.innerHTML = `Add`;
        innerMovieRow.appendChild(addMoviebtn);




        // Row Containing Movie Mins/Rating/Genre-------------------------->
        const innerMovieRow2 = document.createElement('div');
        innerMovieRow2.classList.add('row');
        innerMovieColContainer.appendChild(innerMovieRow2);

        const movieMin = document.createElement('h6');
        movieMin.classList.add('col-2');
        movieMin.innerHTML = `${data2.Runtime}`;
        innerMovieRow2.appendChild(movieMin);

        const movieRate = document.createElement('h6');
        movieRate.classList.add('col-2');
        movieRate.innerHTML = `<i class="bi bi-star-fill"></i>${data2.imdbRating}`;
        innerMovieRow2.appendChild(movieRate);

        const movieGenre = document.createElement('h6');
        movieGenre.classList.add('col-5');
        movieGenre.innerHTML = `${data2.Genre}`;
        innerMovieRow2.appendChild(movieGenre);




        // Row Containing Movie Summary------------------------------------->
        const innerMovieRow3 = document.createElement('div');
        innerMovieRow3.classList.add('row');
        innerMovieColContainer.appendChild(innerMovieRow3);

        const moviePlot = document.createElement('h6');
        moviePlot.classList.add('col-10');
        moviePlot.innerHTML = `${data2.Plot}`;
        innerMovieRow2.appendChild(moviePlot);
    };
};




// allows the add to watchlist button to save titles to localstorage
// specifically checks to see if anything clicked on movie-el container 
// contains id of addMovieBtn, then takes the html(title) and calls function.
function saveMovie(e) { 
    const target = e.target;

    // if target element contains addMovieBtn ID 
    // get the html title of this element(movie title)
    // call function with title --> saves title into localstorage
    if(target.id == "addMovieBtn"){
        const saveThisTitle = target.parentElement.firstChild.innerHTML;
        saveToLocalStorage(saveThisTitle);
    };
};




// Saves titles of movies to localstorage
function saveToLocalStorage(target) {
    let savedMovies;

    // checks if localstorage is empty
    // if emmpty create new array and push new value (target) into array
    // if localstorage is not empty, take saved data from localstorage 
    // and set savedMovies as the localstorage data
    if(JSON.parse(localStorage.getItem("savedMovies")) == null){
        savedMovies = [];
    } else {
        savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    };


    // checks to see if title has already been saved into localstorage
    if(savedMovies.includes(target) === false){
        savedMovies.push(target);
        alert('Save complete!');
    } else {
        alert('This movie has already been saved!');
    };

    // sets savedMovies array's data into localstorage
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
};
