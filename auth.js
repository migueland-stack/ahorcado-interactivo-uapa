const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('./database');  // Solo importamos db

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_desarrollo';

// Login - CON CALLBACKS CONSISTENTES
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Recibiendo login para:', email);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  // Buscar usuario - usando db directo con callback
  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, user) => {
      if (err) {
        console.error('❌ Error en consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      console.log('👤 Resultado de búsqueda:', user ? 'Usuario encontrado' : 'Usuario no encontrado');

      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      // Verificar contraseña
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error('❌ Error comparando contraseña:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        console.log('🔑 Resultado de comparación:', match);

        if (!match) {
          return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Crear token
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        console.log('✅ Token generado para usuario:', user.id);

        // Obtener puntuación
        db.get(
          'SELECT games_won, best_score FROM scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
          [user.id],
          (err, score) => {
            if (err) {
              console.error('⚠️ Error obteniendo puntuación:', err);
              // Continuamos sin puntuación
            }

            console.log('📊 Puntuación obtenida:', score);

            res.json({
              message: 'Login exitoso',
              token: token,
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
      });
    }
  );
});

// Registro - CON CALLBACKS CONSISTENTES
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  console.log('📝 Recibiendo registro:', { username, email });

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  // Verificar si existe
  db.get(
    'SELECT id FROM users WHERE username = ? OR email = ?',
    [username, email],
    (err, existingUser) => {
      if (err) {
        console.error('❌ Error verificando usuario:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      if (existingUser) {
        return res.status(400).json({ error: 'El usuario o email ya existe' });
      }

      // Hash password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('❌ Error hasheando:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        // Insertar usuario
        db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword],
          function (err) {
            if (err) {
              console.error('❌ Error insertando usuario:', err);
              return res.status(500).json({ error: 'Error al crear usuario' });
            }

            const userId = this.lastID;
            console.log('✅ Usuario creado ID:', userId);

            // Crear token
            const token = jwt.sign(
              { userId: userId, username: username },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            // Crear puntuación
            db.run(
              'INSERT INTO scores (user_id, games_won, best_score) VALUES (?, 0, 0)',
              [userId],
              (err) => {
                if (err) {
                  console.error('⚠️ Error creando puntuación:', err);
                }

                console.log('🎯 Registro completado para:', username);
                res.status(201).json({
                  message: 'Usuario registrado exitosamente',
                  token: token,
                  user: {
                    id: userId,
                    username: username,
                    email: email,
                    gamesWon: 0,
                    bestScore: 0
                  }
                });
              }
            );
          }
        );
      });
    }
  );
});

// Ruta para ver usuarios
router.get('/users', (req, res) => {
  db.all('SELECT id, username, email FROM users', [], (err, rows) => {
    if (err) {
      console.error('❌ Error obteniendo usuarios:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    console.log('👥 Usuarios en BD:', rows);
    res.json(rows);
  });
});

module.exports = router;