function toggleInputFields() {
  const op = document.getElementById('operation').value;
  const input2 = document.getElementById('input2');

  // Only show input2 if operation needs two inputs
  const needsSecondInput = ['add', 'subtract', 'multiply', 'divide', 'power'];

  if (needsSecondInput.includes(op)) {
    input2.style.display = 'inline';
  } else {
    input2.style.display = 'none';
  }
}

async function calculate() {
  const op = document.getElementById('operation').value;
  const input1 = parseFloat(document.getElementById('input1').value);
  const input2 = parseFloat(document.getElementById('input2').value);
  let url = `/api/math/${op}`;
  let payload = {};

  switch(op) {
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
    } else {
      document.getElementById('result').innerText = `Error: ${data.error}`;
    }
  } catch (err) {
    document.getElementById('result').innerText = `Error: ${err.message}`;
  }
}
