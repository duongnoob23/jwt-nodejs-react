import * as userService from "../service/userService";

const handleHiWord = (req, res) => {
  const name = "Duong";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleUserUpdatePage = async (req, res) => {
  let idUser = req.params.id;
  let User = await userService.getOneUser(idUser);
  let UserArray = {};
  if (User) {
    UserArray = User;
  }
  return res.render("user-update.ejs", { UserArray });
};

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  await userService.createNewUser(email, password, username);
  return res.redirect("/user");
};

const handleAbc = async (req, res) => {
  let idUser = req.body.id;
  await userService.deleteUser(idUser);
  return res.redirect("/user");
};

const handleDelteUser = async (req, res) => {
  let idUser = req.params.id;
  console.log("check >>> id", idUser);
  await userService.deleteUser(idUser);
  return res.redirect("/user");
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  console.log("check >>> email,username,id", email, username, id);
  await userService.updateInforUser(email, username, id);
  return res.redirect("/user");
};
export {
  handleCreateNewUser,
  handleHiWord,
  handleUserPage,
  handleDelteUser,
  handleUserUpdatePage,
  handleUpdateUser,
};
