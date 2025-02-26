import { useState } from 'react';
import withAuth from '../lib/withAuth'; // 削除せずそのまま保持
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import {
  AllPostsQuery,
  AllPostsDocument,
  CreatePostMutation,
  CreatePostMutationVariables,
  CreatePostDocument,
} from '@local/graphql';

const PostPage: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<AllPostsQuery>(AllPostsDocument);
  const [createPost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePostDocument);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    await createPost({ variables: { title, content } });
    refetch(); // 投稿後に投稿リストを再取得
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create a New Post
        </Typography>
      </Box>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        minRows={4}
        sx={{
          '& .MuiInputBase-root': {
            padding: '12px',
          },
          '& .MuiInputLabel-outlined': {
            fontSize: '1rem',
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePost}
        sx={{ mt: 2, mb: 4 }}
      >
        Submit
      </Button>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5" component="h2">
          Posts
        </Typography>
      </Box>

      {data && (
        <Box>
          {data.allPosts.map((post: AllPostsQuery['allPosts'][number]) => (
            <Card
              key={post.id}
              sx={{
                display: 'flex',
                mb: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {post.title.charAt(0)}
              </Avatar>
              <CardContent sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date().toLocaleDateString()} {/* 仮の日付 */}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: 'textSecondary' }}
                >
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default withAuth(PostPage); // withAuth でラップしたエクスポート
