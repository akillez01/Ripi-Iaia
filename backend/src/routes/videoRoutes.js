const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar vídeo.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vídeos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Vídeo não encontrado.' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vídeo.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Vídeo não encontrado.' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar vídeo.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Vídeo não encontrado.' });
    res.json({ message: 'Vídeo deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar vídeo.' });
  }
});

module.exports = router;