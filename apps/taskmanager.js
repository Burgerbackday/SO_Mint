// Simulación de recursos disponibles del sistema
let totalRAM = 8192; // 8 GB
let totalCPU = 100;  // porcentaje máximo de CPU
let appResources = {
  terminalWindow: { name: "Terminal", cpu: 0, ram: 0 },
  notepadWindow: { name: "Notas", cpu: 0, ram: 0 },
  calcWindow: { name: "Calculadora", cpu: 0, ram: 0 },
  calendarWindow: { name: "Calendario", cpu: 0, ram: 0 },
};

function openTaskManager() {
  const output = document.getElementById("htopOutput");
  output.innerHTML = '';

  const load = [Math.random().toFixed(2), Math.random().toFixed(2), Math.random().toFixed(2)];
  const uptime = new Date().toLocaleTimeString();

  let usedRAM = 0;
  let usedCPU = 0;

  // Calcular consumo y simular recursos
  Object.keys(appResources).forEach(appId => {
    const win = document.getElementById(appId);
    if (win && win.style.display !== 'none') {
      const cpu = Math.floor(Math.random() * 15) + 5;   // 5–20%
      const ram = Math.floor(Math.random() * 300) + 100; // 100–400MB
      appResources[appId].cpu = cpu;
      appResources[appId].ram = ram;
      usedCPU += cpu;
      usedRAM += ram;
    } else {
      appResources[appId].cpu = 0;
      appResources[appId].ram = 0;
    }
  });

  const memUsed = (usedRAM / 1024).toFixed(2);
  const memTotal = (totalRAM / 1024).toFixed(2);

  output.innerHTML += `
Mem [${'|'.repeat((usedRAM / totalRAM) * 20).padEnd(20)}] ${memUsed}G/${memTotal}G
CPU [${'|'.repeat((usedCPU / totalCPU) * 20).padEnd(20)}] ${usedCPU}%/${totalCPU}%

Tasks: ${getOpenAppsCount()},  Threads: ${getOpenAppsCount() * 3},  Load avg: ${load.join(' ')}
Uptime: ${uptime}

PID   APP        CPU%  RAM(MB)    ACTION
`.trim() + '\n';

  let pid = 1000;

  Object.keys(appResources).forEach(appId => {
    const win = document.getElementById(appId);
    if (win && win.style.display !== 'none') {
      const app = appResources[appId];
      output.innerHTML += `
${pid.toString().padEnd(6)}${app.name.padEnd(10)}${app.cpu.toString().padEnd(6)}${app.ram.toString().padEnd(10)}
<button onclick="killApp('${appId}')">Finalizar tarea</button>
      `;
      pid += 1;
    }
  });

  openWindow('taskManagerWindow');
}

function killApp(appId) {
  const win = document.getElementById(appId);
  if (win) {
    win.style.display = 'none';
    appResources[appId].cpu = 0;
    appResources[appId].ram = 0;
    openTaskManager(); // recargar vista
  }
}

function getOpenAppsCount() {
  return Object.keys(appResources).filter(appId => {
    const win = document.getElementById(appId);
    return win && win.style.display !== 'none';
  }).length;
}