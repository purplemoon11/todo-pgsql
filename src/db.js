//database connection
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    database: "todo",
    host: "localhost",
    port: 5432
})

module.exports = pool;

