const jwt = require('jsonwebtoken');

// Inserisci il tuo token JWT qui
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjM5MDY2NCwiZXhwIjoxNzI2Mzk0MjY0fQ.b5t1QQ9l7LlxL9ZLJR9bU8n9O0686fDY4x6fYnJRo7Q';

try {
  const decoded = jwt.decode(token);
  console.log('Decoded Token:', decoded);
} catch (error) {
  console.error('Error decoding token:', error);
}
