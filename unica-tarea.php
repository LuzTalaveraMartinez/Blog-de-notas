<?php


include('bbdd.php');

$id=$_POST['id'];

$consulta="SELECT * FROM tareas WHERE id=$id";
$resultado=mysqli_query($conexion,$consulta);

if(!$resultado) {
    die('Error en la consulta.');
}

$json=array();

    while($fila=mysqli_fetch_array($resultado)){

        $json[]=array(
            'nombre' => $fila['nombre'],
            'descripcion' => $fila['descripcion'],
            'id' => $fila['id']
        );

    }

    $jsonstring= json_encode($json[0]);
    echo $jsonstring;


?>