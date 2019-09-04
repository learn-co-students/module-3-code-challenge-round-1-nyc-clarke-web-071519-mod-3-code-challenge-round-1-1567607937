// document.addEventListener('DOMContentLoaded', (event) => {
    
allBeerFecth()
// identify datatypes 

    const ul = document.querySelector("#list-group")
    const div = document.querySelector('#beer-detail')

//event listeners 

div.addEventListener('click', submitChanges)

//fetch 

function allBeerFecth(){
    fetch(`http://localhost:3000/beers`)
        .then(resp => resp.json())
        .then(showAllBeer)
}

function fetchBeer(){
   let beerId = Number(event.target.id)
    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(showOneBeer)
}

//logic 

function showAllBeer(beerArray){
    beerArray.forEach(beer => {
        let li = document.createElement('li')
        li.className = "list-group-item"
        li.id = beer.id
        li.innerText = beer.name
        ul.appendChild(li)
        li.addEventListener('click', fetchBeer)
    })
}


function showOneBeer(beer){
    div.innerHTML = `
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea class="description">${beer.description}</textarea>
        <button id=${beer.id} class="btn btn-info">
        Save
        </button>
    `
}

// I put this fetch down here even though my other ones are up there because it makes more sence to me this way.

function submitChanges(){
    if (event.target.tagName === "BUTTON"){
        let beerId = Number(event.target.id)
        fetch(`http://localhost:3000/beers/${beerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: document.querySelector('.description').value
            })
        })
        .then(resp => resp.json())
        .then(showOneBeer)
    }
}


// });