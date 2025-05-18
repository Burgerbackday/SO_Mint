/* apps/ventanas.js
   ─────────────────────────────────────────────────────────
   Registro central de ventanas y función renderWindow().
   Cada app declara id, título y HTML de cuerpo. Al primer
   clic se crea la ventana, se añaden manejadores de drag
   y se invoca el inicializador específico si existe.
*/

const windowsRegistry = {
  terminal: {
    id: 'terminalWindow',
    title: 'Terminal',
    body: `
      <div id="terminalOutput"></div>
      <input id="terminalInput" class="terminal-input" placeholder="Comando">
    `
  },
  calc: {
    id: 'calcWindow',
    title: 'Calculadora',
    body: `
      <input id="calcDisplay" readonly style="width:100%;font-size:24px;text-align:right;margin-bottom:6px;">
      <div id="calcButtons"></div>
    `
  },
  calendar: {
    id: 'calendarWindow',
    title: 'Calendario',
    body: `
      <div id="calendarControls"></div>
      <div id="calendarGrid" class="calendar-grid"></div>
    `
  },
  notepad: {
    id: 'notepadWindow',
    title: 'Bloc de Notas',
    body: `
      <select id="notaSelect" onchange="cargarNotaSeleccionada()">
        <option value="">-- Selecciona una nota --</option>
      </select>
      <textarea id="notepadTextarea" style="width:100%;height:220px;"></textarea>
      <input id="notaNombre" placeholder="Nombre_nota.txt">
      <button onclick="guardarNota()">Guardar</button>
      <button onclick="eliminarNota()">Eliminar</button>
      <button onclick="nuevaNota()">Nueva</button>
    `
  },
  musicPlayer: {
    id: 'musicPlayerWindow',
    title: 'Reproductor',
    body: `
      <div class="retro-player">

        <div id="currentSong" style="margin-bottom:6px;">--</div>

        <select id="playlistSelect" onchange="loadSelectedSong()" style="width:100%; margin-bottom:6px;"></select>

        <div class="controls" style="margin-bottom:6px; display:flex; gap:4px;">
          <button id="playPauseBtn" class="retro-btn-play" onclick="togglePlayPause()"></button>
          <button class="retro-btn-next" onclick="nextMusic()"></button>
          <button class="retro-btn-prev" onclick="prevMusic()"></button>
          <button onclick="toggleShuffle()">🔀</button>
          <button onclick="toggleLoop()">🔁</button>
        </div>

        <div style="display:flex;align-items:center;gap:4px;">
          <span>🎵</span>
          <input type="range" id="progressBar" value="0" class="slider">
        </div>

        <div style="display:flex;align-items:center;gap:4px;margin-top:4px;">
          <span>🔊</span>
          <input type="range" id="volumeControl" min="0" max="1" step="0.01" value="1" class="slider">
        </div>

        <audio id="audioElement" style="display:none;"></audio>
      </div>
    `
  },
  taskManager: {
    id: 'taskManagerWindow',
    title: 'Task Manager',
    body: `
      <pre id="taskStats"></pre>
      <div id="taskList"></div>
    `
  },
  fileManager: {
    id: 'fileManagerWindow',
    title: 'Archivos',
    body: `
      <div class="fm-window">

        <div class="fm-sidebar" id="fmSidebar">
          <div class="fm-tree-item active">Carpeta personal</div>
          <div class="fm-tree-item">Sistema de archivos</div>
        </div>

        <div class="fm-main">
          <div class="fm-toolbar">
            <button class="fm-btn" onclick="fmBack()">◀</button>
            <button class="fm-btn" onclick="fmForward()">▶</button>
            <input id="fmPath" class="fm-path" value="/home/usuario" readonly>
            <button class="fm-btn" onclick="fmRefresh()">🔄</button>
          </div>

          <div class="fm-content" id="fileList"></div>
        </div>

      </div>
    `
  }
};

function renderWindow(key) {
  const cfg = windowsRegistry[key];
  if (!cfg) return;

  // Si ya existe, no crear de nuevo
  if (document.getElementById(cfg.id)) return;

  // Construir ventana
  const win = document.createElement('div');
  win.className = 'window';
  win.id = cfg.id;
  win.innerHTML = `
    <div class="window-header">
      <span>${cfg.title}</span>
      <span class="close-btn" onclick="closeWindow('${cfg.id}')">
        <img src="assets/cerrar.png" alt="Cerrar" class="close-icon">
      </span>
    </div>
    <div class="window-body">${cfg.body}</div>
    <div class="resize-handle"></div>
  `;

  document.body.appendChild(win);

  /* ───── Habilitar drag & drop ───── */
  const header = win.querySelector('.window-header');
  let dragging = false, offX = 0, offY = 0;

  header.addEventListener('mousedown', ev => {
    dragging = true;
    offX = ev.clientX - win.offsetLeft;
    offY = ev.clientY - win.offsetTop;
  });
  document.addEventListener('mousemove', ev => {
    if (!dragging) return;
    win.style.left = (ev.clientX - offX) + 'px';
    win.style.top  = (ev.clientY - offY) + 'px';
  });
  document.addEventListener('mouseup', () => dragging = false);

  /* ───── Redimensionar desde esquina ───── */
  const resizer = win.querySelector('.resize-handle');
  let resizing = false, startX, startY, startW, startH;

  resizer.addEventListener('mousedown', ev => {
    ev.stopPropagation();
    resizing = true;
    startX = ev.clientX;
    startY = ev.clientY;
    const rect = win.getBoundingClientRect();
    startW = rect.width;
    startH = rect.height;
  });

  document.addEventListener('mousemove', ev => {
    if (!resizing) return;
    const newW = Math.max(300, startW + (ev.clientX - startX));
    const newH = Math.max(200, startH + (ev.clientY - startY));
    win.style.width  = newW + 'px';
    win.style.height = newH + 'px';
  });

  document.addEventListener('mouseup', () => resizing = false);

  /* ───── Inicializadores específicos ───── */
  if (key === 'calendar'    && typeof window.drawCalendar    === 'function') window.drawCalendar();
  if (key === 'taskManager' && typeof window.initTaskManager === 'function') window.initTaskManager();
  if (key === 'musicPlayer' && typeof window.openMusicPlayer === 'function') {
    window.openMusicPlayer();
  }
}

window.renderWindow = renderWindow;
window.windowsRegistry = windowsRegistry;