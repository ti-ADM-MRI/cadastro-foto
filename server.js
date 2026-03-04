const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/salvar-imagem', (req, res) => {
  const { imagemBase64, nome } = req.body;
  const nomeArquivo = nome ? nome.toLowerCase().replace(/\s+/g, '-') : 'img-cad';
  const base64Data = imagemBase64.replace(/^data:image\/png;base64,/, '');
  const caminho = path.join(__dirname, 'public', `${nomeArquivo}.png`);

  fs.writeFile(caminho, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Erro ao salvar imagem:', err);
      return res.status(500).send('Erro ao salvar imagem');
    }
    res.send('Imagem salva com sucesso!');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
