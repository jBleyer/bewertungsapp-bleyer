const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));

//Routes here
const projectsRouter = require("./routes/projects");
const teamsRouter = require("./routes/teams");
const evaluationsRouter = require("./routes/evaluations");

app.use("/projects", projectsRouter);
app.use("/teams", teamsRouter);
app.use("/evaluations", evaluationsRouter);

// Der HTTP-Statuscode 409 Konflikt Client-Fehlerantwort zeigt einen Anfragekonflikt mit dem aktuellen Status der Zielressource an.
// zentraler Fehler-Handler, nach allen Routen
app.use((err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ error: err.errors.map((e) => e.message).join(", ") });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "Eintrag existiert bereits" });
  }
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      error: "Aktion nicht möglich: es existieren noch verknüpfte Datensätze",
    });
  }
  console.error(err);
  res.status(500).json({ error: "Interner Serverfehler" });
});
