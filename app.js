"use strict";

const express = require('express')
const mustacheExpress = require('mustache-express');

const app = express()

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/api/articles', async function(_req, res) {
  res.setHeader("content-type", "image/svg+xml; charset=utf-8");
  res.setHeader("cache-control", "no-cache, max-age=0");
  const response = await fetch('https://dev.to/api/articles?username=cherryramatis')
  const data = await response.json()

  res.render('articles', { articles: data })
});

// Server stuff
app.get("/api/", (request, response) => {
  response.status(200).json({ message: "Server's up" });
});

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));
