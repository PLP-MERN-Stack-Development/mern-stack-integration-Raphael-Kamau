import React, { useState, useEffect } from 'react';
import { postService, categoryService, uploadService } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col
} from 'react-bootstrap';
import { toast } from 'react-toastify';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', category: '', image: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryService.getAll().then(setCategories);
    if (id) {
      postService.getOne(id).then(data => setPost(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadService.upload(file);
      setPost({ ...post, image: data.url });
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (id) {
        await postService.update(id, post);
        toast.success('Post updated');
      } else {
        await postService.create(post);
        toast.success('Post created');
      }
      navigate('/');
    } catch {
      setError('Failed to save post');
      toast.error('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={post.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Featured Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
          {uploading && <Spinner animation="border" size="sm" />}
          {post.image && (
            <img src={post.image} alt="Preview" className="mt-2" style={{ maxWidth: '100%' }} />
          )}
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
