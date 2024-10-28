//Servidor express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//Middleware es cors npm
const cors = require('cors')
//express-session
const session = require('express-session')
// md5 seguridad
const md5 = require('md5');
//modulos
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuarios, eliminarUsuarios } = require('./usuarios');
const validar = require('./validar')
const cerrarSesion = require('./salir')

//crear conexión de cors
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5173',
  credentials: true, //credenciales a diferentes servidores
}))

//Express-session
app.use(session({
  secret: process.env.SECRETSESSION || 'asasdfasdfasdfasdafsasdfasdfasfg',
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    secure:process.env.NODE_ENV === 'production',
    sameSite:'none'}
}))

//Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login', login)

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuarios)

app.get('/validar', validar)

app.delete('/usuarios', eliminarUsuarios)

app.get('/salir', cerrarSesion)

app.listen(port, () => {
  console.log(`App esta escuchando por el puerto ${port}`)
})