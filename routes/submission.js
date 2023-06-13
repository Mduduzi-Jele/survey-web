var express = require("express");
var router = express.Router();
var connection = require("../db")

/* GET users listing. */
router.post("/", function (req, res, next) {
    let { surname, firstNames, contactNumber, date, age, food, eatOut, watchMovies, watchTV, listenRadio } = req.body;

    if(typeof food !== 'string'){
      console.log('The variable is a string.');
      food = food.join(', ')
    }

    // Create a new record in the database
    const sql = 'INSERT INTO survey_responses (surname, first_names, contact_number, date, age, food, eat_out, watch_movies, watch_tv, listen_radio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [surname, firstNames, contactNumber, date, age, food,eatOut, watchMovies, watchTV, listenRadio];
    connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error saving survey response:', err);
          return res.status(500).render({ status: 'Error saving survey response' });
        }
        console.log('Survey response saved:', result);
        res.status(200).render('submission', { status: 'Survey response saved' });
      });
});

module.exports = router;
