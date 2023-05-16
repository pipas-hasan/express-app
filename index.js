const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
  });

  let books = [];

  app.get('/books', (req, res) => {
    res.json(books);
  });
    
  app.use(express.json());

  let idCounter = 1;
  
  app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const book = {
      id: idCounter++,
      title,
      author,
      publishedDate
    };
    
    books.push(book);
    
    res.json(book);
  });
  
  app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const index = books.findIndex(book => book.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    books.splice(index, 1);
    
    res.json({ message: 'Book deleted' });
  });
  



app.listen(PORT, () => {
    console.log(`Server is run port http://localhost:${PORT}`);
})

