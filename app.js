const express = require('express');
const bodyParser = require('body-parser');
const gs = require('github-scraper');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

/**
 * Added getGithubData() to fetch data from github api 
 *
*/
async function getGithubData(url) {
    return new Promise((resolve, reject) => {
        gs(url, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/fetch', async (req, res) => {
    const username = req.body.username;
    const url = `/${username}`;

    try {
        const data = await getGithubData(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

/**
 * By default user will be redirected to home page
 *
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
