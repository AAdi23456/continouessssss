const express = require('express');
const axios = require('axios');
const cors=require("cors")
const app = express();
const port = 3000;

const url = 'https://learning-management-system-a3kr.onrender.com/isAlive'; // Replace with your route
const maxRequests = 300000;
const interval = 30000; // 30 seconds
app.use(cors())
app.use(express.static('public'));

app.get('/trigger', (req, res) => {
    let count = 0;

    function sendRequest() {
        if (count < maxRequests) {
            axios.get(url)
                .then(response => {
                    console.log(`Request #${count + 1} successful`, response.data);
                    res.write(`Request #${count + 1} successful: ${JSON.stringify(response.data)}\n`);
                })
                .catch(error => {
                    console.error(`Request #${count + 1} failed`, error);
                    res.write(`Request #${count + 1} failed: ${error.message}\n`);
                })
                .finally(() => {
                    count++;
                    if (count < maxRequests) {
                        setTimeout(sendRequest, interval);
                    } else {
                        res.end('Completed 300,000 requests\n');
                    }
                });
        }
    }

    sendRequest();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
