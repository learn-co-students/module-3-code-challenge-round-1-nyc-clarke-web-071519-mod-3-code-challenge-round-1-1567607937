document.addEventListener('DOMContentLoaded', function() {
allBeers()
//create variables
const beerList = document.querySelector('.list-group')
const beerDetail = document.querySelector('#beer-detail')
//add EventListener
beerList.addEventListener('click', singleBeerClick)
beerDetail.addEventListener('click', editBeerDescription)
//talk to a server using fetch
function allBeers() {
    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(beers => {
        beers.forEach(beer => {
            renderBeers(beer);
        })
    })
}

function ShowSingleBeer(beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(res => res.json())
    .then(renderSingleBeer)
}

function saveBeer(beerId, newDescription, event) {
    // debugger 
    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
             'Accept': 'application/json'
            },
        body: JSON.stringify({
            description: newDescription
        })
    })
    .then(res => res.json())
    event.target.previousElementSibling.innerHTML = `${newDescription}`

}

//LOGIC/DOM Manipulation
function renderBeers(beer) {
    beerList.innerHTML += `<li class="list-group-item" data-beer-id=${beer.id}>${beer.name}</li>`
}

function renderSingleBeer(beerObj) {
    beerDetail.innerHTML = `
    <li data-beer-id=${beerObj.id}>
    <h1>${beerObj.name}</h1>
    <img src="${beerObj.image_url}">
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    </li>`
}

function singleBeerClick(event) { 
    if(event.target.className === "list-group-item") {
        let beerId = event.target.dataset.beerId 
        ShowSingleBeer(beerId)
    }
}

function editBeerDescription(event) {
    event.preventDefault()
     
    if(event.target.className === "btn btn-info") {
        let beerId = event.target.parentNode.dataset.beerId 
        let newDescription = event.target.previousElementSibling.innerHTML 
        saveBeer(beerId, newDescription, event)
    }
}


})