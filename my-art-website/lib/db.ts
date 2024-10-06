import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'art_gallery.db');

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

const db = new Database(dbPath, { verbose: console.log });

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      isArtist BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS artworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      type TEXT,
      allowReviews BOOLEAN,
      imageUrl TEXT,
      artistId INTEGER,
      createdAt DATETIME,
      likes INTEGER DEFAULT 0,
      FOREIGN KEY (artistId) REFERENCES users(id)
    );
  `);
}

export default db;