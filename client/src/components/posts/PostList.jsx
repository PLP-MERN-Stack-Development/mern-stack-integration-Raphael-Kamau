import React, { useEffect, useState } from 'react';
import { postService } from '../../services/api';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
  Pagination
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await postService.getAll(page, 6, search);
        setPosts(data.posts);
        setPages(data.pages || 1);
      } catch (err) {
        setError('Failed to load posts');
        toast.error('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page on new search
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">All Posts</h2>

      <Form className="mb-4" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {posts.map(post => (
          <Col md={4} sm={12} key={post._id}>
            <Card className="mb-3 h-100">
              {post.image && <Card.Img variant="top" src={post.image} />}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.slice(0, 100)}...</Card.Text>
                <Button as={Link} to={`/posts/${post._id}`} variant="primary">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {pages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
          {[...Array(pages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === pages} onClick={() => setPage(page + 1)} />
        </Pagination>
      )}
    </Container>
  );
};

export default PostList;
