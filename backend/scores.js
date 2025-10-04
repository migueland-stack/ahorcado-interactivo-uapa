const express = require('express');
const db = require('./database');

const router = express.Router();

// Obtener top 5 puntuaciones
router.get('/leaderboard', (req, res) => {
  db.all(
    `SELECT users.username, scores.best_score 
     FROM scores 
     INNER JOIN users ON scores.user_id = users.id 
     ORDER BY scores.best_score DESC 
     LIMIT 5`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(rows);
    }
  );
});

// Actualizar puntuación de usuario
router.put('/update', (req, res) => {
  const { userId, score } = req.body;

  if (!userId || score === undefined) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  // Obtener el registro actual del usuario
  db.get(
    'SELECT * FROM scores WHERE user_id = ?',
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const newGamesWon = row.games_won + 1;
      const newBestScore = Math.max(row.best_score, score);

      db.run(
        'UPDATE scores SET games_won = ?, best_score = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [newGamesWon, newBestScore, userId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error al actualizar' });
          }
          res.json({ gamesWon: newGamesWon, bestScore: newBestScore });
        }
      );
    }
  );
});

module.exports = router;