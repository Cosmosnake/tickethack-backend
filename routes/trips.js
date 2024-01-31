var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");

/* GET users listing. */
router.post("/", async (req, res) => {
  const { departure, arrival, date } = req.body;
  if (!departure || !arrival || !date) {
    return res.json({ errorMessage: "Form submission invalid." });
  }
  const transformedDate = new Date(date);

  // Set the time to midnight (00:00:00) to consider only the date part
  transformedDate.setHours(0, 0, 0, 0);

  console.log(departure, arrival, transformedDate);

  // Search for trips where the date is greater than or equal to the provided date
  // and less than the next day
  const nextDay = new Date(transformedDate);
  nextDay.setDate(transformedDate.getDate() + 1);

  let trips;
  try {
    trips = await Trip.find({
      departure,
      arrival,
      date: {
        $gte: transformedDate,
        $lt: nextDay,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong on the server. We are doing our best to fix the problem",
    });
  }

  if (!trips || trips.length === 0) {
    return res.status(404).json({ result: false, trips: [] });
  }

  return res.json({ result: true, trips });
});

router.post("/bookings", async (req, res) => {
  const { destination, time, price } = req.body;
  if (!destination || !time || !price) {
    return res.json({ errorMessage: "Something went wrong." });
  }
  const transformedDate = new Date(date);

  // Set the time to midnight (00:00:00) to consider only the date part
  transformedDate.setHours(0, 0, 0, 0);

  console.log(departure, arrival, transformedDate);

  // Search for trips where the date is greater than or equal to the provided date
  // and less than the next day
  const nextDay = new Date(transformedDate);
  nextDay.setDate(transformedDate.getDate() + 1);

  let trips;
  try {
    trips = await Trip.find({
      departure,
      arrival,
      date: {
        $gte: transformedDate,
        $lt: nextDay,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong on the server. We are doing our best to fix the problem",
    });
  }

  if (!trips || trips.length === 0) {
    return res.status(404).json({ result: false, trips: [] });
  }

  return res.json({ result: true, trips });
});

module.exports = router;
