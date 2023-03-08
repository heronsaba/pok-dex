const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector('.pokemon__image');
const nameStats = document.querySelector(".nameStats");
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const pokemonTypes = document.querySelector('.types');
const music = document.querySelector('.music-btn');
const e404 = document.querySelector('.e404');
const terrain = document.querySelector(".terrain");

const hp = document.querySelector(".hp");
const atk = document.querySelector(".atk");
const def = document.querySelector(".def");
const spd = document.querySelector(".spd");
const spa = document.querySelector(".spa");

let isPlaying = false;
let searchPoke = 1;

const getData = async function (pokemon) {
    e404.style.display = 'none';
    nameStats.innerHTML = 'Loading...'
    pokemonTypes.innerHTML = 'Loading..';
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        console.log(data);
        pokemonTypes.innerHTML = '';
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPoke = data.id;
        hp.innerHTML = data.stats['0'].base_stat;
        hp.style.width = `${(data.stats['0'].base_stat * 80) / 230}%`;

        atk.innerHTML = data.stats['1'].base_stat;
        atk.style.width = `${(data.stats['1'].base_stat * 80) / 230}%`;

        def.innerHTML = data.stats['2'].base_stat;
        def.style.width = `${(data.stats['2'].base_stat * 80) / 230}%`;

        spa.innerHTML = data.stats['3'].base_stat;
        spa.style.width = `${(data.stats['3'].base_stat * 80) / 230}%`;

        spd.innerHTML = data.stats['4'].base_stat;
        spd.style.width = `${(data.stats['4'].base_stat * 80) / 230}%`;

        nameStats.innerHTML = data.name;

        //console.log(data.types['0']['type'].name);
        let types = [];
        for (i = 0; i < data.types.length; i++) {
            types.push(data.types[`${i}`]['type'].name);
            switch (data.types[`${0}`]['type'].name) {
                case "grass":
                    terrain.src = "./images/grass.png"
                    break;
                case "rock":
                    terrain.src = "./images/cave.png"
                    break;
                case "ghost":
                    terrain.src = "./images/ghost.png"
                    break;
                case "ice":
                    terrain.src = "./images/ice.png"
                    break;
                case "water":
                    terrain.src = "./images/water.png";
                    break;
                case "fire":
                    terrain.src = "./images/mountain.png"
                    break;
                default:
                    terrain.src = "./images/grass.png"
                    break;
            }
        }
        for (type of types) {
            pokemonTypes.innerHTML += `<p class="type ${type}">${type}</p>`
        }
    } catch {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        nameStats.innerHTML = ''
        pokemonTypes.innerHTML = '';
        e404.style.display = 'block';
        searchPoke = 0;

        hp.innerHTML = ' &nbsp;';
        hp.style.width = `50%`;

        atk.innerHTML = '&nbsp;';
        atk.style.width = `50%`;

        def.innerHTML = '&nbsp;';
        def.style.width = `50%`;

        spa.innerHTML = '&nbsp;';
        spa.style.width = `50%`;

        spd.innerHTML = '&nbsp;';
        spd.style.width = `50%`;
    }


}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    getData(input.value.toLowerCase());
    console.log(searchPoke);
})

btnNext.addEventListener("click", () => {
    if(searchPoke === 151){
        alert("End of the First Generation")
    }
    searchPoke++;
    getData(searchPoke);

});

btnPrev.addEventListener("click", () => {
    if (searchPoke <= 1) {
        searchPoke = 1;
        getData(searchPoke);
    }
    else {
        searchPoke--;
        getData(searchPoke);
    }
})

music.addEventListener("click", () => {
    let audio = document.querySelector(".ost");
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        music.classList.add("playing");
    }
    else {
        audio.currentTime = 0;
        audio.pause();
        isPlaying = false;
        music.classList.remove("playing");
    }


});

window.addEventListener("DOMContentLoaded", getData(searchPoke));
