import pool from '../config/db';

class HandleDBQuery {
  async executeQuery(query) {
    return pool.query(query);
  }

  async selectAll(table) {
    const result = await this.executeQuery(`SELECT * FROM ${table};`);
    return result;
  }

  async selectById(table, id) {
    const query = `SELECT * FROM ${table} WHERE id='${id}';`;
    const result = await this.executeQuery(query);
    return result;
  }

  async selectByColumn(table, column, value) {
    const query = `SELECT * FROM ${table} WHERE ${column}='${value}';`;
    const result = await this.executeQuery(query);
    return result.rows[0];
  }

  async createUser(data) {
    const result = await this
      .executeQuery(`INSERT INTO users(username,password,created_at) VALUES(
        '${data.username}',
        '${data.password}',
        '${data.created_at}'
      ) returning *;
    `);

    return result.rows[0];
  }

  async createMessage(data) {
    const result = await this
      .executeQuery(`INSERT INTO messages(senderId,receiverId,message,created_at) VALUES(
        '${data.senderId}',
        '${data.receiverId}',
        '${data.message}',
        '${data.created_at}'
      ) returning *;
    `);

    return result.rows[0];
  }
}

export default new HandleDBQuery();
