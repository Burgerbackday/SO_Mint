/*  apps/calendario.js
    ─────────────────────────────────────────────────────────
    Renderiza un calendario estilo Linux Mint dentro del
    div #calendarGrid.  Usar junto a ventanas.js:

      renderWindow('calendar'); openWindow('calendarWindow');
*/

(() => {
  // Día actual de referencia
  let currentDate = new Date();
  let viewMode = 'month'; // future: week, year

  // Encabezados (empieza en domingo para coincidir con Mint)
  const daysHeader = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  // Render principal --------------------------------------
  function drawCalendar () {
    const grid     = document.getElementById('calendarGrid');
    const controls = document.getElementById('calendarControls');
    if (!grid || !controls) return; // Ventana aún no se creó

    // Limpiar contenido
    grid.innerHTML = '';
    controls.innerHTML = '';

    // Datos del mes actual
    const year      = currentDate.getFullYear();
    const month     = currentDate.getMonth();
    const firstDay  = new Date(year, month, 1).getDay();
    const lastDate  = new Date(year, month + 1, 0).getDate();
    const today     = new Date();

    // ----------- CONTROLES (barra superior) -------------
    controls.innerHTML = `
      <div class="cal-toolbar">
        <div class="left">
          <button class="mint-btn small" onclick="goToday()">Today</button>
          <button class="icon-btn" onclick="changeCalendarMonth(-1)">◀</button>
          <button class="icon-btn" onclick="changeCalendarMonth(1)">▶</button>
        </div>
        <div class="center">
          <button class="mint-btn view"  id="weekBtn"  onclick="setView('week')">Week</button>
          <button class="mint-btn view active" id="monthBtn" onclick="setView('month')">Month</button>
          <button class="mint-btn view"  id="yearBtn"  onclick="setView('year')">Year</button>
        </div>
        <div class="right year-label">${year}</div>
      </div>
    `;

    // ----------- CABECERA DE DÍAS -----------------------
    daysHeader.forEach(d => {
      const h = document.createElement('div');
      h.textContent = d;
      h.className = 'header';
      grid.appendChild(h);
    });

    // ----------- Relleno previo al día 1 ----------------
    for (let i = 0; i < firstDay; i++)
      grid.appendChild(document.createElement('div'));

    // ----------- Celdas de cada día ---------------------
    for (let d = 1; d <= lastDate; d++) {
      const cell = document.createElement('div');
      cell.textContent = d;

      // Marcar hoy
      if (d === today.getDate() &&
          month === today.getMonth() &&
          year  === today.getFullYear())
        cell.classList.add('today');

      // Ejemplo: click para mostrar eventos (futuro)
      cell.onclick = () => {
        // marca día seleccionado visualmente
        grid.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        cell.classList.add('selected');
        // futuro: abrir panel de eventos
      };

      grid.appendChild(cell);
    }

    // Fuerza ancho uniforme de columnas
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  }

  // Cambiar de mes (desde botones ◀ ▶)
  window.changeCalendarMonth = delta => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    drawCalendar();
  };

  // Redibujar al cargar la página o cuando la ventana aparece
  window.addEventListener('load', drawCalendar);

  window.goToday = () => {
    currentDate = new Date();
    drawCalendar();
  };

  window.setView = mode => {
    viewMode = mode; // todavía sólo soportamos 'month'
    // actualizar botones activos
    ['week','month','year'].forEach(v => {
      const btn = document.getElementById(v + 'Btn');
      if (btn) btn.classList.toggle('active', v === mode);
    });
    drawCalendar();  // en el futuro cambiará el render según la vista
  };

  // También exporta para que otras ventanas puedan forzar refresco
  window.drawCalendar = drawCalendar;
})();