// Selectors----------------------------------------------------------------------------------------------------------->
const searchedMovie = document.getElementById('movieSearch');
const searchBtn = document.getElementById("movie-Btn");
const movieList = document.getElementById('movie-el');




// Events-------------------------------------------------------------------------------------------------------------->
document.addEventListener('DOMContentLoaded', renderLocalStorage());
movieList.addEventListener('click', deleteMovie);



// Functions----------------------------------------------------------------------------------------------------------->


// gets data from localstorage and saves it in variable/array.
// calls renders function with said data, which renders on document load.
function renderLocalStorage() {
    let savedMovies;

    if(JSON.parse(localStorage.getItem("savedMovies")) == null){
        savedMovies = [];
    } else {
        savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    };

    render(savedMovies); 
};



// creates all the containers for the movies along with the data that fills it in.
async function render(data){
    for (let i = 0; i < data.length; i++){
        const singleMovie = data[i];
        const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=602ff4b1&t=${singleMovie}&r=json&plot=full`);
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

        const removeMoviebtn = document.createElement('button');
        removeMoviebtn.classList.add('col-4');
        removeMoviebtn.classList.add('md-col-2');
        removeMoviebtn.classList.add('w-10');
        removeMoviebtn.setAttribute('id', 'removeMovieBtn');
        removeMoviebtn.innerHTML = `X`;
        innerMovieRow.appendChild(removeMoviebtn);




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


function deleteMovie(e) {
    const target = e.target;
    if(target.id == "removeMovieBtn"){
        const thisMovie = target.parentElement.firstChild.innerHTML;
        deleteFromLocalStorage(thisMovie);
        const parentMovieContainer = target.parentElement.parentElement.parentElement;
        parentMovieContainer.remove();
    };
};


function deleteFromLocalStorage(target) {
    // create empty variable for future purposes.
    let savedMovies;


    // checks to see if localstorage has any data saved to the key "savedMovies"
    // if it does not then turn the variable saveLocalStorage into an empty array
    // then procede to pushing the target parameter into array and saving it to localStorage
    if (JSON.parse(localStorage.getItem("savedMovies")) == null){
        savedMovies = [];
    
    
    // if the first condition is not met
    // that means that after checking the localstorage 
    // it contains previously saved data under the key "savedMovies".
    // Pull data from localstorage into the variable savedMovies
    // because the data pulled is in string form, inside the localstorage
    // it is saved in an array. Hence by pulling data into savedMovies variable
    // it automatically turns it into an array also.
    // Then it being an array already, we can just push the target obtained from the above
    // function, into the array adding onto the data pulled. Then we set the array back into the
    // localstorage which now includes the old data and the new data.
    } else {
        savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    };

    const indexOfStorageItem = target;


    // Using the innerText stored in indexOfStorageItem to target and remove any elements
    // inside the savedMovies array.
    savedMovies.splice(indexOfStorageItem, 1);


    // save savedMovies into chrome localstorage.
    // by stringifying it, it turns it into an item that can only be pushed into
    // an array and prevents
    // it from becoming an object.
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
};