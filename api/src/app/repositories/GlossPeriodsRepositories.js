const db = require("../../database/index");
class GlossPeriodsRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM gloss_periods`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM gloss_periods WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM gloss_periods WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({
    start_time,
    end_time,
    gloss_classification,
    oil_well_id,
    description,
    gloss_detail_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO gloss_periods (start_hour,end_hour,classification,description,gloss_detail_id,oil_well_id)
             VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
      [
        start_time,
        end_time,
        gloss_classification,
        description,
        gloss_detail_id,
        oil_well_id,
      ]
    );
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
        UPDATE gloss_periods
        SET name = $1
        WHERE id = $2
        RETURNING *
        `,
      [name, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query("DELETE FROM gloss_periods WHERE id = $1", [
      id,
    ]);
    return deleteOp;
  }
}

module.exports = new GlossPeriodsRepositories();
