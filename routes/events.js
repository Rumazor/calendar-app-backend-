// get Events

const { Router } = require("express");
const router = Router();

const {
  getEvents,
  updateEvent,
  createEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJwt } = require("../middlewares/validate-jwt");

//get event
router.get("/", validateJwt, getEvents);
//create event
router.post("/", validateJwt, createEvent);
//updateEvent
router.put("/:id", validateJwt, updateEvent);
//deleteEvent
router.delete("/:id", validateJwt, deleteEvent);

module.exports = router;
