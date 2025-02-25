import * as userService from "../service/loginRegisterService";

const testApi = (req, res) => {
  console.log(">>>> test api");
  return res.status(200).json({
    message: "OK",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    console.log(">> call register ", req.body);
    //req.body: email,phone,password,username
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    let data = await userService.registerNewUser(req.body);

    //service: create user
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error", //error message
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    console.log(">>> check req.body", req.body);

    if (!req.body.account || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    let data = await userService.loginUser(req.body);
    if (data && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, { httpOnly: true });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

export { testApi, handleRegister, handleLogin };
