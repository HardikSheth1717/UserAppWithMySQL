const UserDataAccess = require('../dataaccess/user');

class User {
    constructor() {
        this.userQuery = new UserDataAccess();
    }

    getUserList() {
        return this.userQuery.getUserList();
    }

    getUserDetails(id) {
        return this.userQuery.getUserDetails(id);
    }

    saveUser(id, firstName, lastName, age, gender) {
        try {
            return this.userQuery.saveUser(id, firstName, lastName,age, gender);
        }
        catch(ex) {
            console.log(ex);
            return 0;
        }
    }

    deleteUser(id) {
        try {
            return this.userQuery.deleteUser(id);
        }
        catch(ex) {
            console.log(ex);
            return 0;
        }
    }
}

module.exports = User;