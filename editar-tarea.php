<?php

include('bbdd.php');

$id= $_POST['id'];
$nombre= $_POST['nombre'];
$descripcion= $_POST['descripcion'];


$consulta="UPDATE tareas SET nombre='$nombre', descripcion='$descripcion' WHERE id='$id'";
$resultado=mysqli_query($conexion, $consulta);

if(!$resultado) {
    die('Consulta fallida.');
}

echo "Actualización completada correctamente";
?>