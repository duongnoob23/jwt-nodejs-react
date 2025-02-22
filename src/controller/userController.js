import * as userCRUDService from "../service/userCRUDService";
import db from "../models/index";
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      // console.log(page, limit);
      let data = await userCRUDService.getUserPerPage(+page, +limit);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userCRUDService.getAllUser();

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    // validate

    let { email, username, phone, password, sex, groupId } = req.body;
    console.log(">>> check email,username...", email);
    console.log(">>> check req.body", req.body);
    if (!email || !username || !phone || !password || !sex || !groupId) {
      return res.status(200).json({
        EM: "Information is required",
        EC: "1",
        DT: "",
      });
    }

    let userEmail = await db.User.findOne({
      where: { email: email },
    });
    if (userEmail) {
      return res.status(200).json({
        EM: "Email or Phone is exist",
        EC: "1",
        DT: "",
      });
    }

    let userPhone = await db.User.findOne({
      where: { phone: phone },
    });
    if (userPhone) {
      return res.status(200).json({
        EM: "Email or Phone is exist",
        EC: "1",
        DT: "",
      });
    }

    let data = await userCRUDService.createNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let data = await userCRUDService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    if (req.params.id) {
      let id = req.params.id;
      let data = await userCRUDService.deleteUser(+id);
      console.log(">> check id controller", id);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};

export { readFunc, createFunc, updateFunc, deleteFunc };
