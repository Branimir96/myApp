const sqlite3 = require('sqlite3').verbose();

// Create a new database or open existing one
const db = new sqlite3.Database('news_articles.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the news_articles database.');
  }
});

// Create table
db.run(`CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_date TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Articles table created or already exists.');
    insertSampleData();
  }
});

// Function to insert sample data
function insertSampleData() {
  const sampleArticles = [
    {
      title: 'Breaking: New AI Discovery',
      content: 'Scientists have made a groundbreaking discovery in AI that could revolutionize...',
      author: 'Jane Doe',
      published_date: '2023-09-10'
    },
    {
      title: 'Global Climate Summit Concludes',
      content: 'World leaders reached a landmark agreement at the Global Climate Summit...',
      author: 'John Smith',
      published_date: '2023-09-11'
    },
    {
      title: 'Tech Giant Launches New Smartphone',
      content: 'The highly anticipated smartphone from Tech Giant Inc. has finally hit the market...',
      author: 'Alice Johnson',
      published_date: '2023-09-12'
    }
  ];

  const insertStmt = db.prepare(`INSERT INTO articles (title, content, author, published_date) VALUES (?, ?, ?, ?)`);

  sampleArticles.forEach((article) => {
    insertStmt.run(article.title, article.content, article.author, article.published_date, (err) => {
      if (err) {
        console.error('Error inserting article:', err.message);
      } else {
        console.log(`Inserted article: ${article.title}`);
      }
    });
  });

  insertStmt.finalize();

  // Verify the inserted data
  db.all(`SELECT * FROM articles`, (err, rows) => {
    if (err) {
      console.error('Error querying data:', err.message);
    } else {
      console.log('All articles in the database:');
      console.log(rows);
    }
    
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
}