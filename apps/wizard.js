function iniciarInstalador(rutaManifest) {
  fetch(rutaManifest)
    .then(res => res.json())
    .then(manifest => {
      renderWindow("wizard_installer");
      openWindow("wizard_installer");

      const wizard = document.getElementById("wizardBody");
      wizard.innerHTML = `
        <h2>Instalador de ${manifest.title}</h2>
        <img src="${manifest.icon}" width="64" style="margin: 10px 0;">
        <p>${manifest.description}</p>
        <button onclick="finalizarInstalacion('${manifest.script}', '${manifest.key}', '${manifest.icon}', '${manifest.title}')">
          Instalar
        </button>
        <button onclick="closeWindow('wizard_installer')">Cancelar</button>
      `;
    });
}


function finalizarInstalacion(scriptPath, appKey, iconPath, title) {
  const script = document.createElement("script");
  script.src = scriptPath;

  script.onload = () => {
    const icon = document.createElement("div");
    icon.className = "app-icon";
    icon.innerHTML = `<img src="${iconPath}" width="48"><br>${title}`;

    icon.onclick = () => {
      renderWindow(appKey);
      openWindow(appKey);
    
      setTimeout(() => {
        if (typeof asignarEventosNavegador === "function") {
          asignarEventosNavegador();
        }
      }, 50);
    };

    icon.style.position = "absolute";
    icon.style.top = `${100 + Math.random() * 300}px`;
    icon.style.left = `${40 + Math.random() * 300}px`;

    document.querySelector(".desktop").appendChild(icon);

    if (typeof hacerArrastrable === "function") {
      hacerArrastrable(icon);
    }

    closeWindow('wizard_installer');
    alert(`La app "${title}" se ha instalado correctamente.`);
  };

  script.onerror = () => {
    console.error(`[finalizarInstalacion] Error al cargar el script: ${scriptPath}`);
    alert(`No se pudo cargar la aplicación: ${title}`);
  };

  document.body.appendChild(script);
}

  function hacerArrastrable(icon) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    icon.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - icon.offsetLeft;
      offsetY = e.clientY - icon.offsetTop;
      icon.style.zIndex = 99;
      icon.style.cursor = "grabbing";
    });
  
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      icon.style.left = Math.max(0, e.clientX - offsetX) + 'px';
      icon.style.top = Math.max(0, e.clientY - offsetY) + 'px';
    });
  
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        icon.style.cursor = "grab";
      }
    });
  }
  
  function asignarEventosNavegador() {
    const input = document.getElementById("urlInput");
    const frame = document.getElementById("browserFrame");
    const btnGo = document.getElementById("btnGo");
    const btnBack = document.getElementById("btnBack");
    const btnForward = document.getElementById("btnForward");
  
    if (!input || !frame || !btnGo) {
      console.warn("Elementos del navegador no encontrados todavía.");
      return;
    }
  
    const historyStack = [];
    let historyIndex = -1;
  
    function navigate(url) {
      const fullUrl = url.startsWith("http") ? url : "https://" + url;
      frame.src = fullUrl;
      input.value = fullUrl;
      if (historyIndex === -1 || historyStack[historyIndex] !== fullUrl) {
        historyStack.splice(historyIndex + 1);
        historyStack.push(fullUrl);
        historyIndex = historyStack.length - 1;
      }
    }
  
    btnGo.onclick = () => navigate(input.value);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") navigate(input.value);
    });
  
    btnBack.onclick = () => {
      if (historyIndex > 0) {
        historyIndex--;
        frame.src = historyStack[historyIndex];
        input.value = historyStack[historyIndex];
      }
    };
  
    btnForward.onclick = () => {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        frame.src = historyStack[historyIndex];
        input.value = historyStack[historyIndex];
      }
    };
  }