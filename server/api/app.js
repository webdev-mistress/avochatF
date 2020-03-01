const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerUser = require('./routes/user');
const routerMessages = require('./routes/messages');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', routerUser);
app.use('/messages', routerMessages);

const port = 4170;

app.listen(port, () => console.debug('Server is listening on port ' + port));
