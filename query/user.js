const mysql = require('mysql2');

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dbhrms',
    password: 'Semaphore@123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

module.exports.getUserList = async () => {
    const [data] = await mysqlPool.execute(`SELECT * FROM users`);
    return data;
}

module.exports.getUserDetails = async (id) => {
    const [data] = await mysqlPool.execute(`SELECT * FROM users WHERE Id = ?`, [id]);
    return data;
}

module.exports.saveUser = async (id, firstName, lastName, age, gender) => {
    if (parseInt(id) === 0) {
        const [data] = await mysqlPool.execute(`
        INSERT INTO users (FirstName, LastName, Age, Gender) VALUES (?, ?, ?, ?)`,
            [firstName, lastName, age, gender]);

        return parseInt(data.insertId);
    } else {
        const [data] = await mysqlPool.execute(`
        UPDATE users SET FirstName = ?, LastName = ?, Age = ?, Gender = ? WHERE Id = ?`,
            [firstName, lastName, age, gender, id]);

        return parseInt(data.affectedRows) > 0 ? parseInt(id) : 0;
    }
}

module.exports.deleteUser = async (id) => {
    const [data] = await mysqlPool.execute(`
        DELETE FROM users WHERE Id = ?`, [id]);

    return parseInt(data.affectedRows) > 0 ? parseInt(id) : 0;
}