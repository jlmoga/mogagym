const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Servir fitxers estàtics des de l'arrel
app.use(express.static(path.join(__dirname, './')));

// Middleware de fallback: si cap ruta coincideix (i no és un fitxer estàtic), servim index.html
// Això evita problemes de sintaxi amb asteriscs en versions noves d'Express
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Escoltar en 0.0.0.0 per permetre l'accés des de la xarxa local (Android)
app.listen(PORT, '0.0.0.0', () => {
    console.log('\n=======================================');
    console.log('🚀 KORA 360 - SERVIDOR ACTIU');
    console.log(`🏠 Accés local: http://localhost:${PORT}`);
    console.log('📱 Accés des d\'Android: Busca la teva IP local');
    console.log('=======================================\n');
});
