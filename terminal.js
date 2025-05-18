document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
  
    if (!terminalInput || !terminalOutput) {
      console.error('No se encontró el input o output de la terminal');
      return;
    }
  
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        if (input) {
          printToTerminal(`$ ${input}`);
          parseAndHandleCommand(input);
        }
        terminalInput.value = '';
      }
    });
  
    function printToTerminal(message) {
      terminalOutput.innerHTML += `<div>${message}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
      }
  
      else if (command.startsWith('ping ')) {
        const target = command.split(' ')[1];
        for (let i = 1; i <= 4; i++) {
          printToTerminal(`Reply from ${target}: bytes=32 time=${Math.floor(Math.random() * 50) + 1}ms TTL=64`);
        }
      }
  
      else if (command.startsWith('apt-get install')) {
        const pkg = command.split(' ').slice(2).join(' ');
        printToTerminal(`Reading package lists... Done`);
        printToTerminal(`Building dependency tree... Done`);
        printToTerminal(`Installing ${pkg}...`);
        setTimeout(() => {
          printToTerminal(`${pkg} installed successfully.`);
        }, 1000);
      }
  
      else if (command === 'neofetch') {
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
        ``::::::::::::::''               Terminal: WebTerminal v1.0
             ''::::::::'      
                '''''         
        `);
      }
  
      else if (command.startsWith('cowsay ')) {
        const msg = command.substring(8);
        printToTerminal(`
  < ${msg} ><br>
   \\   ^__^<br>
    \\  (oo)\\_______<br>
       (__)\\       )\\/\\<br>
           ||----w |<br>
           ||     ||<br>
        `);
      }
  
      else if (command === 'clear') {
        terminalOutput.innerHTML = '';
      }
  
      else {
        if (isSudo) {
          printToTerminal(`sudo: ${command}: command not found`);
        } else {
          printToTerminal(`Command not found: ${command}`);
        }
      }
    }
  });