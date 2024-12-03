import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    database: 'test',
    port: 3307,
});


const handleHiWord = (req, res) => {
    const name = "Duong";
    return res.render("home.ejs",{name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}


const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);

    connection.query(
        'INSERT INTO users (email,password,username) VALUES (?,?,?)', [email, password, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    )

    return res.send("handleCreateNew");
}
module.exports = {
    handleHiWord,
    handleUserPage,
    handleCreateNewUser,
}