const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


app.listen(PORT, console.log(`Server is running at port ${PORT}`))