// auth/auth.js
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

function validarCredenciales(usuario, contrasena) {
  try {
    const jsonRaw = fs.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(jsonRaw);

    // Log para depuración
    console.log('📄 users.json cargado:', users);
    console.log('🔍 Buscando =>', { usuario, contrasena });

    const ok = users.some(
      u => u.usuario === usuario && u.contrasena === contrasena
    );

    if (!ok) {
      console.warn('❌ Credenciales NO encontradas para:', usuario);
    }
    return ok;
  } catch (err) {
    console.error('🚨 Error leyendo o parseando users.json:', err.message);
    return false;
  }
}

module.exports = { validarCredenciales };