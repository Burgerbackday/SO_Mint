// auth/auth.js
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

function validarCredenciales(usuario, contrasena) {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  return users.some(
    u => u.usuario === usuario && u.contrasena === contrasena
  );
}

module.exports = { validarCredenciales };