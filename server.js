const express = require('express');
const fs = require('fs');
const path = require('path');
const { validarCredenciales } = require('./auth/auth.js'); // 👈 importar módulo

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// ... (otras rutas aquí)

app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  if (validarCredenciales(usuario, contrasena)) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
  }
});

app.use(express.json());
app.use(express.static(__dirname)); // Sirve HTML, JS, imágenes, etc.

const FILES_DIR = path.join(__dirname, 'archivos');

// Ruta para leer archivos .txt reales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

// Ruta para guardar un archivo nuevo o actualizado
app.post('/guardar', (req, res) => {
    const { nombre, contenido } = req.body;
  
    // ❗ Validación básica del nombre de archivo
    if (
      typeof nombre !== 'string' ||
      !nombre.endsWith('.txt') ||
      nombre.includes('..') ||
      path.basename(nombre) !== nombre
    ) {
      return res.status(400).json({ error: 'Nombre de archivo no permitido' });
    }
  
    const archivo = path.join(FILES_DIR, nombre);
    try {
      fs.writeFileSync(archivo, contenido, 'utf8');
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error al guardar archivo' });
    }
  });

// Lista de archivos disponibles
app.get('/listar', (req, res) => {
  fs.readdir(FILES_DIR, (err, files) => {
    if (err) return res.status(500).send('Error al listar archivos');
    res.json(files.filter(f => f.endsWith('.txt')));
  });
});

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});

// Eliminar archivo
app.delete('/eliminar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const archivo = path.join(FILES_DIR, nombre);
    if (
      !nombre.endsWith('.txt') ||
      nombre.includes('..') ||
      path.basename(nombre) !== nombre
    ) return res.status(400).json({ error: 'Nombre inválido' });
  
    if (fs.existsSync(archivo)) {
      fs.unlinkSync(archivo);
      res.json({ ok: true });
    } else {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  });

  app.get('/', (req, res) => {
    console.log('➡️ Se está sirviendo login.html');
    res.sendFile(path.join(__dirname, 'login.html'));
  });