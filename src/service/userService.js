import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from "../models/index";


const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const createNewUser =async  (email, password, username) => {
    
    let hashPass = hashPassword(password);

    try {
        await db.User.create({
            email: email,
            username:username,
            password: hashPass,
        });
        // console.log("chek >>> create user success")
    } catch (err){
        console.log("check >>> err", err);
    }
   
}

const getUserList = async () => {
   

    let users = [];
    try {
        users = await db.User.findAll();
    } catch (err) {
        console.log("check >>> err server", err);
    }
    return users;
}

const getOneUser = async (idUser) => {
    let findUser = {};
    try {
        let oneUser = await db.User.findOne({
            where: { id: idUser },
            // raw: true // cach này chưa tối ưu
        });
        findUser = oneUser;
    } catch (err) {
        console.log("check >>> err server", err);
    }
    return findUser.get({ plain: true });
}
// module.exports = {
//     createNewUser,
// }
const deleteUser = async (idUser) => {
    console.log("check >>> id", idUser);
    try {
        const result = await db.User.destroy({
            where: { id: idUser }
        });
        console.log("chekc >>> result", result);
    } catch (err) {
        console.log(err);
    }
}

const updateInforUser = async (email, username, id) => {
    

    try {
        const result = await db.User.update({
            email: email,
            username: username
        }, {
            where: { id: id },
            returning: true,  // Trả về bản ghi đã được cập nhật
            raw: true         // Trả về dữ liệu thô
        });
        console.log("check >>> result", result[0]);
        console.log("check >>> result", result[1]);
    } catch (err) {
        console.log("Error: ", err);
    } 
}


export { createNewUser, getUserList, deleteUser, getOneUser, updateInforUser }


// const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//             database: 'test',
//         port: 3307,
//         Promise: bluebird,
//         });
//     try {
//         const [row, fields] = await connection.execute('select * from user');
//         // console.log("chekc >>> row", row);
//         return row;
//     } catch (err) {
//         console.log("chekc >>> errr", err);
//     }