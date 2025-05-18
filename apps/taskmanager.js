/* apps/taskmanager.js
   --------------------------------------------------------
   Simulador sencillo de Task Manager:
   - Escanea ventanas abiertas (.window) para listar procesos.
   - Calcula CPU y RAM simuladas.
   - Permite “Finalizar” (ocultar) una ventana y refrescar métricas.
*/

const TOTAL_RAM_MB = 8192;  // 8 GB
const TOTAL_CPU_PCT = 100;

function updateTaskManager() {
  const statsEl = document.getElementById('taskStats');
  const listEl  = document.getElementById('taskList');
  if (!statsEl || !listEl) return;         // ventana aún no renderizada

  /* --- detectar apps abiertas --- */
  const liveApps = Array.from(document.querySelectorAll('.window'))
    .filter(w => w.style.display !== 'none' && w.id !== 'taskManagerWindow')
    .map((w, idx) => ({
      pid: 1000 + idx,
      id:  w.id,
      name: w.querySelector('.window-header span').textContent,
      cpu: Math.floor(Math.random() * 12) + 3,   // 3‑15 %
      ram: Math.floor(Math.random() * 250) + 50  // 50‑300 MB
    }));

  /* --- totales --- */
  const usedCPU = liveApps.reduce((a, p) => a + p.cpu, 0);
  const usedRAM = liveApps.reduce((a, p) => a + p.ram, 0);

  /* --- cabecera tipo htop --- */
  const memBar = bar(usedRAM / TOTAL_RAM_MB);
  const cpuBar = bar(usedCPU / TOTAL_CPU_PCT);
  const load   = [Math.random().toFixed(2), Math.random().toFixed(2), Math.random().toFixed(2)];

  statsEl.textContent =
`Mem [${memBar}] ${(usedRAM/1024).toFixed(2)}G/${(TOTAL_RAM_MB/1024).toFixed(2)}G
CPU [${cpuBar}] ${usedCPU}%/${TOTAL_CPU_PCT}%

Tasks: ${liveApps.length},  Threads: ${liveApps.length*3},  Load avg: ${load.join(' ')}
Uptime: ${new Date().toLocaleTimeString()}

PID   APP             CPU%  RAM(MB)`;

  /* --- lista de procesos --- */
  listEl.innerHTML = '';
  liveApps.forEach(app => {
    const row = document.createElement('div');
    row.innerHTML = `
<span style="display:inline-block;width:50px">${app.pid}</span>
<span style="display:inline-block;width:130px">${app.name}</span>
<span style="display:inline-block;width:50px">${app.cpu}</span>
<span style="display:inline-block;width:70px">${app.ram}</span>
<button onclick="killApp('${app.id}')" style="font-size:10px">Finalizar</button>
    `;
    listEl.appendChild(row);
  });
}

/* Helper para dibujar barras ASCII */
function bar(pct) {
  const blocks = Math.round(pct * 20);
  return '|'.repeat(blocks).padEnd(20);
}

/* Finalizar proceso */
function killApp(appId) {
  const win = document.getElementById(appId);
  if (win) {
    win.style.display = 'none';
    updateTaskManager();
  }
}

/* Exponer para ventanas.js */
function initTaskManager() { updateTaskManager(); }
window.initTaskManager = initTaskManager;

/* Autorefresco cada 4 s */
setInterval(updateTaskManager, 4000);