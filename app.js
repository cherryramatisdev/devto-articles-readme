"use strict";

const express = require('express')
const mustacheExpress = require('mustache-express');

const app = express()

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get("/", async (_req, res) =>  {
  res.render('gerador');
});

app.get("/stats", async (_req, res) => {
  res.setHeader("content-type", "image/svg+xml; charset=utf-8");
  res.setHeader("cache-control", "no-cache, max-age=0");
  const user = _req.query.usuario;

  try {
    const response = await fetch(`https://dev.to/api/articles?username=${user}`)
    const data = await response.json()
    res.render('articles', { boxSize: 800, articles: data, total: data.length, user })
  }catch (error) {
    console.error(error);
    res.render('gerador', { error: 'Ocorreu um erro ao buscar os dados. Tente novamente.' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));
