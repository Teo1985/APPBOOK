const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const libros = [
 
];

app.get('/api/libros', (req, res) => {
  res.json(libros);
});

app.post('/api/libros', (req, res) => {
  const { titulo, autor, descripcion, imagenURL } = req.body;

 
  if (!titulo || !autor || !descripcion || !imagenURL) {
    return res.status(400).json({ error: 'Por favor, completa todos los campos.' });
  }

  const nuevoLibro = {
    id: libros.length + 1,
    titulo,
    autor,
    descripcion,
    imagenURL,
  };

  libros.push(nuevoLibro);

  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});
