<?php

if (isset($_POST["image_name"])) {
    $image_name = $_POST["image_name"];

    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $dbname = "nekos";

    $conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

    if (!$conexion) {
        echo "Error en la conexión a MySQL: " . mysqli_connect_error();
        exit();
    }

    $selectImatges = "SELECT * FROM imagenes WHERE image_name = '$image_name'";
    $resultImatges = mysqli_query($conexion, $selectImatges);

    $selectGifs = "SELECT * FROM gifs WHERE image_name = '$image_name'";
    $resultGifs = mysqli_query($conexion, $selectGifs);

    $response = "";

    if (mysqli_num_rows($resultImatges) > 0) {
        $row = mysqli_fetch_assoc($resultImatges);
        $response .= "<div style='text-align: center;'>";
        $response .= "<p>Informació de la imatge:</p>";
        $response .= "<p>Nom: " . $row['image_name'] . "</p>";
        $response .= "<p>Artista: " . $row['artist_name'] . "</p>";
        $response .= "<p>Enllaç del artista: " . $row['artist_href'] . "</p>";
        $response .= "<p>URL de la font: " . $row['source_url'] . "</p>";
        $response .= "<img src='" . $row['image_url'] . "' alt='Imagen' style='max-width: 500px; margin: auto;' />";
        $response .= "</div>";
    }
    if (mysqli_num_rows($resultGifs) > 0) {
        $row = mysqli_fetch_assoc($resultGifs);
        $response .= "<div style='text-align: center;'>";
        $response .= "<p>Informació del GIF:</p>";
        $response .= "<p>Nom: " . $row['image_name'] . "</p>";
        $response .= "<img src='" . $row['image_url'] . "' alt='Imagen' style='max-width: 500px; margin: auto;' />";
        $response .= "</div>";
    }
    echo $response;
    mysqli_close($conexion);
} else {
    echo "Error, no s'ha proporcionat un nom d'imatge.";
}
