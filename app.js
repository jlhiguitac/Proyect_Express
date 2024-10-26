//Servidor express
const express = require('express')
const app = express()
const port = 3000

// base de datos mysql2
const mysql = require('mysql2/promise');

//Middleware es cors npm
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, //credenciales a diferentes servidores
})) //crear conección de cors

//express-session
const session = require('express-session')
 
app.use(session({
  secret: 'asasdfasdfasdfasdafsasdfasdfasfg'
}))

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', async (req, res) => {
    // A simple SELECT query
  const datos = req.query  
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?", 
      [datos.usuario, datos.clave]
    );
    if (results.length > 0) {
      req.session.usuario = datos.usuario
      res.status(200).send('Inicio de sesión correctamente')
    } else{
      res.status(401).send('Inicio de sesión incorrecto')
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
})

app.get('/validar', (req, res) => {
  if (req.session.usuario) {
    res.status(200).send('Sesión valida')
  }else{
    res.status(401).send('No autorizado')
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})