const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./assets/images/pokeball.png")
            document.getElementById("pokeEvo1").src = "./img/pokeball.png";
            document.getElementById("pokeEvo3").src = "./img/pokeball.png";
            document.getElementById("pokeEvo2").src = "./img/pokeball.png";
            document.getElementById("hp").innerHTML = "0";
            document.getElementById("atk").innerHTML = "0";
            document.getElementById("def").innerHTML = "0";
            document.getElementById("atke").innerHTML = "0";
            document.getElementById("defe").innerHTML = "0";
            document.getElementById("speed").innerHTML = "0";
            document.getElementById("type1").innerHTML = "";
            document.getElementById("type2").innerHTML = "";
            alert("Escribiste mal el nombre del pokemon o no existe.");
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let pokeurl = data.species.url
            let stats = data.stats
            let type = data.types
            pokeImage(pokeImg);
            pokeStats(stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat);
            pokeType(type);
            console.log(pokeurl);
            fetchPokemon2(pokeurl);
            PokeMoves(data);
        }
    });
}

const fetchPokemon2 = (url) => {
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeball.png")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeurl = data.evolution_chain.url;
            console.log(data);
            fetchPokemonEvo(pokeurl);
        }
    });
}

const fetchPokemonEvoImg = (poke) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
    console.log(url)
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeball.png")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            const pokeEvo1 = document.getElementById("pokeEvo1");
            pokeEvo1.src = pokeImg;
        }
    });
}


const fetchPokemonEvoImg2 = (poke) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeball.png")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            const pokeEvo2 = document.getElementById("pokeEvo2");
            pokeEvo2.src = pokeImg;

        }
    });
}

const fetchPokemonEvoImg3 = (poke) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeball.png")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            const pokeEvo3 = document.getElementById("pokeEvo3");
            pokeEvo3.src = pokeImg;
        }
    });
}

const fetchPokemonEvo = (url) => {
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeball.png")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            if (data.chain.evolves_to.length > 0) {
                fetchPokemonEvoImg(data.chain.species.name)
                fetchPokemonEvoImg2(data.chain.evolves_to[0].species.name);
                document.getElementById("pokeEvo3").src = "./img/pokeball.png";
                if (data.chain.evolves_to[0].evolves_to.length > 0) {
                    fetchPokemonEvoImg3(data.chain.evolves_to[0].evolves_to[0].species.name)
                } else {

                }
            } else {
                fetchPokemonEvoImg(data.chain.species.name);
                document.getElementById("pokeEvo3").src = "./img/pokeball.png";
                document.getElementById("pokeEvo2").src = "./img/pokeball.png";
            }

        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeStats = (hp, atk, def, atke, defe, speed) => {
    const pokehp = document.getElementById("hp");
    const pokeatk = document.getElementById("atk");
    const pokedef = document.getElementById("def");
    const pokeatke = document.getElementById("atke");
    const pokedefe = document.getElementById("defe");
    const pokespeed = document.getElementById("speed");

    pokehp.innerHTML = hp
    pokeatk.innerHTML = atk
    pokedef.innerHTML = def
    pokeatke.innerHTML = atke
    pokedefe.innerHTML = defe
    pokespeed.innerHTML = speed
}

const pokeType = (type) => {
    const poket1 = document.getElementById("type1");
    const poket2 = document.getElementById("type2");

    if (type.length >= 2) {
        poket1.innerHTML = type[0].type.name
        poket2.innerHTML = type[1].type.name
    } else {
        poket1.innerHTML = type[0].type.name
        poket2.innerHTML = ''
    }
}

const PokeMoves = (data) => {
    let moves = data.moves;
    const pokemoves = document.getElementById("moves");
    pokemoves.innerHTML = "";

    for (let i = 0; i < moves.length; i++) {
        const move = document.createElement("li");
        pokemoves.appendChild(move);

        move.innerText = moves[i].move.name;
    }
}