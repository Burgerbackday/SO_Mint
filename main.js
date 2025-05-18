

function abrirNotepad() {
  const ventana = document.createElement('div');
  ventana.className = 'ventana';
  ventana.innerHTML = `
    <div class="barra">
      Bloc de notas
      <button onclick="this.parentElement.parentElement.remove()" style="float:right;">X</button>
    </div>
    <textarea style="width: 100%; height: calc(100% - 30px); border: none; resize: none;"></textarea>
  `;

  // Estilos inline básicos
  ventana.style.position = 'absolute';
  ventana.style.top = '100px';
  ventana.style.left = '100px';
  ventana.style.width = '300px';
  ventana.style.height = '200px';
  ventana.style.background = 'white';
  ventana.style.border = '1px solid black';
  ventana.style.zIndex = 1000;
  ventana.style.boxShadow = '4px 4px 10px rgba(0,0,0,0.5)';

  document.body.appendChild(ventana);
}