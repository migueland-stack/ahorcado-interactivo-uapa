const express = require('express');
const { db } = require('./database');

const router = express.Router();

// Obtener top 5 puntuaciones
router.get('/leaderboard', (req, res) => {
  db.all(
    `SELECT users.username, scores.best_score, scores.games_won, scores.max_streak
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

// Actualizar estadísticas de usuario - CORREGIDO CON VALIDACIÓN DE SCORE
router.post('/update', (req, res) => {
  const { userId, score, gameResult } = req.body;

  console.log('📊 Recibiendo actualización de stats:', { userId, score, gameResult });

  if (!userId || !gameResult) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Asegurar que score siempre tenga un valor numérico
  const safeScore = (score !== undefined && score !== null) ? Number(score) : 0;

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

      // Función helper para manejar valores undefined
      const safeValue = (value, defaultValue = 0) => {
        return value !== undefined && value !== null ? value : defaultValue;
      };

      if (!row) {
        // Si no existe registro, crear uno nuevo
        console.log('➕ Creando nuevo registro para usuario:', userId);

        const initialStats = {
          games_won: gameResult === 'win' ? 1 : 0,
          games_lost: gameResult === 'lose' ? 1 : 0,
          current_streak: gameResult === 'win' ? 1 : 0,
          max_streak: gameResult === 'win' ? 1 : 0,
          best_score: gameResult === 'win' ? safeScore : 0
        };

        db.run(
          'INSERT INTO scores (user_id, games_won, games_lost, current_streak, max_streak, best_score, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, initialStats.games_won, initialStats.games_lost, initialStats.current_streak, initialStats.max_streak, initialStats.best_score, safeScore],
          function (err) {
            if (err) {
              console.error('❌ Error creando registro:', err);
              return res.status(500).json({ error: 'Error al crear registro' });
            }
            console.log('✅ Nuevo registro creado');
            res.json({
              gamesWon: initialStats.games_won,
              gamesLost: initialStats.games_lost,
              currentStreak: initialStats.current_streak,
              maxStreak: initialStats.max_streak,
              bestScore: initialStats.best_score
            });
          }
        );
      } else {
        // Si existe, actualizar según el resultado del juego - VALORES SEGUROS
        let currentGamesWon = safeValue(row.games_won);
        let currentGamesLost = safeValue(row.games_lost);
        let currentStreak = safeValue(row.current_streak);
        let currentMaxStreak = safeValue(row.max_streak);
        let currentBestScore = safeValue(row.best_score);

        let newGamesWon = currentGamesWon;
        let newGamesLost = currentGamesLost;
        let newCurrentStreak = currentStreak;
        let newMaxStreak = currentMaxStreak;
        let newBestScore = currentBestScore;

        if (gameResult === 'win') {
          // Victoria: incrementar victorias y racha actual
          newGamesWon += 1;
          newCurrentStreak += 1;
          // Actualizar racha máxima si la actual es mayor
          if (newCurrentStreak > newMaxStreak) {
            newMaxStreak = newCurrentStreak;
          }
          // Actualizar mejor puntuación si es mayor
          if (safeScore > newBestScore) {
            newBestScore = safeScore;
          }
        } else {
          // Derrota: incrementar derrotas y reiniciar racha
          newGamesLost += 1;
          newCurrentStreak = 0;
        }

        console.log(`🔄 Actualizando estadísticas:
          games_won: ${currentGamesWon} -> ${newGamesWon}
          games_lost: ${currentGamesLost} -> ${newGamesLost}
          current_streak: ${currentStreak} -> ${newCurrentStreak}
          max_streak: ${currentMaxStreak} -> ${newMaxStreak}
          best_score: ${currentBestScore} -> ${newBestScore}
          score: ${safeScore}`);

        db.run(
          'UPDATE scores SET games_won = ?, games_lost = ?, current_streak = ?, max_streak = ?, best_score = ?, score = ? WHERE user_id = ?',
          [newGamesWon, newGamesLost, newCurrentStreak, newMaxStreak, newBestScore, safeScore, userId],
          function (err) {
            if (err) {
              console.error('❌ Error actualizando:', err);
              return res.status(500).json({ error: 'Error al actualizar' });
            }
            console.log('✅ Estadísticas actualizadas');
            res.json({
              gamesWon: newGamesWon,
              gamesLost: newGamesLost,
              currentStreak: newCurrentStreak,
              maxStreak: newMaxStreak,
              bestScore: newBestScore
            });
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