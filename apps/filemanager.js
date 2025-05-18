let selectedFile = null;

function openFileManager() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  fetch('/listar')
    .then(res => res.json())
    .then(files => {
      files.forEach(filename => {
        const item = document.createElement("div");
        item.textContent = filename;
        item.style.cursor = "pointer";
        item.onclick = () => {
          selectedFile = filename;
          [...fileList.children].forEach(child => child.style.background = "none");
          item.style.background = "#222";
        };
        fileList.appendChild(item);
      });
      document.getElementById('fileManagerWindow').style.display = "flex"; // ❗ Muy importante
      updateTaskbarButtons(); // Para mostrarlo en la barra
    });
}

function createNewFile() {
  selectedFile = null;
  openFileEditor("", ""); // abre bloc de notas vacío
}

function openSelectedFile() {
  if (selectedFile) {
    fetch(`/leer/${selectedFile}`)
      .then(res => res.text())
      .then(contenido => openFileEditor(selectedFile, contenido));
  }
}

function guardarArchivo(nombre, contenido) {
  fetch('/guardar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contenido })
  }).then(res => res.json()).then(data => {
    if (data.ok) {
      alert("Archivo guardado");
      if (document.getElementById('fileManagerWindow')?.style.display !== 'none') {
        openFileManager();        // refresca la lista
      }
    }
  });
}