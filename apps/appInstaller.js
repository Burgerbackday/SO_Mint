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

appsToInstall.forEach(app => {
  if (window.registerWindowApp) {
    window.registerWindowApp(app.key, app.config);
  }
});