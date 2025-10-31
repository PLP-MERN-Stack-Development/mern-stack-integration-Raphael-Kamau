import React, { useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import PostForm from '../posts/PostForm.jsx';
import { useAuth } from '../../context/AuthContext';

const PostCreatePage = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Create a New Post</Card.Title>

          {user ? (
            <>
              {success && (
                <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                  ✅ Post created successfully!
                </Alert>
              )}
              <PostForm onSuccess={() => setSuccess(true)} />
            </>
          ) : (
            <p className="text-muted">Please log in to create a post.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostCreatePage;
