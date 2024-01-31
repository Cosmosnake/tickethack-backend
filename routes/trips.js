var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");

/* GET users listing. */
router.post("/", async (req, res) => {
  const { departure, arrival, date } = req.body;
  const transformedDate = new Date(date);

  // Set the time to midnight (00:00:00) to consider only the date part
  transformedDate.setHours(0, 0, 0, 0);

  console.log(departure, arrival, transformedDate);

  // Search for trips where the date is greater than or equal to the provided date
  // and less than the next day
  const nextDay = new Date(transformedDate);
  nextDay.setDate(transformedDate.getDate() + 1);

  const trips = await Trip.find({
    departure,
    arrival,
    date: {
      $gte: transformedDate,
      $lt: nextDay,
    },
  });

  res.json({ result: true, trips });
});

module.exports = router;
