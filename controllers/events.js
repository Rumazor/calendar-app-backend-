const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    events: events,
  });
};
const createEvent = async (req, res = response) => {
  // verify if i got the event

  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventDB = await event.save();
    res.status(201).json({
      ok: true,
      event: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "talk to the admin",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({
        ok: false,
        msg: " event doesnt exist by that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You have no authorization to do update that event ",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "talk to the admin",
    });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({
        ok: false,
        msg: " event doesnt exist by that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You have no authorization to delete that event",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "talk to the admin",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
