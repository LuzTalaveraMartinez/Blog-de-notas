$(document).ready(function() {

    let edit = false;

    console.log('Hola Mundo con Jquery');

    $('#resultado-tarea').hide();

    buscarTareas();

    $('#search').keyup(function(e) {

        if ($('#search').val()) {
            let search = $('#search').val('');
            $.ajax({
                url: 'buscar-tarea.php',
                type: 'POST',
                data: { search },
                success: function(response) {
                    let tareas = JSON.parse(response);
                    let template = '';

                    tareas.forEach(tarea => {
                        template += `<li>
                        ${tarea.nombre}
                        </li>`
                    });

                    $('#container').html(template);
                    $('#resultado-tarea').show();
                }
            })
        }

    });

    $('#tarea-formulario').submit(function(e) {
        const postdato = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            id: $('#tareaId').val()
        };

        let url = edit === false ? 'guardar-tarea.php' : 'editar-tarea.php';

        console.log(url);

        $.post(url, postdato, function(response) {
            console.log(response);
            buscarTareas();

            $('#tarea-formulario').trigger('reset'); // PARA RESETEAR EL CONTENIDO DEL FORMULARIO YA CARGADO
        });
        e.preventDefault();
    });


    function buscarTareas() {
        $.ajax({
            url: 'lista-de-tareas.php',
            type: 'GET',
            success: function(response) {
                let tareas = JSON.parse(response);
                let template = '';
                tareas.forEach(tarea => {
                    template += `
                        <tr tareaId="${tarea.id}">
                            <td>${tarea.id}</td>
                            <td>
                                <a href="#" class="item-tarea">${tarea.nombre}</a>
                            </td>
                            <td>${tarea.descripcion}</td>
                            <td>
                            <button class="eliminar-tarea btn btn-danger">
                            Eliminar
                            </button>
                            </td>
                        </tr>
                        `
                });
                $('#tareas').html(template);
            }
        });
    }


    $(document).on('click', '.eliminar-tarea', function() {
        if (confirm('Usted esta seguro que quiere borrar los datos?')) {
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('tareaId');
            $.post('eliminar-tareas.php', { id }, function(response) {
                buscarTareas();
            })
        }
    });

    $(document).on('click', '.item-tarea', function() {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('tareaId');
        $.post('unica-tarea.php', { id }, function(response) {
            const tarea = JSON.parse(response);
            $('#nombre').val(tarea.nombre);
            $('#descripcion').val(tarea.descripcion);
            $('#tareaId').val(tarea.id);
            edit = true;
        })
    });
});