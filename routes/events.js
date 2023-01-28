// get Events
// EVENT ROUTES

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  getEvents,
  updateEvent,
  createEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJwt } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");

// validar todas las rutas con un middleware
router.use(validateJwt);

//get event
router.get(
  "/",

  getEvents
);
//create event
router.post(
  "/",
  [
    check("title", "title must be provided").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
  ],
  validateFields,
  createEvent
);
//updateEvent
router.put(
  "/:id",
  [
    check("title", "title must be provided").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
  ],
  validateFields,
  updateEvent
);
//deleteEvent
router.delete("/:id", deleteEvent);

module.exports = router;
