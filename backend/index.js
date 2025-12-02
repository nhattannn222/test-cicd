const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Backend running on port " + port));
