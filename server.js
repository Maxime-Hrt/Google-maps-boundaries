const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const JSON_FILE_PATH = path.join(__dirname, 'locations.json');
const HTML_FILE_PATH = path.join(__dirname, 'boundaries.html');

const server = http.createServer((req, res) => {
  // Gestionnaire de routage pour le fichier JSON
  if (req.url === '/locations.json') {
    fs.readFile(JSON_FILE_PATH, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } 
  // Gestionnaire de routage pour le fichier HTML
  else if (req.url === '/boundaries.html') {
    fs.readFile(HTML_FILE_PATH, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
      } else {
        // Remplacer les valeurs directement dans le HTML
        let html = data.toString();
        html = html.replace('${process.env.API_KEY}', process.env.API_KEY);
        html = html.replace('${process.env.MAP_ID}', process.env.MAP_ID);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  } 
  // Gestionnaire de routage pour les environnements
  else if (req.url === '/env.js') {
    fs.readFile(ENV_FILE_PATH, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}/boundaries.html`);
});
