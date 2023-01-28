const { response } = require("express");

const getEvents = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "obtener eventos",
  });
};
const createEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "crear eventos",
  });
};
const updateEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "actualizar eventos",
  });
};
const deleteEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "borrar eventos",
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
