function openNotepad() {
  openWindow('notepadWindow');
  cargarNotasDisponibles();
  document.getElementById('notepadTextarea').value = '';
  document.getElementById('notaNombre').value = '';
}

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

  fetch(`/leer/${archivo}`)
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
      cargarNotasDisponibles();
    }
  });
}

function eliminarNota() {
  const nombre = document.getElementById('notaNombre').value.trim();
  if (!nombre) return alert("Selecciona una nota para eliminar");

  if (!confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;

  fetch(`/eliminar/${nombre}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert("Nota eliminada");
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