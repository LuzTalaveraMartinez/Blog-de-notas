<?php

include('bbdd.php');


if(isset($_POST['nombre'])){
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $consulta="INSERT into tareas(nombre, descripcion)  VALUES ('$nombre','$descripcion')";
    $resultado=mysqli_query($conexion, $consulta);

    if(!$resultado){
        die('La consulta ha fallado!');
    }
    echo 'Tarea agregada exitosamente';
}
