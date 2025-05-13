exports.add = (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
};

exports.subtract = (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
};

exports.multiply = (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
};

exports.divide = (req, res) => {
  const { a, b } = req.body;
  if (b === 0) return res.status(400).json({ error: "Division by zero" });
  res.json({ result: a / b });
};

exports.power = (req, res) => {
  const { base, exponent } = req.body;
  res.json({ result: Math.pow(base, exponent) });
};

exports.sqrt = (req, res) => {
  const { value } = req.body;
  if (value < 0) return res.status(400).json({ error: "Negative square root" });
  res.json({ result: Math.sqrt(value) });
};

exports.log = (req, res) => {
  const { value, base } = req.body;
  if (value <= 0 || base <= 0 || base === 1)
    return res.status(400).json({ error: "Invalid log input" });
  res.json({ result: Math.log(value) / Math.log(base) });
};

exports.factorial = (req, res) => {
  const { n } = req.body;
  if (n < 0 || !Number.isInteger(n)) return res.status(400).json({ error: "Invalid input" });

  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  res.json({ result });
};

exports.sin = (req, res) => {
  const { value } = req.body;
  res.json({ result: Math.sin(value) });
};

exports.cos = (req, res) => {
  const { value } = req.body;
  res.json({ result: Math.cos(value) });
};

exports.tan = (req, res) => {
  const { value } = req.body;
  res.json({ result: Math.tan(value) });
};
