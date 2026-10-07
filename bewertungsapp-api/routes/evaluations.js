const express = require("express");
const router = express.Router();
const db = require("../models");
const { Evaluation, Project, Criterion, Juror } = db;

// Bewertung abgeben
router.post("/", async (req, res) => {
  const { projectId, criterionId, jurorId, score, comment } = req.body;

  // 1. Pflichtfelder
  if (!projectId || !criterionId || !jurorId || score === undefined) {
    return res.status(400).json({
      error: "projectId, criterionId, jurorId und score sind Pflichtfelder",
    });
  }
  //Kann nie schaden
  if (!Number.isInteger(score)) {
    return res.status(400).json({ error: "score muss eine ganze Zahl sein" });
  }

  //Wenn Datensätze nicht gefunden werden
  const criterion = await Criterion.findByPk(criterionId);
  if (!criterion)
    return res.status(404).json({ error: "Kriterium nicht gefunden" });
  const project = await Project.findByPk(projectId);
  if (!project)
    return res.status(404).json({ error: "Projekt nicht gefunden" });
  const juror = await Juror.findByPk(jurorId);
  if (!juror) return res.status(404).json({ error: "Juror nicht gefunden" });

  //Punktezahl muss im erlaubten Bereich sein
  if (score < 0 || score > criterion.maxScore) {
    return res.status(400).json({
      error: `score muss zwischen 0 und ${criterion.maxScore} liegen`,
    });
  }

  //Duplikate
  const doppelt = await Evaluation.findOne({
    where: { projectId, criterionId, jurorId },
  });
  if (doppelt) {
    return res.status(409).json({
      error:
        "Dieser Juror hat dieses Kriterium für dieses Projekt schon bewertet",
    });
  }

  const evaluation = await Evaluation.create({
    projectId,
    criterionId,
    jurorId,
    score,
    comment,
  });
  res.status(201).json(evaluation);
});

// Bewertung ändern (nur score und comment)
router.put("/:id", async (req, res) => {
  const evaluation = await Evaluation.findByPk(req.params.id);
  if (!evaluation)
    return res.status(404).json({ error: "Bewertung nicht gefunden" });
  const { score, comment } = req.body;
  await evaluation.update({ score, comment });
  res.json(evaluation);
});

// alle Bewertungen eines Jurors
router.get("/juror/:jurorId", async (req, res) => {
  const evaluations = await Evaluation.findAll({
    where: { jurorId: req.params.jurorId },
    include: [Project, Criterion],
  });
  res.json(evaluations);
});

// alle Bewertungen eines Projekts
router.get("/project/:projectId", async (req, res) => {
  const evaluations = await Evaluation.findAll({
    where: { projectId: req.params.projectId },
    include: [Criterion, Juror],
  });
  res.json(evaluations);
});

// Durchschnittspunktzahl eines Projekts, gruppiert nach Kriterium
router.get("/project/:projectId/durchschnitt", async (req, res) => {
  const project = await Project.findByPk(req.params.projectId);
  if (!project)
    return res.status(404).json({ error: "Projekt nicht gefunden" });

  const zeilen = await Evaluation.findAll({
    where: { projectId: req.params.projectId },
    attributes: [
      "criterionId",
      [fn("AVG", col("score")), "durchschnitt"],
      [fn("COUNT", col("Evaluation.id")), "anzahl"],
    ],
    include: [{ model: Criterion, attributes: ["id", "name", "maxScore"] }],
    group: ["Evaluation.criterionId", "Criterion.id"],
  });

  res.json(
    zeilen.map((z) => ({
      criterionId: z.criterionId,
      kriterium: z.Criterion.name,
      maxScore: z.Criterion.maxScore,
      durchschnitt: Number(z.get("durchschnitt")),
      anzahlBewertungen: Number(z.get("anzahl")),
    })),
  );
});

module.exports = router;
