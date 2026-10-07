const express = require("express");
const router = express.Router();
const { Team, Member, Project } = require("../models");

// alle Teams
router.get("/", async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
});

// ein Team inkl. Mitglieder und Projekte
router.get("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id, {
    include: [Member, Project],
  });
  if (!team) return res.status(404).json({ error: "Team nicht gefunden" });
  res.json(team);
});

//Ein Team mit Projekte
router.get("/:id/projects", async (req, res) => {
  const team = await Team.findByPk(req.params.id, { include: Project });
  if (!team) return res.status(404).json({ error: "Team nicht gefunden" });
  res.json(team.Projects);
});

// Team anlegen
router.post("/", async (req, res) => {
  const { name, klasse } = req.body;
  if (!name || !klasse) {
    return res
      .status(400)
      .json({ error: "name und klasse sind Pflichtfelder" });
  }
  const team = await Team.create({ name, klasse });
  res.status(201).json(team);
});

// Team ändern
router.put("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: "Team nicht gefunden" });
  const { name, klasse } = req.body;
  await team.update({ name, klasse });
  res.json(team);
});

// Team löschen
router.delete("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: "Team nicht gefunden" });
  await team.destroy();
  res.status(204).send();
});

module.exports = router;
