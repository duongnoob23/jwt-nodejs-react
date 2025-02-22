import db from "../models/index";

const getAllGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "DESC"]],
    });
    if (data) {
      return {
        EM: "ok",
        EC: "0",
        DT: data,
      };
    } else {
      return {
        EM: "error from service",
        EC: "2",
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "Error from service group",
      EC: "-2",
      DT: [],
    };
  }
};

export { getAllGroup };
