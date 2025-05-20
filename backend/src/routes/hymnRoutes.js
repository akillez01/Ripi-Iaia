const express = require('express');
const Hymn = require('../models/Hymn');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const hymn = await Hymn.create(req.body);
    res.status(201).json(hymn);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar hino.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const hymns = await Hymn.find();
    res.json(hymns);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar hinos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hymn = await Hymn.findById(req.params.id);
    if (!hymn) return res.status(404).json({ message: 'Hino não encontrado.' });
    res.json(hymn);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar hino.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const hymn = await Hymn.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hymn) return res.status(404).json({ message: 'Hino não encontrado.' });
    res.json(hymn);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar hino.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hymn = await Hymn.findByIdAndDelete(req.params.id);
    if (!hymn) return res.status(404).json({ message: 'Hino não encontrado.' });
    res.json({ message: 'Hino deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar hino.' });
  }
});

module.exports = router;