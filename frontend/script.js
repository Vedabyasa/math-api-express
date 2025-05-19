function toggleInputFields() {
  const op = document.getElementById('operation').value;
  const input2 = document.getElementById('input2');

  // Only show input2 if operation needs two inputs
  const needsSecondInput = ['add', 'subtract', 'multiply', 'divide', 'power'];
  input2.style.display = needsSecondInput.includes(op) ? 'inline' : 'none';
}

async function calculate(fromHistory = null) {
  const op = document.getElementById('operation').value;
  const input1 = parseFloat(document.getElementById('input1').value);
  const input2 = parseFloat(document.getElementById('input2').value);
  let url = `/api/math/${op}`;
  let payload = {};

  switch (op) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
    case 'power':
      payload = { a: input1, b: input2 };
      break;
    case 'sqrt':
    case 'factorial':
    case 'sin':
    case 'cos':
    case 'tan':
      payload = { value: input1 };
      break;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById('result').innerText = `Result: ${data.result}`;
      if (!fromHistory) await saveToHistory(op, payload, data.result);
    } else {
      document.getElementById('result').innerText = `Error: ${data.error}`;
    }
  } catch (err) {
    document.getElementById('result').innerText = `Error: ${err.message}`;
  }
}

async function saveToHistory(operation, input, result) {
  try {
    await fetch('/api/math/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operation, input, result })
    });
    await loadHistory();
  } catch (err) {
    console.error('Failed to save history:', err);
  }
}

async function loadHistory() {
  try {
    const res = await fetch('/api/math/history');
    const history = await res.json();
    const list = document.getElementById('historyList');
    console.log(list)
    list.innerHTML = '';

    history.slice().reverse().forEach(entry => {
      const li = document.createElement('li');
      li.textContent = formatHistoryText(entry);
      li.style.cursor = 'pointer';

      li.addEventListener('click', () => {
        populateFromHistory(entry);
      });

      list.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load history:', err);
  }
}

function formatHistoryText(entry) {
  const { operation, input, result } = entry;
  switch (operation) {
    case 'add': return `${input.a} + ${input.b} = ${result}`;
    case 'subtract': return `${input.a} - ${input.b} = ${result}`;
    case 'multiply': return `${input.a} * ${input.b} = ${result}`;
    case 'divide': return `${input.a} ÷ ${input.b} = ${result}`;
    case 'power': return `${input.a} ^ ${input.b} = ${result}`;
    case 'sqrt': return `√${input.value} = ${result}`;
    case 'factorial': return `${input.value}! = ${result}`;
    case 'sin': return `sin(${input.value}) = ${result}`;
    case 'cos': return `cos(${input.value}) = ${result}`;
    case 'tan': return `tan(${input.value}) = ${result}`;
    default: return `${operation} = ${result}`;
  }
}

function populateFromHistory(entry) {
  const { operation, input } = entry;
  document.getElementById('operation').value = operation;
  toggleInputFields();

  if ('a' in input) {
    document.getElementById('input1').value = input.a;
    document.getElementById('input2').value = input.b;
  } else {
    document.getElementById('input1').value = input.value;
    document.getElementById('input2').value = '';
  }

  calculate(true);
}

window.addEventListener('DOMContentLoaded', () => {
  toggleInputFields();
  loadHistory();
});


// document.addEventListener("DOMContentLoaded", function () {
//   const showHistoryBtn = document.getElementById("showHistoryBtn");
//   const closeHistoryBtn = document.getElementById("closeHistoryBtn");
//   const historyModal = document.getElementById("historyModal");
//   const historyList = document.getElementById("historyList");

//   showHistoryBtn.addEventListener("click", async () => {
//     try {
//       const res = await fetch("/api/maths/history");
//       const data = await res.json();

//       // Clear and populate history
//       historyList.innerHTML = "";
//       if (data.length === 0) {
//         historyList.innerHTML = "<li>No history available.</li>";
//       } else {
//         data.forEach(entry => {
//           const li = document.createElement("li");
//           li.textContent = `${entry.operation}: ${entry.input} = ${entry.result}`;
//           historyList.appendChild(li);
//         });
//       }

//       // Show modal
//       historyModal.style.display = "block";
//     } catch (err) {
//       alert("Failed to load history");
//     }
//   });

//   closeHistoryBtn.addEventListener("click", () => {
//     historyModal.style.display = "none";
//   });
// });
