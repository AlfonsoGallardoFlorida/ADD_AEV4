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

$taula = "gifs";
$select = "SELECT * FROM $taula";
$result = mysqli_query($conexion, $select);

$gifs = array();

while ($row = mysqli_fetch_assoc($result)) {
    $gifs[] = $row;
}

echo json_encode($gifs);

mysqli_close($conexion);
