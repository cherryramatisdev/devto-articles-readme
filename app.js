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
  const usuario = _req.query.usuario;
  const nome = _req.query.nome;
  
  try {
    console.log('oiiiiiiiii')
    const response = await fetch(`https://dev.to/api/articles?username=${usuario}`)
    const data = await response.json()
    console.log(data)
    res.render('articles', { articles: data, total: data.length, nome })
  }catch (error) {
    console.error(error);
    res.render('gerador', { error: 'Ocorreu um erro ao buscar os dados.' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));
