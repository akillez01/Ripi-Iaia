const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar livro.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livros.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livro.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Livro não encontrado.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar livro.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado.' });
    res.json({ message: 'Livro deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar livro.' });
  }
});

module.exports = router;