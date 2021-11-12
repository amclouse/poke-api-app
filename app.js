let input = document.getElementById('fromDate');
let to = document.getElementById('toDate');
let species_container = document.getElementById('species_container');
let fetchbutton = document.querySelector('button');
let section = document.querySelector('section');
let loopIndex = 0;
let url;
let blueUrl = 'https://www.pokemondungeon.com/images/igallery/resized/5001-5100/eu_pokemon_blue_version_game_boy_front_cover-5073-800-600-100.jpg';
let redUrl = 'https://www.pokemondungeon.com/images/igallery/resized/5601-5700/esp_pokemon_red_version_game_boy_front_cover-5622-800-600-100.jpg';
let yellowUrl = 'https://www.pokemondungeon.com/images/igallery/resized/5101-5200/fr_pokemon_yellow_version_special_pikachu_edition_game_boy_front_cover-5104-800-600-100.jpg';

fetchbutton.addEventListener('click', (e) => {
    // e.preventDefault();
    //Fetch generation data
    url = `https://pokeapi.co/api/v2/generation/${input.value}/`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //Run display function
        displayFunction(data);
    })
    .catch(err => console.log(err));
});

//Displays all data
function displayFunction(json) {
    console.log(json);
    console.log(species_container);
    //Prevents elements stacking when refetching data
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }

    
    //Versions array. Displays all game versions for generation
    json.version_groups.map(version => {
        let versionElement = document.createElement('h3');

        //Testing images
        if(version.name === 'yellow') {
            let red = document.createElement('img');
            let blue = document.createElement('img');
            let yellow = document.createElement('img')

            blue.style.width = '200px';
            red.style.width = '200px';
            yellow.style.width = '200px';
            
            blue.src = blueUrl;
            red.src = redUrl;
            yellow.src = yellowUrl;
            
            section.appendChild(blue);
            section.appendChild(red);
            section.appendChild(yellow);
        } else if(version.name === 'yellow') {
            console.log('false');
        } else {
            return
        }

        // versionElement.textContent = version.name;
        section.appendChild(versionElement);
        console.log(version);
    });
    
    //External link to Bulbapedia info page for the region
    let link = document.createElement('a');
    link.textContent = json.main_region.name;
    link.href = 'https://bulbapedia.bulbagarden.net/wiki/' + link.textContent;
    section.appendChild(link);
    
    //Display more or less
    let displayMore = document.createElement('button');
    displayMore.textContent = 'show generation species';
    //Unhide generation pokemon species
    displayMore.addEventListener('click', () => {
        if(species_container.style.display === 'none') {
            species_container.style.display = 'block';
            displayMore.textContent = 'hide';
        } else {
            species_container.style.display = 'none';
            displayMore.textContent = 'show';
        }
    });

    //Species array map 
    json.pokemon_species.map(species => {
        
        let speciesList = document.createElement('ul');
        let speciesItem = document.createElement('a'); 
        
        speciesItem.href = 'https://bulbapedia.bulbagarden.net/wiki/' + species.name + '_(Pokemon)';
        speciesItem.textContent = species.name;
        speciesList.appendChild(speciesItem);
        species_container.appendChild(speciesList);
    });
    // //append elements
    section.appendChild(displayMore);
}