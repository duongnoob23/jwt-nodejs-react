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
    console.log(email, username, password);
    // connection.query(
    //     'SELECT * FROM users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         console.log(results);
    //     }
    // )
    connection.query(
        'INSERT INTO users (email,password,username) VALUES (?,?,?)', [email, password, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    )

    return res.send("handleCreateNew");
}

const handleAbc = (req, res) => {
    const name = "hello";
    return res.render("home.ejs",{name});
}

export { handleAbc, handleCreateNewUser, handleHiWord, handleUserPage };
