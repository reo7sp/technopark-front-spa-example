const express = require('express');
const PORT = 8080;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile('public/index.html', {root: '.'});
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`));
