// pages/api/test.js

export default function handler(req, res) {
    // Check for the request method
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Hello, this is a test API endpoint!' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  