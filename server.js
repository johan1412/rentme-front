const express = require('express');
const serveStatic = require('serve-static');
let app = express();

app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port)
});

if (process.env.NODE_ENV === 'production') {
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
