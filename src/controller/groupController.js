import * as groupCRUDService from "../service/groupCRUDService";

const readFunc = async (req, res) => {
  try {
    let data = await groupCRUDService.getAllGroup({
      
    });

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "error from controller group",
      EC: "-1",
      DT: [],
    });
  }
};

export { readFunc };
