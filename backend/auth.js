const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Usuario o email ya existe' });
          }
          return res.status(500).json({ error: 'Error en la base de datos' });
        }

        const userId = this.lastID;

        // Crear registro inicial en scores
        db.run(
          'INSERT INTO scores (user_id, games_won, best_score) VALUES (?, 0, 0)',
          [userId],
          (err) => {
            if (err) {
              return res.status(500).json({ error: 'Error al crear puntuación' });
            }
            res.status(201).json({ message: 'Usuario registrado', userId });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      // Obtener puntuaciones
      db.get(
        'SELECT * FROM scores WHERE user_id = ?',
        [user.id],
        (err, score) => {
          if (err) {
            return res.status(500).json({ error: 'Error al obtener puntuación' });
          }

          res.json({
            message: 'Login exitoso',
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              gamesWon: score ? score.games_won : 0,
              bestScore: score ? score.best_score : 0
            }
          });
        }
      );
    }
  );
});

module.exports = router;