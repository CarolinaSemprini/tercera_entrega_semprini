INICIALIZAR EL SISTEMA CON: npm start

El sistema funciona tanto en modo local como en deploy.

IMPORTANTE: LINK PARA VER EL VIDEO DE FUNCIONAMIENTO DEL SISTEMA!!!:https://www.youtube.com/watch?v=rOKUrwWla6g

REGISTRARSE con los siguientes datos para probar el sistema: email: coder.entregas@gmail.com contrseña: 123 / este usuario es premium y podra realizar diferentes pruebas.

PARA REALIZAR COMPRAS puede pobrar el sistema con el siguiente email: prueba@gmail.com contraseña: 123/ este usuario es user y podra realizar compras solamente.
Para ver los tickets de compra del usuario prueba@gmail.com, ir a "MIS COMPRAS".
Si usted no ha realizado compras, y hace clic en "mis compras", es probable que genere un error.

Para subir imagenes al perfil del usuario ir al icono de avatar, luego de subir el archivo, cerrar sesión y volver a ingresar para ver dichas imagenes en dicho lugar.

PARA ELIMINAR USUARIOS que no hayan tenido conexión en los últimos 2 días: realizar la acción a través de postman a través de la siguiente url:
http://localhost:8080/api/users/deleteInactiveUsers

PARA ENVIO DE EMAILS AL MOMENTO DE INGRESAR COMO USUARIO ADMIN /PREMIUM Y ELIMINAR UN PRODUCTO DE OTRO USUARIO PREMIUM:
Al momento de eliminar un producto que fue cargado por un usuario premium, se le envia un correo electronico aL dueño de dicho producto eliminado por otro usuario.

CAMBIO DE ROLES O ELIMINAR USUARIOS:
para realizar cambio de roles, ir a la opción usuarios, tener en cuenta que debe tener rol admin o premium. También desde allí puede eliminar a usuarios seleccionado. Debe ir haciendo clic en cambio de rol hasta llegar al rol deseado, del usuario seleccionado.

PARA USO DEL CHAT: debe ingresar con rol user.
