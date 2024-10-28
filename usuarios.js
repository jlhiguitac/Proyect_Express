const connection = require("./coneccion");

const obtenerUsuarios = async (req, res) => {//vamos a req un json de los usuarios
    if (!req.session.usuario) {
        res.status(401).send('usuario no registrado')
        return // Si ingresa a esta condicion con el return no ejecuta el resto de codigo de abajo
    }
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM `usuarios`",
        );
        res.status(200).json(results)

    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor")
    }
}

const eliminarUsuarios = async (req, res) => {//ruta para eliminar
    if (!req.session.usuario) {
        res.status(401).send('usuario no registrado')
        return // Si ingresa a esta condicion con el return no ejecuta el resto de codigo de abajo
    }
    const datos = req.query

    try {
        const [results, fields] = await connection.query(
            "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
            [datos.id]
        );
        if (results.affectedRows > 0) {
            res.status(200).send('Usuario Eliminado')
        } else {
            res.status(401).send('No se pudo eliminar')
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor")
    }
}

module.exports = {obtenerUsuarios, eliminarUsuarios};