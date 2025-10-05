const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ahorcado.db');
const db = new sqlite3.Database(dbPath);

// Inicializar tablas
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla users:', err);
        reject(err);
        return;
      }

      // Tabla de puntuaciones - ACTUALIZADA CON NUEVOS CAMPOS
      db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        score INTEGER DEFAULT 0 NOT NULL,
        games_won INTEGER DEFAULT 0,
        games_lost INTEGER DEFAULT 0,
        current_streak INTEGER DEFAULT 0,
        max_streak INTEGER DEFAULT 0,
        best_score INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`, (err) => {
        if (err) {
          console.error('Error creando tabla scores:', err);
          reject(err);
          return;
        }

        console.log('Base de datos SQLite inicializada correctamente');
        resolve();
      });
    });
  });
}

// Funciones de base de datos para SQLite (sin cambios)
const dbMethods = {
  get: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  all: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  run: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) reject(err);
        else resolve({ insertId: this.lastID, changes: this.changes });
      });
    });
  }
};

module.exports = { db, initializeDatabase, ...dbMethods };