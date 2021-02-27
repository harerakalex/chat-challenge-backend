import { queryValidator } from './queryValidator';

const createTables = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS messages(
      id SERIAL PRIMARY KEY,
      senderId INT NOT NULL,
      receiverId INT NOT NULL,
      message VARCHAR(100) NOT NULL,
      created_at TIMESTAMP,
      FOREIGN KEY (senderId) REFERENCES users(id),
      FOREIGN KEY (receiverId) REFERENCES users(id)
    )`;

queryValidator(createTables);
