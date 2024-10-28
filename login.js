//Bcrypt
const bcrypt = require('bcrypt');
const connection = require('./conexion');
const saltRounds = 10;

const login = async (req, res) => {
    // A simple SELECT query
    const datos = req.query
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM `usuarios` WHERE `usuario` = ?", //bcrypt
            //"SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
            //[datos.usuario, md5(datos.clave)] con md5 es mas sencillo encriptar pero menos seguro
            [datos.usuario] //así se hace con Bcrypt
        );
        //console.log(md5(datos.clave));
        //if (results.length > 0) { con md5
        console.log(bcrypt.hashSync(datos.clave, saltRounds));
        if (results.length > 0 && bcrypt.compareSync(datos.clave, results[0].clave)) {
            req.session.usuario = datos.usuario
            res.status(200).send('Inicio de sesión correctamente')
        } else {
            res.status(401).send('Inicio de sesión incorrecto')
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor")
    }
}

module.exports = login;