<?php


include('bbdd.php');

$consulta= "SELECT * FROM tareas";
$resultado=mysqli_query($conexion, $consulta);

if(!$resultado){
    die('Error en la consulta'. mysqli_error($conexion));
}

$json=array();

while($fila=mysqli_fetch_array($resultado)){
    
    $json[]=array(
        'nombre' => $fila['nombre'],
        'descripcion' => $fila['descripcion'],
        'id' => $fila['id']
    );
}

$jsonstring= json_encode($json);
echo $jsonstring;

?>