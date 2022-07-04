const express = require('express');
var history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
let app = express();

app.use(serveStatic(__dirname + "/dist"));
app.use(history({
    index: '/index.html'
}));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port)
});

