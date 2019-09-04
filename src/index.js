//Step 1- Display beer names
//When the page loads, I should see a list of all beer names
let beerList = document.querySelector('#list-group')
const beerDetailDiv = document.getElementById('beer-detail')
document.addEventListener('DOMContentLoaded',function() {
    fetch('http://localhost:3000/beers')
        .then(response => response.json())
        .then(beerData => beerData.forEach(beer => {

          beerList.innerHTML+= ` <ul class="list-group">
            <li class="list-group-item">${beer.name}</li>
            </ul>
            `
        }))

//Step 2 - Display a single beer
//When i click on a beer name, it should reveal more information

//in order to get a single beer when clicked, an event listener would have to be
//created on the div with each of the li's

beerList.addEventListener('click', function(){
    if (event.target.id === 'list-group') {
        
    }
    fetch('http://localhost:3000/beers/')
        .then(response => response.json())
        .then(displayOneBeer => displayOneBeer.forEach(beer_obj => {
    let beerDetail = document.querySelector('#beer-detail')  
    beerDetail.innerHTML+= `<h1>${beer_obj.name}</h1>
    <img src= "<${beer_obj.image_url}>"/>
    <h3>${beer_obj.tagline}</h3>
    <textarea>${beer_obj.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>`
        
    
        }
            ))

})





//setp 3 - Edit beer details
//create an event listener that when the save button is clicked, it saves it to the database and frontend

beerDetailDiv.addEventListener('click', function (event) {
    let saveButtonIsPressed = event.target.className === "btn btn-info"
  
  
    if (saveButtonIsPressed) {
      let id = event.target.parentElement.dataset.id
      let description = event.target.previousElementSibling
      let newDescription = parseInt(event.target.previousElementSibling.innerText)
      description.innerText = `${newDescription} `
  
      fetch('http://localhost:3000/beers/'  + event.target.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "description": newDescription
        })
  
      })
        .then(response => response.json())
        .then(console.log)
    }
  })

             
          })
          
       
        
