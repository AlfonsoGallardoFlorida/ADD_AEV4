let currentImage = null;

// Funció asíncrona que obté imatges de la api crida a la funció 'mostrarImatge'
async function obtindreImatgeApi() {
    const categoryType = document.getElementById('categoriaNeko').value;

    const endpoint = `https://nekos.best/api/v2/${categoryType}`;

    try {
        const response = await axios.get(endpoint);
        currentImage = response.data.results[0];
        mostrarImatge(currentImage);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Funció que mostra la imatge en el seu respectiu 'div'
function mostrarImatge(imageData) {
    const resultatApiContainer = document.getElementById('resultatApiContainer');
    resultatApiContainer.innerHTML = "";
    resultatApiContainer.style.display = 'flex';
    resultatApiContainer.style.justifyContent = 'center';
    resultatApiContainer.style.alignItems = 'center';
    resultatApiContainer.style.flexDirection = 'column';
    resultatApiContainer.style.width = '100%';

    const imgElement = document.createElement('img');
    imgElement.src = imageData.url;
    imgElement.alt = imageData.image_name;
    imgElement.style.margin = '10px';
    imgElement.style.width = '300px';

    const divElement = document.createElement('div');
    divElement.style.display = 'flex';
    divElement.style.flexDirection = 'column';
    divElement.style.alignItems = 'center';
    divElement.style.margin = '10px';


    if (imageData.artist_name) {
        const artistNameElement = document.createElement('p');
        artistNameElement.textContent = `Artist: ${imageData.artist_name}`;
        artistNameElement.style.margin = '10px';
        divElement.appendChild(artistNameElement);
    }

    if (imageData.artist_href) {
        const artistHrefElement = document.createElement('p');
        artistHrefElement.textContent = `Artist Link: ${imageData.artist_href}`;
        artistHrefElement.style.margin = '10px';
        divElement.appendChild(artistHrefElement);
    }

    if (imageData.source_url) {
        const sourceUrlElement = document.createElement('p');
        sourceUrlElement.textContent = `Source URL: ${imageData.source_url}`;
        sourceUrlElement.style.margin = '10px';
        divElement.appendChild(sourceUrlElement);
    }
    divElement.appendChild(imgElement);

    resultatApiContainer.appendChild(divElement);
}


// Funció Ajax que inserta (guarda) la informació de la imatge en la base de dades
function guardarInfo() {
    if (currentImage === null) {
        alert('No ni ha ninguna imatge per a guardar.');
        return;
    }
    const image_name = document.getElementById('image_name').value;

    const data = {
        artist_href: currentImage.artist_href,
        artist_name: currentImage.artist_name,
        source_url: currentImage.source_url,
        image_name: image_name,
        image_url: currentImage.url,
        categoria: document.getElementById('categoriaNeko').value
    };

    $.ajax({
        type: "POST",
        url: "insertar_registres.php",
        data: data,
        success: function (response) {
            alert(response);
        },
        error: function (error) {
            alert('Error al guardar la informació.');
        }
    });
}
// Funció que permeteix al usuari buscar un imatge en la base de dades per el seu nom
function buscarPerNom() {
    const imageName = document.getElementById('buscarImageName').value;

    if (!imageName) {
        alert("Per favor, ingresa un nom d'imatge.");
        return;
    }

    const data = {
        image_name: imageName,
        categoria: document.getElementById('categoriaNeko').value
    };

    $.ajax({
        type: "POST",
        url: "BuscarPerNom.php",
        data: data,
        success: function (response) {
            document.getElementById('resultatBdContainer').innerHTML = response;
        },
        error: function (error) {
            alert('Error al buscar per nom.');
        }
    });

}

// Funció per obtenir totes les imatges des de la base de dades mitjançant una sol·licitud GET
function mostrarTotesLesImatges() {
    $.ajax({
        type: "GET",
        url: "obtindre_imatges.php",
        success: function (response) {
            mostrarImatges(response);
        },
        error: function (error) {
            alert('Error en obtenir les imatges.');
        }
    });
}

// Funció per mostrar les imatges en el contenidor especificat amb la resposta obtinguda
function mostrarImatges(response) {
    const contenidorImatges = document.getElementById('contenidorImatges');
    contenidorImatges.innerHTML = "";
    contenidorImatges.style.display = 'flex';
    contenidorImatges.style.flexWrap = 'wrap';
    contenidorImatges.style.justifyContent = 'center';
    contenidorImatges.style.flexDirection = 'column';
    contenidorImatges.style.width = '100%';

    const imagenes = JSON.parse(response);

    for (const imagen of imagenes) {
        const imgElement = document.createElement('img');
        imgElement.src = imagen.image_url;
        imgElement.alt = imagen.image_name;
        imgElement.style.margin = '10px';
        imgElement.style.width = '300px';

        const artistNameElement = document.createElement('p');
        const imageNameElement = document.createElement('p');

        artistNameElement.textContent = `Artista: ${imagen.artist_name}`;
        imageNameElement.textContent = `Nom: ${imagen.image_name}`;

        artistNameElement.style.margin = '10px';

        const divElement = document.createElement('div');
        divElement.style.display = 'flex';
        divElement.style.flexDirection = 'column';
        divElement.style.alignItems = 'center';
        divElement.style.margin = '10px';

        divElement.appendChild(imgElement);
        divElement.appendChild(imageNameElement);
        divElement.appendChild(artistNameElement);

        contenidorImatges.appendChild(divElement);
    }
}

// Funció per mostrar tots els GIFs mitjançant una sol·licitud GET
function mostrarTotsElsGifs() {
    $.ajax({
        type: "GET",
        url: "obtindre_gifs.php",
        success: function (response) {
            mostrarGifs(response);
        },
        error: function (error) {
            alert('Error al obtenir els GIFs.');
        }
    });
}

// Funció per mostrar els GIFs en el contenidorGifs amb la resposta obtinguda
function mostrarGifs(gifs) {
    const contenidorGifs = document.getElementById('contenidorGifs');
    contenidorGifs.innerHTML = "";
    contenidorGifs.style.display = 'flex';
    contenidorGifs.style.flexDirection = 'column';
    contenidorGifs.style.alignItems = 'center';

    const gifsArray = JSON.parse(gifs);

    for (const gif of gifsArray) {
        const imgElement = document.createElement('img');
        imgElement.src = gif.image_url;
        imgElement.alt = gif.image_name;
        imgElement.style.margin = '10px';
        imgElement.style.width = '300px';

        const gifNameElement = document.createElement('p');
        gifNameElement.textContent = `Nom: ${gif.image_name}`;
        gifNameElement.style.margin = '10px';

        const divElement = document.createElement('div');
        divElement.style.display = 'flex';
        divElement.style.flexDirection = 'column';
        divElement.style.alignItems = 'center';
        divElement.style.width = '100%';

        divElement.appendChild(imgElement);
        divElement.appendChild(gifNameElement);

        contenidorGifs.appendChild(divElement);
    }
}

// Oculta totes les imatges
function ocultarImatges() {
    const contenidorImatges = document.getElementById('contenidorImatges');
    contenidorImatges.style.display = 'none';
}

// Oculta tots els gifs
function ocultarGifs() {
    const contenidorGifs = document.getElementById('contenidorGifs');
    contenidorGifs.style.display = 'none';
}

// Oculta la imatge de la api
function ocultarImatgeAPI() {
    const resultatApiContainer = document.getElementById('resultatApiContainer');
    resultatApiContainer.style.display = "none";
}

// Mostra la imatge de la api
function mostrarImatgeAPI() {
    const resultatApiContainer = document.getElementById('resultatApiContainer');

    if (currentImage) {
        resultatApiContainer.style.display = "flex";
    } else {
        alert('No ni ha ningun registre carregat desde la API.');
    }
}

// Oculta la imatge de la BD
function ocultarImatgeBD() {
    const contenidorImatges = document.getElementById('resultatBdContainer');
    if (contenidorImatges.innerHTML !== "") {
        contenidorImatges.style.display = "none";
    }
}

// Oculta la imatge de la BD
function mostrarImatgeBD() {
    const contenidorImatges = document.getElementById('resultatBdContainer');
    if (contenidorImatges.innerHTML !== "") {
        contenidorImatges.style.display = "block";
    } else {
        alert('No ni ha ningun registre carregat desde la base de dades.');
    }
}
