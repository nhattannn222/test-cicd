const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Thay đổi log để nhận biết v2
  console.log(`Backend v2 running on port ${port}`);
});