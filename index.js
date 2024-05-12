// fetch Api
// HTTP requests
// Return a Promise
const API_URL = `https://www.omdbapi.com/?apikey=ffa5acbc&s=`
const loader = document.querySelector("#spinner")
const refreshMoviesButton = document.querySelector("#refreshMovies")


function initMovies() {
    refreshMoviesButton.addEventListener("click", () => {
        loadMovies()
    })
    loadMovies()
    // harel want to do something here? it will be blocked? 
    // the answer is: 
}

async function loadMovies() {
    try {
        clearData()
        loader.style.display = "block"
        const moviesArray = await getMoviesApi()
        draw(moviesArray)

    } catch (ex) {
        alert("Harel - application")
    } finally {
        loader.style.display = "none"
    }
}

function clearData() {
    document.querySelector("#movies-content").innerHTML = "";

}
function draw(Movies) {
    if (!Array.isArray(Movies)) return
    clearData();
    const moviesContainer = document.querySelector("#movies-content")
    const moviesCards = Movies.map(movie => getSingleMovie(movie))
    moviesContainer.append(...moviesCards)
}

function getSingleMovie(movie) {
    if (typeof movie !== 'object') return;
    const singleMovieDiv = document.createElement("div")
    singleMovieDiv.id = movie.imdbID
    singleMovieDiv.classList.add("singleMovieDiv")
    const title = document.createElement("h3")
    const year = document.createElement("h5")
    const imdbID = document.createElement("button")
    const plot = document.createElement("p")
    plot.classList.add("plotDes")
    imdbID.addEventListener("click", async () => {
        const result = await getimdbIDApi(movie.imdbID)
        plot.innerText = result
    })
    const type = document.createElement("h5")
    const poster = document.createElement("img")



    title.innerText = movie.Title
    year.innerText = "Year: " + movie.Year
    imdbID.innerText = "imdbID: " + movie.imdbID
    type.innerText = "Type: " + movie.Type
    poster.src = movie.Poster


    singleMovieDiv.append(title, year, imdbID, type, poster, plot)
    return singleMovieDiv
}

async function initCountries() {

    const countriesArray = await getCountriesApi()
    console.log(countriesArray)
}

async function getMoviesApi(movieSearch = "scream") {
    const result = await fetch(API_URL + movieSearch, {
        method: "GET"
    })
    const data = await result.json()
    return data.Search;
}

async function searchMovies(movieName) {
    try {
        const button = document.querySelector("#get-movies");
        const movieInput = document.querySelector("#movie-input");
        button.addEventListener("click", async () => {
            try {
                const movieName = movieInput.value;
                const result = await fetch(`https://www.omdbapi.com/?apikey=85c21c82&s=${movieName}`);
                const data = await result.json();
                draw(data.Search);
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        });
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}


async function getCountriesApi() {

    const result = await fetch(`https://restcountries.com/v3.1/all`, {
        method: "GET"
    })
    const data = await result.json()
    return data

}


async function getimdbIDApi(id) {

    const result = await fetch(`https://www.omdbapi.com/?apikey=ffa5acbc&plot=full&i=` + id, {
        method: 'GET'
    })
    const data = await result.json()
    return data.Plot

}





initMovies()
initCountries()
searchMovies();



