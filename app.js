/* Global Constants */
const API_KEY = "fqAGTGRcfKhKDiQgC4u1kLWidAg3ycis"
const LIMIT = 9
const RATING = 'g'
var OFFSET = 0
var keyword = ''

const searchElement = document.getElementById('search')
const loadMoreElement = document.getElementById('load-more-button')
const searchResultsElement = document.getElementById('search-results')


async function fetchGifs(event) {
    event.preventDefault()

    const inputElement = document.getElementById('search-button')
    keyword = inputElement.value
    const response =  await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${LIMIT}&offset=${OFFSET}&rating=${RATING}&lang=en`)
    const results =  await response.json()

    inputElement.value = ''
    searchResultsElement.innerHTML = ''

    getResults(results["data"])

    loadMoreElement.hidden = false
}

function getResults(results){
    // use results.embed_url
    var url

    results.forEach(result => {
        url = result.images.preview_gif.url
        searchResultsElement.innerHTML += `<img src = "${url}" type = "gif" class = "gif">`
    })
}

async function loadMore(event){
    event.preventDefault()

    console.log("Hello!")

    OFFSET += LIMIT
    const response =  await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${LIMIT}&offset=${OFFSET}&rating=${RATING}&lang=en`)
    const results =  await response.json()

    getResults(results["data"])
}

window.onload = function () {
    searchElement.addEventListener('submit', fetchGifs)
    loadMoreElement.addEventListener('click', loadMore)
}

