<?php


include('bbdd.php');

if (isset($_POST['id'])) {


    $id = $_POST['id'];

    $consulta = "DELETE FROM tareas WHERE id=$id";
    $resultado = mysqli_query($conexion, $consulta);

    if(!$resultado) {
        die('Consulta no realizada.');
    }
    echo "Tarea eliminada correctamente.";
}
