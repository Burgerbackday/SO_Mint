let selectedFile = null;

function openFileManager() {
  console.log('🧭 Ejecutando openFileManager()');
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  document.getElementById('fileManagerWindow').style.display = "flex"; // ❗ Muy importante

  fetch('/listar')
    .then(res => res.json())
    .then(files => {
      console.log('🟢 Archivos recibidos del servidor:', files);
      if (!files || !Array.isArray(files)) {
        console.error('❌ Respuesta inesperada de /listar:', files);
        fileList.innerHTML = '<div style="color:red">[ Error cargando archivos ]</div>';
        return;
      }
      if (!files.length) {
        fileList.innerHTML = '<div style="color:#666;font-style:italic;">[ Carpeta vacía ]</div>';
        return;
      }
      files.forEach(filename => {
        const item = document.createElement("div");
        item.classList.add("fileItem");
        item.textContent = filename;
        item.style.cursor = "pointer";
        item.onclick = () => {
          selectedFile = filename;
          document.querySelectorAll('.fileItem').forEach(child => child.classList.remove('selected'));
          item.classList.add('selected');
        };

        item.ondblclick = () => {
          fetch(`/leer/${filename}`)
            .then(res => res.text())
            .then(contenido => {
              if (typeof openFileEditor === "function") {
                const notepadWin = document.getElementById("notepadWindow") || document.getElementById("notepad");
                if (notepadWin) {
                  openWindow("notepadWindow");
                  openFileEditor(filename, contenido);
                  setTimeout(() => {
                    const textarea = document.getElementById("notepadTextarea");
                    if (textarea) textarea.focus();
                  }, 50);
                } else {
                  console.error("❌ La ventana del bloc de notas no está definida (notepadWindow).");
                }
              } else {
                console.error("❌ No se encontró openFileEditor. Asegúrate de que notepad.js esté cargado.");
              }
            });
        };
        fileList.appendChild(item);
      });
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