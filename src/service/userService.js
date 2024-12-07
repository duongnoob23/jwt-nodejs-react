import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const createNewUser =async  (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
            database: 'test',
        port: 3307,
        Promise: bluebird,
        });
    let hashPass = hashPassword(password);

    try {
        const [row, fields] = await connection.execute('INSERT INTO users (email,password,username) VALUES (?,?,?)',[email, hashPass, username]);
    } catch (err){
        console.log("check >>> err", err);
    }
   
}

const getUserList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
            database: 'test',
        port: 3307,
        Promise: bluebird,
        });
    try {
        const [row, fields] = await connection.execute('select * from users');
        // console.log("chekc >>> row", row);
        return row;
    } catch (err) {
        console.log("chekc >>> errr", err);
    }
}

const getOneUser = async (idUser) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
            database: 'test',
        port: 3307,
        Promise: bluebird,
        });
    try {
        const [row, fields] = await connection.execute(`SELECT * FROM users WHERE id=${idUser}`);
        // console.log("chekc >>> row", row);
        return row;

    } catch (err) {
        console.log("chekc >>> errr", err);
    }
}
// module.exports = {
//     createNewUser,
// }
const deleteUser = async (idUser) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
            database: 'test',
        port: 3307,
        Promise: bluebird,
        });
    try {
        const [row, fields] = await connection.execute(`DELETE FROM users WHERE id=${idUser}`);
        // console.log("chekc >>> row", row);
        return row;
    } catch (err) {
        console.log("chekc >>> errr", err);
    }
}

const updateInforUser = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test',
        port: 3307,
        Promise: bluebird,
    });

    try {
        const [row, fields] = await connection.execute(
            `UPDATE users SET email = ?, username = ? WHERE id = ?`, 
            [email, username, id]
        );
        return row;
    } catch (err) {
        console.log("Error: ", err);
    } 
}


export {createNewUser,getUserList,deleteUser,getOneUser,updateInforUser}