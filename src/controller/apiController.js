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

const hello = (req, res) => {
  console.log("heelo");
};

export { testApi, handleRegister, hello };
