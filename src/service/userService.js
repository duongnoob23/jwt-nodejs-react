import bcrypt from "bcryptjs";
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    database: 'test',
    port: 3307,
});

const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);


    connection.query(
        'INSERT INTO users (email,password,username) VALUES (?,?,?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    )
}

const getUserList = () => {
    let users = [];
    connection.query(
        'SELECT * FROM users ',
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log("check >>> results",results);
        }
    )
}

// module.exports = {
//     createNewUser,
// }
export {createNewUser,getUserList}