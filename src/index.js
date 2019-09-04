let beersList = [];
const beerUl = document.getElementById("list-group");
const beerDetailDiv = document.getElementById('beer-detail');

// Function for creating the individual beer <li>'s
function renderBeerLi(beerObject) {
    const beerLi = document.createElement('li');
    
    beerLi.className = "list-group-item";
    beerLi.dataset.beerId = beerObject.id;
    beerLi.textContent = beerObject.name;

    beerUl.appendChild(beerLi);
}

// Function for rendering specific beer details
function renderBeerDetails(beerObject) {
    const beerNameH1 = document.createElement('h1');
    beerNameH1.id = "beer-name";
    beerNameH1.textContent = beerObject.name;

    const beerImage = document.createElement('img');
    beerImage.id = "beer-image";
    beerImage.src = beerObject.image_url;

    const beerTagLineH3 = document.createElement('h3');
    beerTagLineH3.id = "beer-tagline";
    beerTagLineH3.textContent = beerObject.tagline;

    const beerDescriptionP = document.createElement('p');
    beerDescriptionP.id = "beer-description";
    beerDescriptionP.textContent = beerObject.description;

    const beerFoodPairingsH4 = document.createElement('h4');
    beerFoodPairingsH4.textContent = 'Food Pairings';

    const beerFoodPairingsOl = document.createElement('ol');
    beerFoodPairingsOl.id = "food-pairings-list";

    beerObject.food_pairing.forEach(pairing => {
        const pairingLi = document.createElement('li');
        pairingLi.textContent = pairing;
        beerFoodPairingsOl.appendChild(pairingLi);
    });

    const beerEditButton = document.createElement('button');
    beerEditButton.id = "edit-beer";
    beerEditButton.className = "btn btn-info";
    beerEditButton.textContent = "Edit";
    beerEditButton.dataset.beerId = beerObject.id;

    beerDetailDiv.appendChild(beerNameH1);
    beerDetailDiv.appendChild(beerImage);
    beerDetailDiv.appendChild(beerTagLineH3);
    beerDetailDiv.appendChild(beerFoodPairingsH4);
    beerDetailDiv.appendChild(beerFoodPairingsOl);
    beerDetailDiv.appendChild(beerDescriptionP);
    beerDetailDiv.appendChild(beerEditButton);
}

document.addEventListener('DOMContentLoaded', function(event) {
    
    // Displays a list of all beers in the database
    fetch('http://localhost:3000/beers')
        .then(response => response.json())
        .then(function(beersListArray) {
            beersList = beersListArray;
            
            beersListArray.forEach(beer => {
                renderBeerLi(beer)
            });
        })

    // Displays the details of a beer when the beer is clicked from the list
    beerUl.addEventListener('click', function(event) {
        if (event.target.tagName === "LI" && event.target.className === "list-group-item") {
            
            while (beerDetailDiv.children.length > 0) {
                beerDetailDiv.removeChild(beerDetailDiv.lastChild);
            }

            fetch(`http://localhost:3000/beers/${event.target.dataset.beerId}`)
                .then(response => response.json())
                .then(beerObject => {
                    renderBeerDetails(beerObject);
                })
        }
        
    })

    // Event Listeners related to editing the details of a specific beer
    beerDetailDiv.addEventListener('click', function(event) {
        
        // Opens the Edit Form
        if (event.target.tagName === "BUTTON" && event.target.id === "edit-beer" ) {
            
            const beerDescriptionP = document.getElementById('beer-description');
            const beerEditButton = document.getElementById('edit-beer');

            const beerDescriptionTextArea = document.createElement('textarea');
            beerDescriptionTextArea.textContent = beerDescriptionP.textContent;

            const beerSaveButton = document.createElement('button');
            beerSaveButton.id = "save-beer";
            beerSaveButton.className = "btn btn-info";
            beerSaveButton.textContent = "Save";
            beerSaveButton.dataset.beerId = beerEditButton.dataset.beerId;

            beerDetailDiv.removeChild(beerDescriptionP);
            beerDetailDiv.removeChild(beerEditButton);

            beerDetailDiv.appendChild(beerDescriptionTextArea);
            beerDetailDiv.appendChild(beerSaveButton);
            
        // Updates the beer details in the database & re-renders the Beer Details in the DOM based on the response from the api
        } else if (event.target.tagName === "BUTTON" && event.target.id === "save-beer" ) {

            fetch(`http://localhost:3000/beers/${event.target.dataset.beerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                body: JSON.stringify({
                    description: event.target.parentNode.children[3].value
                })
            }).then(response => response.json())
            .then(beerObject => {
                
                while (beerDetailDiv.children.length > 0) {
                    beerDetailDiv.removeChild(beerDetailDiv.lastChild);
                };

                renderBeerDetails(beerObject);
            })
        }
    })
})