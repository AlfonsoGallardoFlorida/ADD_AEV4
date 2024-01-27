<?php
if (isset($_POST["image_url"])) {
    $categoria = $_POST["categoria"];

    // Comprovem si la categoria és vàlida per a les dades adicionals
    if ($categoria === "husbando" || $categoria === "waifu" || $categoria === "kitsune" || $categoria === "neko") {
        $artist_href = $_POST["artist_href"];
        $artist_name = $_POST["artist_name"];
        $source_url = $_POST["source_url"];
    }

    $image_url = $_POST["image_url"];
    $nom_imatge = $_POST["image_name"];
    if (empty($nom_imatge)) {
        echo "Error: Deus asignar un nom a la imatge abans de guardarla en la base de dades.";
        exit();
    }

    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $dbname = "nekos";

    // Connectem amb la base de dades MySQL
    $conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

    // Comprovem si la connexió és exitosa
    if (!$conexion) {
        echo "Error en la connexió a MySQL: " . mysqli_connect_error();
        exit();
    }

    $taula = "";
    $comprovarDuplicats = "";

    // Determinem la taula i la consulta segons la categoria
    if ($categoria === "husbando" || $categoria === "waifu" || $categoria === "kitsune" || $categoria === "neko") {
        $taula = "imagenes";
        $comprovarDuplicats = "SELECT * FROM $taula WHERE image_name = '$nom_imatge'";
    } else {
        $taula = "gifs";
        $comprovarDuplicats = "SELECT * FROM $taula WHERE image_name = '$nom_imatge'";
    }

    // Executem la consulta per comprovar duplicats
    $registreDuplicat = mysqli_query($conexion, $comprovarDuplicats);

    // Comprovem si ja existeix un registre amb el mateix nom
    if (mysqli_num_rows($registreDuplicat) > 0) {
        echo "Ja existeix un registre amb el nom: $nom_imatge";
    } else {
        // Preparem la consulta d'inserció segons la categoria
        if ($categoria === "husbando" || $categoria === "waifu" || $categoria === "kitsune" || $categoria === "neko") {
            $insert = "INSERT INTO $taula (artist_href, artist_name, source_url, image_name, image_url) VALUES ('$artist_href','$artist_name','$source_url','$nom_imatge', '$image_url')";
        } else {
            $insert = "INSERT INTO $taula (image_name, image_url) VALUES ('$nom_imatge', '$image_url')";
        }

        // Executem la consulta d'inserció
        if (mysqli_query($conexion, $insert)) {
            echo "Registre insertat correctament en la taula $taula.";
        } else {
            echo "Error al insertar el registre en la taula $taula: " . mysqli_error($conexion);
        }
    }

    // Tanquem la connexió amb la base de dades
    mysqli_close($conexion);
} else {
    echo "Error, no entra en el if.";
}
