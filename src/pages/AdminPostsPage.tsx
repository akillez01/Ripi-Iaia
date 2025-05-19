import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Post = {
  _id?: string;
  title: string;
  content: string;
  author?: string;
};

const API_URL = 'http://localhost:5000/api/posts';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Post>({ title: '', content: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL).then(res => setPosts(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: '', content: '' });
    setEditingId(null);
    const res = await axios.get(API_URL);
    setPosts(res.data);
  };

  const handleEdit = (post: Post) => {
    setForm({ title: post.title, content: post.content });
    setEditingId(post._id!);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Posts</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border px-2 py-1"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Conteúdo"
          className="w-full border px-2 py-1"
          required
        />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">
          {editingId ? 'Salvar Alterações' : 'Criar Post'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', content: '' }); }} className="ml-2">
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {posts.map(post => (
          <li key={post._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(post)} className="mr-2 text-blue-600">Editar</button>
              <button onClick={() => handleDelete(post._id!)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPostsPage;