const handleHiWord = (req, res) => {
    const name = "Duong";
    return res.render("home.ejs",{name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

module.exports = {
    handleHiWord,
    handleUserPage,
}