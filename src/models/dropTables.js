import { queryValidator } from './queryValidator';

const dropTables = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS messages CASCADE;
 `;

queryValidator(dropTables);
