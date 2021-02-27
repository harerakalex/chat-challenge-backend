import pool from '../config/db';

const queryValidator = (param) => {
  return pool
    .query(param)
    .then(() => {
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      process.exit(0);
    });
};

export { queryValidator };
