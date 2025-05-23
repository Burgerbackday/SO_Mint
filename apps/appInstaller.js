const appsToInstall = [
    {
      key: "reloj",
      config: {
        id: "clockWindow",
        title: "Reloj",
        body: `
          <div style="font-size:48px;" id="horaActual">--:--:--</div>
          <script>
            setInterval(() => {
              const h = document.getElementById("horaActual");
              if (h) h.textContent = new Date().toLocaleTimeString();
            }, 1000);
          </script>
        `
      }
    },
    {
      key: "holaApp",
      config: {
        id: "holaWindow",
        title: "Hola Mundo",
        body: `<p>¡Hola desde una app registrada externamente!</p>`
      }
    }
  ];
  
  const desktop = document.querySelector(".desktop");
  
  appsToInstall.forEach(app => {
    if (window.registerWindowApp) {
      window.registerWindowApp(app.key, app.config);
    }
  
    if (desktop) {
      const assetPath = `assets/${app.key}.png`;
  
     /* assetExists(assetPath, (exists) => {
        const icon = document.createElement("div");
        icon.className = "app-icon";
        icon.innerHTML = `
          ${exists ? `<img src="${assetPath}" style="width:32px;height:32px;"><br>` : ''}
          ${app.config.title}
        `;
        icon.onclick = () => {
          renderWindow(app.key);
          openWindow(app.config.id);
        };
  
        // Posición aleatoria para simulación
        icon.style.position = "absolute";
        icon.style.top = `${100 + Math.random() * 300}px`;
        icon.style.left = `${40 + Math.random() * 300}px`;
  
        desktop.appendChild(icon);
      });*/
    }
  }); 