const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

let app = express();

app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 8080;
app.use(history()).listen(port, () => {
    console.log('Listening on port ' + port)
});

