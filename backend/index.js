const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Đổi thành v3 để lát check log cho sướng
  console.log(`Backend v4 running on port ${port}`);
});