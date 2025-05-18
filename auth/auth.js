// auth.js
import usuarios from './users.json' assert { type: 'json' };

export function validarCredenciales(usuario, contrasena) {
  return usuarios.some(
    u => u.usuario === usuario && u.contrasena === contrasena
  );
}
