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
      payload = { a: input1, b: input2 };
      break;
    case 'power':
      payload = { base: input1, exponent: input2 };
      break;
    case 'sqrt':
    case 'sin':
    case 'cos':
    case 'tan':
      payload = { value: input1 };
      break;
    case 'log':
      payload = { value: input1, base: input2 };
      break;
    case 'factorial':
      payload = { n: input1 };
      break;
    default:
      document.getElementById('result').innerText = "Unsupported operation";
      return;
  }

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
}