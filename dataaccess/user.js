const mysql = require('mysql2');

class UserDataAccess {
    constructor() {
        this.mysqlPool =  mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'dbhrms',
            password: 'Semaphore@123',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

    getUserList = async () => {
        const [data] = await this.mysqlPool.execute(`SELECT * FROM users`);
        return data;
    }

    getUserDetails = async (id) => {
        const [data] = await this.mysqlPool.execute(`SELECT * FROM users WHERE Id = ?`, [id]);
        return data;
    }

    saveUser = async (id, firstName, lastName, age, gender) => {
        if (parseInt(id) === 0) {
            const [data] = await this.mysqlPool.execute(`
            INSERT INTO users (FirstName, LastName, Age, Gender) VALUES (?, ?, ?, ?)`,
                [firstName, lastName, age, gender]);
    
            return parseInt(data.insertId);
        } else {
            const [data] = await this.mysqlPool.execute(`
            UPDATE users SET FirstName = ?, LastName = ?, Age = ?, Gender = ? WHERE Id = ?`,
                [firstName, lastName, age, gender, id]);
    
            return parseInt(data.affectedRows) > 0 ? parseInt(id) : 0;
        }
    }

    deleteUser = async (id) => {
        const [data] = await this.mysqlPool.execute(`
            DELETE FROM users WHERE Id = ?`, [id]);
    
        return parseInt(data.affectedRows) > 0 ? parseInt(id) : 0;
    }
}

module.exports = UserDataAccess;