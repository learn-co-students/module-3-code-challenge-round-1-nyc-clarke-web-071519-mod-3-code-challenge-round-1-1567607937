document.addEventListener("DOMContentLoaded", function() {

  fetchBeers();
  
  // -----------grab elements from dom----------
  
  const ul = document.querySelector('#list-group')
  const beerDetailDiv = document.querySelector('#beer-detail')
//------------talk to the server-------------
  
function fetchBeers() {
  fetch('http://localhost:3000/beers') 
    .then(res => res.json())
    .then(displayBeers)
}

function fetchBeerInfo(beerId) {
  fetch(`http://localhost:3000/beers/${beerId}`)
  .then(res => res.json())
  .then(displayBeerInfo)
}

function patchBeerDesc(beerDiv) {
  fetch(`http://localhost:3000/beers/${beerDiv.children[4].dataset.beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: beerDiv.children[3].value
    })
  })
  .then(res => res.json())
  .then(res => {console.log("Successfully Saved!"); displayBeerInfo(res)})
}

//------------add event listeners ------------

ul.addEventListener('click', clickHandler)

//----------Logic/Dom manipulation Functions----------

  function displayBeers(event) {
    event.forEach(beer => {
      ul.innerHTML += `
        <li class="list-group-item" data-beer-id=${beer.id}>${beer.name}</li>
      `
    });
  }

  function displayBeerInfo(beer) {
    let data =`
      <h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-beer-id=${beer.id}>
        Save New Description
      </button>
      `
    beerDetailDiv.innerHTML = data

    let button = document.querySelector('#edit-beer')

    button.addEventListener('click', clickHandler)
  }

  function clickHandler(event) {
    if(event.target.className === 'list-group-item'){
      fetchBeerInfo(event.target.dataset.beerId)
    } else if(event.target.className === 'btn btn-info') {
      patchBeerDesc(event.target.parentNode)
    }
    
  }







})