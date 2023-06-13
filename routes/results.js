var express = require("express");
var router = express.Router();
var connection = require("../db");
var { findYoungestPerson, findOldestPerson, favFood } = require("../utils");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const sql = "SELECT * FROM survey_responses";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .render("error", { error: "Error fetching rows from the table" });
    }

    // finds the number of surveys
    const rowCount = results.length;
    //finds the average age
    let aveAge = 0;
    results.map((survey) => (aveAge += survey.age));
    aveAge /= rowCount;

    //finds the oldest participant
    const old = findOldestPerson(results.map((person) => person.age));

    //finds the youngest participant
    const young = findYoungestPerson(results.map((person) => person.age));

    //find percentage of people that like pizza
    const pizza = (favFood(results, "Pizza") / results.length) * 100;

    //find percentage of people that like pizza
    const pasta = (favFood(results, "Pasta") / results.length) * 100;

    //find percentage of people that like pizza
    const papAndWors = (favFood(results, "Pap and Wors") / results.length) * 100;

    //finds the average rating
    let aveEatOut = 0;
    results.map((survey) => (aveEatOut += survey.eat_out));
    aveEatOut /= rowCount;

    let aveWatchMovies = 0;
    results.map((survey) => (aveWatchMovies += survey.watch_movies));
    aveWatchMovies /= rowCount;

    let aveWatchTv = 0;
    results.map((survey) => (aveWatchTv += survey.watch_tv));
    aveWatchTv /= rowCount;

    let aveListenRadio = 0;
    results.map((survey) => (aveListenRadio += survey.watch_tv));
    aveListenRadio /= rowCount;

    res.render("results", {
      rowCount,
      aveAge: aveAge.toFixed(2),
      young,
      old,
      pizza: pizza.toFixed(1),
      pasta: pasta.toFixed(1),
      papAndWors: papAndWors.toFixed(1),
      aveEatOut: aveEatOut.toFixed(2),
      aveWatchMovies: aveWatchMovies.toFixed(2),
      aveWatchTv: aveWatchTv.toFixed(2),
      aveListenRadio: aveListenRadio.toFixed(2)
    });
  });
});

module.exports = router;
