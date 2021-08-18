const userQuery = require('../query/user');

class User {
    getUserList() {
        return userQuery.getUserList();
    }

    getUserDetails(id) {
        return userQuery.getUserDetails(id);
    }

    saveUser(id, firstName, lastName, age, gender) {
        try {
            return userQuery.saveUser(id, firstName, lastName,age, gender);
        }
        catch(ex) {
            console.log(ex);
            return 0;
        }
    }

    deleteUser(id) {
        try {
            return userQuery.deleteUser(id);
        }
        catch(ex) {
            console.log(ex);
            return 0;
        }
    }
}

module.exports = User;