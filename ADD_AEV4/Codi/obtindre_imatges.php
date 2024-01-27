<?php
$servidor = "localhost";
$usuario = "root";
$password = "";
$dbname = "nekos";

$conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

if (!$conexion) {
    echo "Error en la conexión a MySQL: " . mysqli_connect_error();
    exit();
}

$taula = "imagenes";
$select = "SELECT * FROM $taula ORDER BY image_name";
$result = mysqli_query($conexion, $select);

$imagenes = array();

while ($row = mysqli_fetch_assoc($result)) {
    $imagenes[] = array(
        'image_url' => $row['image_url'],
        'image_name' => $row['image_name'],
        'artist_name' => $row['artist_name']
    );
}

echo json_encode($imagenes);

mysqli_close($conexion);
