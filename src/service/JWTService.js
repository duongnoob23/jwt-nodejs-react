import { where } from "sequelize/lib/sequelize";
import db from "../models/index";

const getGroupWithRoles = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] }, // để lấy mỗi thuộc tính nhưu đã chọn phải thêm dòng này, chatgptchatgpt
      },
    ],
  });
  return roles;
};

export { getGroupWithRoles };
