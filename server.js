const express = require("express");
const path = require("path");
const data = require("./data");

const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Home page: show list
app.get("/", (req, res) => {
  let html = `
    <html>
      <head>
        <title>Persona 4 List</title>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
      </head>
      <body>
        <main class="container">
          <h1>Persona 4 Characters</h1>
          <ul>
  `;
  data.forEach(item => {
    html += `
      <li>
        <img src="${item.image}" alt="${item.name}" style="height:50px">
        <strong>${item.name}</strong> — ${item.type}, Weakness: ${item.weakness}
        <a href="/characters/${item.id}">View Details</a>
      </li>
    `;
  });
  html += `
          </ul>
        </main>
      </body>
    </html>
  `;
  res.send(html);
});

// Detail page
app.get("/characters/:id", (req, res) => {
  const character = data.find(c => c.id === req.params.id);
  if (!character) {
    return res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  }

  let html = `
    <html>
      <head>
        <title>${character.name}</title>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
      </head>
      <body>
        <main class="container">
          <h1>${character.name}</h1>
          <img src="${character.image}" alt="${character.name}" style="height:200px">
          <p><strong>Type:</strong> ${character.type}</p>
          <p><strong>Weakness:</strong> ${character.weakness}</p>
          <p><strong>Attacks:</strong> ${character.attacks.join(", ")}</p>
          <a href="/">Back to List</a>
        </main>
      </body>
    </html>
  `;
  res.send(html);
});

// 404 page for everything else
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
