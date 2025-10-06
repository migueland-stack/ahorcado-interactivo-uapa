const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./auth');
const scoresRoutes = require('./scores');
const { initializeDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS para desarrollo
app.use(cors());

app.use(bodyParser.json());

// SERVIR ARCHIVOS ESTÁTICOS CORREGIDO
// Servir la carpeta frontend completa
app.use(express.static(path.join(__dirname, 'frontend')));

// Servir rutas específicas por si acaso
app.use('/css', express.static(path.join(__dirname, 'frontend/css')));
app.use('/js', express.static(path.join(__dirname, 'frontend/js')));
app.use('/images', express.static(path.join(__dirname, 'frontend/images')));
app.use('/sounds', express.static(path.join(__dirname, 'frontend/sounds')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoresRoutes);

// Ruta para verificar archivos estáticos
app.get('/debug-files', (req, res) => {
  const fs = require('fs');

  const files = {
    css: fs.existsSync(path.join(__dirname, 'frontend/css/style.css')),
    js: fs.existsSync(path.join(__dirname, 'frontend/js/script.js')),
    images: fs.existsSync(path.join(__dirname, 'frontend/images/logo.webp')),
    html: fs.existsSync(path.join(__dirname, 'frontend/index.html'))
  };

  res.json({
    message: 'Verificación de archivos',
    basePath: path.join(__dirname, 'frontend'),
    files: files,
    routes: {
      css: '/css/style.css',
      js: '/js/script.js',
      images: '/images/logo.webp'
    }
  });
});

// Ruta de prueba del API
app.get('/api/test', (req, res) => {
  res.json({
    message: '✅ Backend funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Ruta principal - servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Catch-all para SPA - debe ir después de las rutas API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Inicializar servidor
async function startServer() {
  try {
    // Inicializar base de datos
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`\n✅ Servidor backend corriendo en http://localhost:${PORT}`);
      console.log(`📁 Frontend servido desde: ${path.join(__dirname, 'frontend')}`);
      console.log(`🔍 Debug: http://localhost:${PORT}/debug-files`);
      console.log(`🧪 API Test: http://localhost:${PORT}/api/test`);
      console.log(`🎮 Juego: http://localhost:${PORT}/`);
      console.log(`\n📂 Rutas de archivos:`);
      console.log(`   CSS: http://localhost:${PORT}/css/style.css`);
      console.log(`   JS: http://localhost:${PORT}/js/script.js`);
      console.log(`   Img: http://localhost:${PORT}/images/logo.webp\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();