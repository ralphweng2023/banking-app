import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    exec('npm run test:integration -- --json --outputFile=results.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing tests: ${error}`);
            return res.status(500).send('Error executing tests');
        }

        const results = require('./results.json');
        res.render('index', { results });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});