# Bewertungsapp – Julia Bleyer

Klasse: 4aAPC

## Setup

Backend:

```
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Frontend:

```
cd frontend
npm install
ionic serve
```

Eigene `config/config.json` lokal aus `config/config.example.json` ableiten, nicht committen.

## Einheit 1: Installation

- [x] Screenshot Toolchain (`node --version`, `ionic --version`, laufendes DB-Tool bzw. Docker-Container)
- [x] Antworten auf die vier Verständnisfragen: `docs/screenshots/einheit1-fragen.md`

## Einheit 2: Datenmodell anlegen

- [x] Ausgefüllte Planungsvorlage: `docs/diagramm/planungsvorlage.html`
- [x] Verwendete `model:generate`-Befehle dokumentiert
- [x] Screenshot der angelegten Tabellen im DB-Tool: `docs/screenshots/`

## Einheit 3: Assoziationen und weitere Modelle

- [x] Alle Modelle (Team, Member, Project, Criterion, Juror, Evaluation) mit ausgefüllten `associate`-Methoden
- [x] Unique-Constraint auf (projectId, criterionId, jurorId) bei Evaluation
- [x] Mindestens ein Seeder mit Testdaten

## Einheit 4: Backend-Routen

- [x] CRUD für Team und Project
- [x] POST-Route für Evaluation inkl. Validierung
- [x] Aggregations-Route: Durchschnitt der Punktzahl pro Projekt und Kriterium
- [x] Kurze Endpunkt-Dokumentation (Methode, Pfad, Body, Rückgabe) unten in diesem README oder in `docs/`

## Einheit 5: Postman-Test

- [ ] Collection: `docs/postman/bewertungsapp.postman_collection.json`
- [ ] Environment: `docs/postman/bewertungsapp.postman_environment.json`
- [ ] Mindestens zwei dokumentierte Negativtests
- [ ] Testbericht: `docs/postman/testbericht.md`

## Einheit 6: IONIC-Frontend

- [ ] Projektliste mit Team-Zuordnung
- [ ] Detailansicht eines Projekts mit bisherigen Bewertungen
- [ ] API-Service vollständig an eigenes Backend angebunden

## Einheit 7: Login und Endabgabe

- [ ] Bewertungsformular (Projekt, Kriterium, Punktzahl, Kommentar) mit Validierung
- [ ] Auswertungsseite mit Durchschnittswerten
- [ ] Juror-Login, Token-Storage mit `@capacitor/preferences`
- [ ] Nachweis: geschützte Route liefert ohne Token 401, mit gültigem Token die erwartete Antwort

## Endpunkt-Dokumentation (laufend ergänzen)

| Methode | Pfad | Body | Rückgabe |
| GET | /teams | – | Liste aller Teams |
| GET | /teams | – | Liste aller Teams |
| GET | /teams/:id | – | Team inkl. Members und Projects, 404 wenn nicht gefunden |
| POST| /teams | { name, klasse } | Neues Team (201), 400 bei fehlenden Feldern |
| PUT | /teams/:id | { name?, klasse? } | Geändertes Team, 404 wenn nicht gefunde |
| DELETE | /teams/:id | – | Kein Inhalt (204), 404 wenn nicht gefunden, 409 bei verknüpften Datensätzen |
| GET | /projects | – | Liste aller Projekte inkl. Team |
| GET | /projects/:id | – | Projekt inkl. Team, 404 wenn nicht gefunden |
| POST | /projects | { teamId, titel, praesentiertAm, beschreibung? } | Neues Projekt (201), 400 bei fehlenden Feldern, 404 wenn Team nicht existiert |
| PUT | /projects/:id | { teamId?, titel?, beschreibung?, praesentiertAm? } | Geändertes Projekt, 404 wenn Projekt oder Team nicht existiert |
| DELETE | /projects/:id | – | Kein Inhalt (204), 404 wenn nicht gefunden, 409 bei vorhandenen Bewertungen |
| POST | /evaluations | { projectId, criterionId, jurorId, score, comment? } | Neue Bewertung (201), 400 bei fehlenden Feldern oder ungültigem score, 404 wenn Projekt, Kriterium oder Juror nicht existiert, 409 bei doppelter Bewertung |
| GET | /evaluations/project/:projectId/durchschnitt | – | Durchschnittliche Punktzahl pro Kriterium (criterionId, kriterium, maxScore, durchschnitt, anzahlBewertungen), 404 wenn Projekt nicht existiert |

## Bekannte Einschränkungen

<hier eintragen, was noch fehlt oder bekannt fehlerhaft ist>
