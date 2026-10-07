const express = require("express");
const router = express.Router();
const db = require("../models");
const { fn, col } = require("sequelize");
const { Project, Team, Evaluation, Criterion } = db;

// alle Projekte inkl. Team
router.get("/", async (req, res) => {
  const projects = await Project.findAll({ include: Team });
  res.json(projects);
});

// ein Projekt per ID
router.get("/:id", async (req, res) => {
  const project = await Project.findByPk(req.params.id, { include: Team });
  if (!project)
    return res.status(404).json({ error: "Projekt nicht gefunden" });
  res.json(project);
});

//Get Durschschnitt
router.get("/:id/statistik", async (req, res) => {
  const ergebnis = await Evaluation.findOne({
    where: { projectId: req.params.id },
    attributes: [
      [fn("AVG", col("score")), "durchschnittsscore"],
      [fn("COUNT", col("id")), "anzahlBewertungen"],
    ],
  });
  res.json(ergebnis);
});

// neues Projekt anlegen
router.post("/", async (req, res) => {
  const { titel, beschreibung, praesentiertAm, teamId } = req.body;
  if (!titel || !teamId) {
    return res
      .status(400)
      .json({ error: "titel und teamId sind Pflichtfelder" });
  }
  const project = await Project.create({
    titel,
    beschreibung,
    praesentiertAm,
    teamId,
  });
  res.status(201).json(project);
});

// Projekt aktualisieren
router.put("/:id", async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project)
    return res.status(404).json({ error: "Projekt nicht gefunden" });
  await project.update(req.body);
  res.json(project);
});

// Projekt löschen
router.delete("/:id", async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project)
    return res.status(404).json({ error: "Projekt nicht gefunden" });
  await project.destroy();
  res.status(204).send();
});

module.exports = router;
