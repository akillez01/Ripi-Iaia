const express = require('express');
const Audio = require('../models/Audio');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const audio = await Audio.create(req.body);
    res.status(201).json(audio);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar áudio.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar áudios.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) return res.status(404).json({ message: 'Áudio não encontrado.' });
    res.json(audio);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar áudio.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const audio = await Audio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!audio) return res.status(404).json({ message: 'Áudio não encontrado.' });
    res.json(audio);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar áudio.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const audio = await Audio.findByIdAndDelete(req.params.id);
    if (!audio) return res.status(404).json({ message: 'Áudio não encontrado.' });
    res.json({ message: 'Áudio deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar áudio.' });
  }
});

module.exports = router;