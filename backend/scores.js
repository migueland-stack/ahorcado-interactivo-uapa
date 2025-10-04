const express = require('express');
const { db } = require('./database');

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
        console.error('❌ Error en leaderboard:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      console.log('🏆 Leaderboard enviado:', rows.length, 'usuarios');
      res.json(rows);
    }
  );
});

// Actualizar puntuación de usuario - CORREGIDO
router.post('/update', (req, res) => {
  const { userId, score } = req.body;

  console.log('📊 Recibiendo actualización de score:', { userId, score });

  if (!userId || score === undefined) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  // Obtener el registro actual del usuario
  db.get(
    'SELECT * FROM scores WHERE user_id = ?',
    [userId],
    (err, row) => {
      if (err) {
        console.error('❌ Error buscando usuario:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      console.log('📋 Registro encontrado:', row);

      if (!row) {
        // Si no existe registro, crear uno nuevo
        console.log('➕ Creando nuevo registro para usuario:', userId);
        db.run(
          'INSERT INTO scores (user_id, games_won, best_score, score) VALUES (?, 1, ?, ?)',
          [userId, score, score],
          function (err) {
            if (err) {
              console.error('❌ Error creando registro:', err);
              return res.status(500).json({ error: 'Error al crear registro' });
            }
            console.log('✅ Nuevo registro creado');
            res.json({ gamesWon: 1, bestScore: score });
          }
        );
      } else {
        // Si existe, actualizar
        const newGamesWon = row.games_won + 1;
        const newBestScore = Math.max(row.best_score, score);

        console.log(`🔄 Actualizando: games_won ${row.games_won} -> ${newGamesWon}, best_score ${row.best_score} -> ${newBestScore}`);

        db.run(
          'UPDATE scores SET games_won = ?, best_score = ?, score = ? WHERE user_id = ?', // QUITÉ updated_at
          [newGamesWon, newBestScore, score, userId],
          function (err) {
            if (err) {
              console.error('❌ Error actualizando:', err);
              return res.status(500).json({ error: 'Error al actualizar' });
            }
            console.log('✅ Puntuación actualizada');
            res.json({ gamesWon: newGamesWon, bestScore: newBestScore });
          }
        );
      }
    }
  );
});

// Ruta de debug para ver todos los scores
router.get('/debug', (req, res) => {
  db.all('SELECT * FROM scores', [], (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    console.log('🔍 Debug scores:', rows);
    res.json(rows);
  });
});

module.exports = router;