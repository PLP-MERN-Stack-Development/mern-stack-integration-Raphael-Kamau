import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../../services/api';
import { Container, Form, Button, ListGroup, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

const socket = io(import.meta.env.VITE_API_URL);

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getOne(id);
        setPost(data);
        setComments(data.comments || []);
        socket.emit('joinPost', id);
      } catch {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    socket.on('commentAdded', (newComment) => {
      setComments((prev) => [...prev, newComment]);
    });

    return () => {
      socket.off('commentAdded');
    };
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const newComment = await postService.comment(id, { content: text });
      socket.emit('newComment', { postId: id, comment: newComment });
      setText('');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleLike = async () => {
    setLiking(true);
    try {
      const res = await postService.like(id);
      setPost((prev) => ({ ...prev, likes: res.likes }));
    } catch {
      toast.error('Failed to like post');
    } finally {
      setLiking(false);
    }
  };

  const hasLiked = post?.likes?.includes(user?._id);

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : post ? (
        <Card>
          {post.image && <Card.Img variant="top" src={post.image} />}
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <div className="text-muted mb-2">
              Category: {post.category?.name} | Author: {post.author?.name}
            </div>

            {user && (
              <Button
                variant={hasLiked ? 'danger' : 'outline-danger'}
                onClick={handleLike}
                disabled={liking}
              >
                ❤️ {post.likes?.length || 0}
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <p>Post not found.</p>
      )}

      {user && (
        <Form onSubmit={handleComment} className="mt-4">
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">Submit</Button>
        </Form>
      )}

      <h5 className="mt-4">Comments</h5>
      <ListGroup className="mt-2">
        {comments.map((c) => (
          <ListGroup.Item key={c._id}>
            <strong>{c.user?.name || 'Anonymous'}</strong>{' '}
            <small className="text-muted">({new Date(c.createdAt).toLocaleString()})</small>
            <div>{c.content}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default PostDetail;
