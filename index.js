const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());


function separateData(data) {
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  return { numbers, alphabets };
}

function findHighestLowercaseAlphabet(alphabets) {
  const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
  if (lowercaseAlphabets.length === 0) return null;
  const highestChar = lowercaseAlphabets.reduce((prev, current) => {
    return current > prev ? current : prev;
  });
  return highestChar;
}


function getOperationCode(req, res) {
  res.status(200).json({ operation_code: 1 });
}

function processData(req, res) {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid data format' });
  }

  const { numbers, alphabets } = separateData(data);
  const highestLowercaseAlphabet = findHighestLowercaseAlphabet(alphabets);

  const response = {
    is_success: true,
    user_id: 'aryan_arora_10022003',
    email: 'aa3649@srmist.edu.in',
    roll_number: 'RA2111003030291',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    file_valid: false,
    file_mime_type: null,
    file_size_kb: null,
  };

  res.status(200).json(response);
}


app.get('/bfhl', getOperationCode);
app.post('/bfhl', processData);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, message: 'Internal Server Error' });
});


exports.api = functions.https.onRequest(app);