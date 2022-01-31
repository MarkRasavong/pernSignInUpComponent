const express = require('express');
const app = express();
const cors = require('cors');

//MIDDLEWARE
app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server connected @ ${PORT}`);
});