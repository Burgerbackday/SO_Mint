window.initTerminal = function() {
  const terminalContainer = document.getElementById('terminalWindow');
  if (!terminalContainer) {
    console.error('No se encontró el contenedor terminalWindow');
    return;
  }

  // Limpiar contenido previo para evitar duplicados
  terminalContainer.innerHTML = '';

  terminalContainer.style.display = 'flex';
  terminalContainer.style.flexDirection = 'column';
  terminalContainer.style.height = '100%';

  const outputDiv = document.createElement('div');
  outputDiv.id = 'terminalOutput';
  outputDiv.style.flex = '1';
  outputDiv.style.overflowY = 'auto';
  outputDiv.style.padding = '10px';
  outputDiv.style.color = '#8ae234';
  outputDiv.style.fontFamily = 'monospace';

  const input = document.createElement('input');
  input.id = 'terminalInput';
  input.type = 'text';
  input.placeholder = 'Escribe un comando...';
  input.style.border = 'none';
  input.style.outline = 'none';
  input.style.padding = '10px';
  input.style.fontSize = '14px';
  input.style.fontFamily = 'monospace';
  input.style.background = '#222';
  input.style.color = '#eee';
  input.style.width = '100%';

  terminalContainer.appendChild(outputDiv);
  terminalContainer.appendChild(input);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputValue = input.value.trim();
      if (inputValue) {
        printToTerminal(`$ ${inputValue}`);
        parseAndHandleCommand(inputValue);
      }
      input.value = '';
    }
  });

  function printToTerminal(message) {
    outputDiv.innerHTML += `<div>${message}</div>`;
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }

  function parseAndHandleCommand(input) {
    if (input.startsWith('sudo ')) {
      const actualCommand = input.slice(5).trim();
      if (actualCommand === '') {
        printToTerminal(`[sudo] password for usuario:`);
      } else {
        printToTerminal(`[sudo] password for usuario: ********`);
        handleCommand(actualCommand, true); // true = modo sudo
      }
    } else {
      handleCommand(input.toLowerCase(), false); // false = sin sudo
    }
  }

  function handleCommand(command, isSudo = false) {
    if (command === 'ipconfig') {
      printToTerminal(`IPv4 Address: 192.168.1.100`);
      printToTerminal(`Subnet Mask: 255.255.255.0`);
      printToTerminal(`Default Gateway: 192.168.1.1`);
    } else if (command.startsWith('ping ')) {
      const target = command.split(' ')[1];
      for (let i = 1; i <= 4; i++) {
        printToTerminal(`Reply from ${target}: bytes=32 time=${Math.floor(Math.random() * 50) + 1}ms TTL=64`);
      }
    } else if (command.startsWith('apt-get install')) {
      const pkg = command.split(' ').slice(2).join(' ');
      printToTerminal(`Reading package lists... Done`);
      printToTerminal(`Building dependency tree... Done`);
      printToTerminal(`Installing ${pkg}...`);
      setTimeout(() => {
        printToTerminal(`${pkg} installed successfully.`);
      }, 1000);
    } else if (command === 'neofetch') {
      printToTerminal(`
                   ...                     
                 .::::.                    usuario@mint
               .::::::::.                  --------------
              :::::::::::                 OS: Linux Mint 21.1
          ..:::::::::::'                  Kernel: 5.15.0
        '::::::::::::'                    Uptime: 1 hour
          .::::::::::                     Shell: /bin/bash
        '::::::::::::::..                CPU: Intel i5-8250U
          ..::::::::::::::.              Memory: 8GB
        \`\`::::::::::::::''               Terminal: WebTerminal v1.0
             ''::::::::'      
                '''''         
      `);
    } else if (command.startsWith('cowsay ')) {
      const msg = command.substring(8);
      printToTerminal(`
  < ${msg} ><br>
   \\   ^__^<br>
    \\  (oo)\\_______<br>
       (__)\\       )\\/\\<br>
           ||----w |<br>
           ||     ||<br>
      `);
    } else if (command === 'clear') {
      outputDiv.innerHTML = '';
    } else {
      if (isSudo) {
        printToTerminal(`sudo: ${command}: command not found`);
      } else {
        printToTerminal(`Command not found: ${command}`);
      }
    }
  }
};