require('./properties');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = global.properties.aeMonitorServerPort;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.express = app;

require('./api/interfaces/commission-api');


