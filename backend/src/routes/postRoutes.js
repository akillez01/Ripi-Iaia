const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Criar post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar post.' });
  }
});

// Listar todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar posts.' });
  }
});

// Buscar post por ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar post.' });
  }
});

// Atualizar post
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar post.' });
  }
});

// Deletar post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar post.' });
  }
});

module.exports = router;