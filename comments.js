// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  // Send comments
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment by post id
app.post('/posts/:id/comments', (req, res) => {
  // Generate id
  const commentId = randomBytes(4).toString('hex');

  // Get comment data
  const { content } = req.body;

  // Get comments
  const comments = commentsByPostId[req.params.id] || [];

  // Add comment to comments
  comments.push({ id: commentId, content });

  // Add comments to commentsByPostId
  commentsByPostId[req.params.id] = comments;

  // Send comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});