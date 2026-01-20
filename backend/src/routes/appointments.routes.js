const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { service, date, notes } = req.body;

    const appointment = new Appointment({
      user: req.user.id,
      service,
      date,
      notes
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error creando turno" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id
    }).sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo turnos" });
  }
});

router.patch("/:id/cancel", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Turno cancelado" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelando turno" });
  }
});
