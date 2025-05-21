function toggleCalcMode() {
  const modeSelect = document.getElementById('modeSelect');
  const basicCalc = document.getElementById('basicCalc');
  const scientificCalc = document.getElementById('scientificCalc');
  if (!modeSelect || !basicCalc || !scientificCalc) return;

  if (modeSelect.value === 'basic') {
    basicCalc.style.display = 'block';
    scientificCalc.style.display = 'none';
  } else {
    basicCalc.style.display = 'none';
    scientificCalc.style.display = 'block';
  }
}

function calculateBasic() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const op = document.getElementById('operation').value;
  let res = '';
  if (!isNaN(num1) && !isNaN(num2)) {
    switch (op) {
      case '+': res = num1 + num2; break;
      case '-': res = num1 - num2; break;
      case '*': res = num1 * num2; break;
      case '/': res = num2 !== 0 ? num1 / num2 : 'Error: división por cero'; break;
    }
  } else {
    res = 'Entrada inválida';
  }
  document.getElementById('result').textContent = res;
}

function calculateScientific() {
  const num = parseFloat(document.getElementById('sciNum').value);
  const op = document.getElementById('sciOperation').value;
  let res = '';
  if (!isNaN(num)) {
    switch (op) {
      case 'sin': res = Math.sin(num); break;
      case 'cos': res = Math.cos(num); break;
      case 'tan': res = Math.tan(num); break;
      case 'log': res = num > 0 ? Math.log10(num) : 'Error'; break;
      case 'sqrt': res = num >= 0 ? Math.sqrt(num) : 'Error'; break;
      case 'exp': res = Math.exp(num); break;
    }
  } else {
    res = 'Entrada inválida';
  }
  document.getElementById('sciResult').textContent = res;
}

window.renderCalculator = function () {
  const container = document.createElement('div');
  container.className = 'calculator-container';
  container.innerHTML = `
    <style>
      .calc-display {
        width: 100%;
        height: 50px;
        font-size: 24px;
        text-align: right;
        padding: 10px;
        margin-bottom: 10px;
      }
      .calc-buttons {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
      }
      .calc-buttons button {
        font-size: 18px;
        padding: 10px;
      }
    </style>
    <input id="calcDisplay" class="calc-display" disabled />

    <div class="calc-buttons">
      <button onclick="appendCalc('7')">7</button>
      <button onclick="appendCalc('8')">8</button>
      <button onclick="appendCalc('9')">9</button>
      <button onclick="appendCalc('/')">÷</button>
      <button onclick="backspaceCalc()">←</button>
      <button onclick="appendCalc('4')">4</button>
      <button onclick="appendCalc('5')">5</button>
      <button onclick="appendCalc('6')">6</button>
      <button onclick="appendCalc('*')">×</button>
      <button onclick="clearCalc()">C</button>
      <button onclick="appendCalc('1')">1</button>
      <button onclick="appendCalc('2')">2</button>
      <button onclick="appendCalc('3')">3</button>
      <button onclick="appendCalc('-')">−</button>
      <button onclick="appendCalc('(')">(</button>
      <button onclick="appendCalc('0')">0</button>
      <button onclick="appendCalc('.')">.</button>
      <button onclick="appendCalc('%')">%</button>
      <button onclick="appendCalc('+')">+</button>
      <button onclick="appendCalc(')')">)</button>
      <button onclick="appendCalc('**2')">x²</button>
      <button onclick="appendCalc('Math.sqrt(')">√</button>
      <button onclick="calculateCalc()">=</button>
    </div>
  `;
  const targetWindow = document.getElementById('calculatorWindow');
  if (targetWindow) {
    const body = targetWindow.querySelector('.window-body');
    if (body) body.innerHTML = '';
    if (body) body.appendChild(container);
  } else {
    console.error('calculatorWindow not found');
  }
};

window.appendCalc = function (val) {
  const display = document.getElementById('calcDisplay');
  if (display) display.value += val;
}

window.clearCalc = function () {
  const display = document.getElementById('calcDisplay');
  if (display) display.value = '';
}

window.backspaceCalc = function () {
  const display = document.getElementById('calcDisplay');
  if (display) display.value = display.value.slice(0, -1);
}

window.calculateCalc = function () {
  const display = document.getElementById('calcDisplay');
  try {
    const result = eval(display.value);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}