
function cargarNotasDisponibles() {
  fetch('/listar')
    .then(res => res.json())
    .then(files => {
      const select = document.getElementById('notaSelect');
      select.innerHTML = '<option value="">-- Selecciona una nota --</option>';
      files.forEach(file => {
        const opt = document.createElement('option');
        opt.value = file;
        opt.textContent = file;
        select.appendChild(opt);
      });
    });
}

function cargarNotaSeleccionada() {
  const select = document.getElementById('notaSelect');
  const archivo = select.value;
  if (!archivo) return;

  fetch(`/leer/${encodeURIComponent(archivo)}`)
    .then(res => res.text())
    .then(content => {
      document.getElementById('notepadTextarea').value = content;
      document.getElementById('notaNombre').value = archivo;
    });
}

function guardarNota() {
  const nombre = document.getElementById('notaNombre').value.trim();
  const contenido = document.getElementById('notepadTextarea').value;

  if (!nombre.endsWith('.txt')) return alert("El archivo debe terminar en .txt");
  if (!nombre) return alert("Escribe un nombre para la nota");

  fetch('/guardar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contenido })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      alert("Nota guardada");
      if (document.getElementById('fileManagerWindow')?.style.display !== 'none') {
        openFileManager();
      }
      cargarNotasDisponibles();
    }
  });
}

function eliminarNota() {
  const nombre = document.getElementById('notaNombre').value.trim();
  if (!nombre) return alert("Selecciona una nota para eliminar");

  if (!confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;

  fetch(`/eliminar/${encodeURIComponent(nombre)}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert("Nota eliminada");
        if (document.getElementById('fileManagerWindow')?.style.display !== 'none') {
          openFileManager();
        }
        nuevaNota();
        cargarNotasDisponibles();
      }
    });
}

function nuevaNota() {
  document.getElementById('notepadTextarea').value = '';
  document.getElementById('notaNombre').value = '';
  document.getElementById('notaSelect').value = '';
}

function openFileEditor(nombre, contenido) {
  openWindow('notepadWindow');
  document.getElementById('notepadTextarea').value = contenido;
  document.getElementById('notaNombre').value = nombre;
  document.getElementById('notaSelect').value = '';
}

// 🔗 Hazla accesible globalmente
window.openFileEditor = openFileEditor;
/* apps/notepad.js
   Bloc de Notas: crear, leer, guardar y eliminar .txt en /archivos
*/

/* --- abrir bloc y listar notas --- */
function openNotepad() {
  openWindow('notepadWindow');
  cargarNotasDisponibles();
  document.getElementById('notepadTextarea').value = '';
  document.getElementById('notaNombre').value = '';
}

/* --- poblar <select> con archivos .txt --- */
function cargarNotasDisponibles() {
  fetch('/listar')
    .then(res => res.json())
    .then(files => {
      const select = document.getElementById('notaSelect');
      select.innerHTML = '<option value="">-- Selecciona una nota --</option>';
      files.forEach(file => {
        const opt = document.createElement('option');
        opt.value = file;
        opt.textContent = file;
        select.appendChild(opt);
      });
    });
}

/* --- cargar nota elegida --- */
function cargarNotaSeleccionada() {
  const archivo = document.getElementById('notaSelect').value;
  if (!archivo) return;

  fetch(`/leer/${encodeURIComponent(archivo)}`)
    .then(res => res.text())
    .then(content => {
      document.getElementById('notepadTextarea').value = content;
      document.getElementById('notaNombre').value = archivo;
    });
}

/* --- guardar (crear o sobrescribir) --- */
function guardarNota() {
  const nombre = document.getElementById('notaNombre').value.trim();
  const contenido = document.getElementById('notepadTextarea').value;

  if (!nombre) return alert('Escribe un nombre para la nota');
  if (!nombre.endsWith('.txt')) return alert('El archivo debe terminar en .txt');

  fetch('/guardar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contenido })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Nota guardada');
        if (document.getElementById('fileManagerWindow')?.style.display !== 'none') {
          openFileManager(); // refresca lista
        }
        cargarNotasDisponibles();
      }
    });
}

/* --- eliminar nota --- */
function eliminarNota() {
  const nombre = document.getElementById('notaNombre').value.trim();
  if (!nombre) return alert('Selecciona una nota para eliminar');
  if (!confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;

  fetch(`/eliminar/${encodeURIComponent(nombre)}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Nota eliminada');
        if (document.getElementById('fileManagerWindow')?.style.display !== 'none') {
          openFileManager();
        }
        nuevaNota();
        cargarNotasDisponibles();
      }
    });
}

/* --- limpiar formulario --- */
function nuevaNota() {
  document.getElementById('notepadTextarea').value = '';
  document.getElementById('notaNombre').value = '';
  document.getElementById('notaSelect').value = '';
}

/* --- abrir automáticamente desde File Manager --- */
function openFileEditor(nombre, contenido) {
  openWindow('notepadWindow');
  document.getElementById('notepadTextarea').value = contenido;
  document.getElementById('notaNombre').value = nombre;
  document.getElementById('notaSelect').value = '';
}
window.openFileEditor = openFileEditor;
window.notepadWindow = 'notepadWindow';