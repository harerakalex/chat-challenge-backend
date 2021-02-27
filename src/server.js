import { config } from 'dotenv';

import { server } from '.';
import pool from './config/db';

config();

(async () => {
  try {
    const port = process.env.PORT || 3000;
    await pool.connect();
    server.listen(port, () => {
      console.log('Database connected successfully');
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log('Could not connect to database');
  }
})();
