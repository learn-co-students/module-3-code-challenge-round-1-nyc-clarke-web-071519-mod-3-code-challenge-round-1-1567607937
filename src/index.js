document.addEventListener('DOMContentLoaded', function(){
    getAllBeers()
    
// ----- Grab Elements off the DOM --------------
const beerList = document.querySelector('#list-group')
const beerListInfo = document.querySelector('#beer-detail')

// ----- Talk to Server Using Fetch -------------
function getAllBeers() {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(allBeers)
}

function getBeerInfo(beerID) {
    fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(resp => resp.json())
    .then(beerInfo => beerInfo(beerObj))
}

// ----- Event Listeners to DOM Elements --------
beerList.addEventListener('click', clickOnBeerName)

// ----- Logic/DOM Manipulation Functions -------

//add beer to the left side of the page in under ul in a li tag 
function getAllBeers(allBeers){
    allBeers.forEach(beer => {
    //    let li = document.createElement('LI')
    //    li.innerText = beer.name
    //    beerList.append(li)
    beerList.innerHTML += <li data-beer-id='${beer.id}' class="list-group-item" > ${beer.name} </li>
    });
}
// get beer info on the right side of the page under div class 'beer-details'
function clickOnBeerName(event){
    if (event.target.className === "list-group-item"){
        let beerID = event.target.dataset.beerID
        getBeerInfo(beerID)
    }
}

function beerInfo(beerObj){
    beer.innerHTML += `
    <h1>${beer.name}</h1>
    <img src="<${beer.image_url}>">
    <h3>Beer Tagline</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>
    `
})
