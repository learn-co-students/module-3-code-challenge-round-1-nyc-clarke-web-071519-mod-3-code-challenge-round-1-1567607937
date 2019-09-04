document.addEventListener("DOMContentLoaded", function() {
    fetchBeersList()

// ------------------------------ Grab Elements off the DOM ----------------------------------
// grab the list-group .class not #id
const listGroupUl = document.querySelector('.list-group')
const beerDetailDiv = document.querySelector('#beer-detail')

// ------------------------------ Event Listeners to DOM Elements ----------------------------
document.addEventListener('click', handleSingleBeerClick)
document.addEventListener('click', handleEditBeerClick)

// ------------------------------ Talk to Server Using Fetch ---------------------------------
function fetchBeersList() {
    fetch(`http://localhost:3000/beers`)
    .then(resp => resp.json())
    .then(displayBeersList)
}

function fetchSingleBeerInfo(beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(resp => resp.json())
    .then(displaySingleBeer)
}

function fetchToPatchBeer(beerIdForEdit, beerDescription) {
    fetch(`http://localhost:3000/beers/${beerIdForEdit}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // not sure how to find updated value here
            // I had everything working besides this until accessing this one value
            // led to me making a bunch of updates/changes to my code
            description : beerDescription
        })
    })
    .then(resp => resp.json())
    // should still be able to use displaySingleBeer here...
    .then(displaySingleBeer)
}

// ------------------------------ Logic/DOM Manipulation Functions  --------------------------

// NOTE: I added access to beer id for later use
function displayBeersList(beersArray) {
    beersArray.forEach(beer => {
        listGroupUl.innerHTML += `
        <li class="list-group-item" data-beer-id=${beer.id}>${beer.name}</li>
        `
    })
}

function handleSingleBeerClick (event) {
    //console.log(event)
    if (event.target.className === 'list-group-item'){
        let beerId = event.target.dataset.beerId
        fetchSingleBeerInfo(beerId)
    }
}

//do I need need to add access beer id again? added for easiest access.
//added access to beer description too so I can use it for my patch.
//wasn't sure if dataset items had to be within the same tag?
function displaySingleBeer (beer) {
    beerDetailDiv.innerHTML = `
    <h1 data-beer-id=${beer.id}>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea data-beer-description=${beer.description}>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
        Save
    </button>
    `
}

// does textarea + button have same functionality as a form? need event.preventDefault? I'm not sure...
// update: looks like I don't need it.
function handleEditBeerClick (event) {
    // console.log(event)
    if (event.target.className === 'btn btn-info'){
        //this second beerId isn't logging within the dataset?
        let beerIdForEdit = event.target.dataset.beerId
        //can't find the description!! event.target.what?!
        //since I couldn't find it, I added access to it with dataset
        //this still isn't working!!
        let beerDescription = event.target.dataset.beerDescription
    fetchToPatchBeer(beerIdForEdit, beerDescription)
    }
}

});