import * as userService from "../service/userService";


const handleHiWord = (req, res) => {
    const name = "Duong";
    return res.render("home.ejs",{name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}


const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    
    userService.createNewUser(email, password, username);
    // userService.getUserList();
    return res.send("handleCreateNew");
}

const handleAbc = (req, res) => {
    const name = "hello";
    return res.render("home.ejs",{name});
}

export { handleAbc, handleCreateNewUser, handleHiWord, handleUserPage };
