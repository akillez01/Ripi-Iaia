require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const audioRoutes = require('./routes/audioRoutes');
const videoRoutes = require('./routes/videoRoutes');
const hymnRoutes = require('./routes/hymnRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/hymns', hymnRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;

// Remova useUnifiedTopology (não é mais necessário)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));