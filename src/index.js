//read example of patch
fetchBeerData()
//on load, i see list of beer names on left side
    //li will have class="list-group-item"


//Grab elements from the DOM---------
beerList = document.querySelector('#list-group')
beerDetail = document.querySelector('#beer-detail')

//Talk to server using fetch---------
function fetchBeerData(){
    fetch(`http://localhost:3000/beers`)
    .then(resp => resp.json())
    .then(data => placeBeers(data))
} 

//Add Event Listeners--------------
beerList.addEventListener('click',handleSingleClick)
//Logic/Dom manipulation-------------
//iterate over beers
    //create new li
    //place li inside of beerList
    //stuff li with beer data
function placeBeers(beers) {
    beers.forEach(beer => {
        beerList.innerHTML += `
        <li class = list-group-item data-beer-id=${beer.id} data-beer-tagline=${beer.tagline} 
        data-beer-description=${beer.description} 
        data-beer-image-url=${beer.image_url} class=list-group-item>${beer.name}</li>
        `
    })

}
//handle a click on a single beer(delegate event)
//I want to use event delegation to trigger showing a single beer.
//To do that, I need to make sure that what I click on is an li of a beer, and not the parent
function handleSingleClick(event){
    console.log(event)
    if (event.currentTarget.className === 'list-group-item') {
        let beerId = event.target.dataset.beerId
        let beerDesc =event.target.dataset.beerDescription
        let beerImg = target.dataset.beerImageUrl
        let beerTagline = target.dataset.beerTagline
        let beerName = target.innerText
        beerDetail.innerHTML =`
            <h1>${beerName}</h1>
            <img src="<${beerImg}>">
            <h3>${beerTagline}</h3>
            <textarea>${beerDesc}/textarea>
            <button id="edit-beer" class="btn btn-info">Save</button>`
    }
}