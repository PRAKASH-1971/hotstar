var timerid;

let movies_div = document.getElementById("films");
let selectfilminfo = document.getElementById("getflim");

let drop = document.getElementById("dropdown");
async function searchMovies(movie_name) {
    try {
        let res = await fetch(`https://www.omdbapi.com/?apikey=d51aa006&s=${movie_name}`);
        let data = await res.json();
        console.log("data",data)
        return data;
        
    } catch (error) {
        console.log("error", error);

    }



}
// search

function appendMovies(movies) {
    if (movies === undefined) {
        return false;
    }
    drop.innerHTML = null;
    movies.forEach(function(movie) {
        let bigdiv = document.createElement("div");
        bigdiv.setAttribute("class", "bigdiv");
        bigdiv.addEventListener("click", function() {
            selectmovie(movie);
        });
        let div = document.createElement("div");
        div.setAttribute("class", "dropdiv");
        let image = document.createElement("img");
        image.src = movie.Poster;
        image.setAttribute("class", "dropimage")
        div.append(image);
        let div2 = document.createElement("div");
        div2.setAttribute("class", "rightdiv");

        let p = document.createElement("p");
        p.setAttribute("class", "dropdownp")
        p.innerHTML = movie.Title;
        div2.append(p);
        bigdiv.append(div, div2)
        drop.append(bigdiv);
    });

}
async function main() {
    let name = document.getElementById("takemovie").value;

   
    if (name.length < 3) {
        return false;
    }

    let res = await searchMovies(name);
    let moviesdata = res.Search;
    appendMovies(moviesdata)
    console.log("res", moviesdata);

}

function debounce(func, delay) {


    drop.style.display = "block";


    if (timerid) {
        clearTimeout(timerid);
    }
    timerid = setTimeout(function() {
        func();

    }, delay)
}



function selectmovie(movie) {
    let name = document.getElementById("takemovie");
    let left = document.getElementById("middleflex")
    let right = document.getElementById("righforming")
    let image = document.getElementById("imageforsearh")
    name.value = ""
    // drop.style.display = "none";
    right.innerHTML = "";

    selectfilminfo.style.display = "block";
    image.src = movie.Poster;
    let filmname = document.createElement("p");
    filmname.innerHTML = movie.Title;
    filmname.innerHTML = movie.Title;
    filmname.setAttribute("class", "type")
    let relesedate = document.createElement("p");
    relesedate.setAttribute("class", "type")
    relesedate.innerHTML = "Released-Year: " + movie.Year
    let imdb = document.createElement("p");

    imdb.innerHTML = "ImdbRating: " + movie.imdbID
    imdb.setAttribute("class", "type")
    let movietype = document.createElement("p");

    movietype.innerHTML = "Type: " + movie.Type
    movietype.setAttribute("class", "type")
    right.append(filmname, relesedate, imdb, movietype);


}



async function getmovie() {
    try {
        let res = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e57244401adfc359ef9a9fd132bee2f5`);
        var data = await res.json();
        let movies = data.results;
        console.log(movies)
        displaymovie(movies)

    } catch (e) {
        console.log("e", e);

    }
}

function displaymovie(movies) {
    movies.forEach(function(movie) {



        let div = document.createElement("div");
        div.addEventListener("click", function() {
            selectmoviep(movie);
        });
        div.setAttribute("class", "movieholder")
        let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

        let name = document.createElement("p");
        name.innerHTML = movie.title
        let relesedate = document.createElement("p");
        relesedate.innerHTML = movie.release_date
        let imdb = document.createElement("p");
        imdb.innerHTML = movie.vote_average


        console.log(movie.title)


        div.append(img, name, relesedate, imdb, );
        movies_div.append(div);

    })



}

function selectmoviep(e) {
    let name = document.getElementById("takemovie");
    let left = document.getElementById("middleflex")
    let right = document.getElementById("righforming")
    let image = document.getElementById("imageforsearh")
    name.value = ""
    drop.style.display = "none";
    right.innerHTML = "";

    selectfilminfo.style.display = "block";
    image.src = "https://image.tmdb.org/t/p/w500" + e.poster_path;
    let filmname = document.createElement("p");
    filmname.innerHTML = e.title;

    filmname.setAttribute("class", "type")
    let relesedate = document.createElement("p");
    relesedate.setAttribute("class", "type")
    relesedate.innerHTML = "Released-Year: " + e.release_date
    let imdb = document.createElement("p");

    imdb.innerHTML = "ImdbRating: " + e.vote_average
    imdb.setAttribute("class", "type")
    let movietype = document.createElement("p");

    movietype.innerHTML = "Overveiw: " + e.overview
    movietype.setAttribute("class", "type")
    right.append(filmname, relesedate, imdb, movietype);

}
 getmovie();