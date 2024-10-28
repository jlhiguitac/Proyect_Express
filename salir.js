const cerrarSesion = (req, res) => {
    req.session.usuario.destroy(function (err) {
        if (err) {
            res.status(401).send('Sesior no cerrada')
        }
    })

}

module.exports = cerrarSesion;