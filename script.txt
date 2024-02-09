document.addEventListener('DOMContentLoaded', () => {
  const librosLista = document.getElementById('libros-lista');
  const formularioLibro = document.getElementById('formulario-libro');

  formularioLibro.addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenURL = document.getElementById('imagenURL').value;


    if (titulo.trim() === '' || autor.trim() === '' || descripcion.trim() === '' || imagenURL.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

 
    fetch('http://localhost:3000/api/libros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, autor, descripcion, imagenURL }),
    })
      .then(response => response.json())
      .then(libros => {
    
        librosLista.innerHTML = '';

    
        libros.forEach(libro => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p>Autor: ${libro.autor}</p>
            <p>${libro.descripcion}</p>
            <img src="${libro.imagenURL}" alt="${libro.titulo}">
          `;
          librosLista.appendChild(li);
        });

  
        formularioLibro.reset();
      })
      .catch(error => console.error('Error al agregar libro:', error));
  });


  function cargarListaLibros() {
    fetch('http://localhost:3000/api/libros')
      .then(response => response.json())
      .then(libros => {
        libros.forEach(libro => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p>Autor: ${libro.autor}</p>
            <p>${libro.descripcion}</p>
            <img src="${libro.imagenURL}" alt="${libro.titulo}">
          `;
          librosLista.appendChild(li);
        });
      })
      .catch(error => console.error('Error al obtener libros:', error));
  }

  
  cargarListaLibros();
});
