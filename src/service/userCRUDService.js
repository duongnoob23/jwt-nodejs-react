import db from "../models/index";
import bcrypt from "bcryptjs";
const getUserPerPage = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: db.Group, // Tên của model Group
          attributes: ["name", "description"], // Chọn trường cần lấy từ bảng Group
        },
      ],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "ok",
      EC: "0",
      DT: data,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "some thing wrong from service",
      EC: "-2",
      DT: [],
    };
  }
};

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      console.log(">>> chekc users", users);
      return {
        EM: "get data success",
        EC: "0",
        DT: users,
      };
    } else {
      return {
        EM: "get data fail",
        EC: "-2",
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "some thing wrong from service",
      EC: "2",
      DT: [],
    };
  }
};

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const createNewUser = async (data) => {
  try {
    const password = hashPassword(data.password);
    let user = await db.User.create({
      email: data.email,
      username: data.username,
      password: password,
      phone: data.phone,
      sex: data.sex,
      groupId: data.groupId,
    });
    console.log(data);
    if (user) {
      return {
        EM: "Create user success",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Create user fail",
        EC: "2",
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "some thing wrong from service create",
      EC: "-2",
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      await user.update({
        username: data.username,
        phone: data.phone,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "update user success",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "not found user",
        EC: "2",
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "some thing wrong from service update",
      EC: "-2",
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    console.log(">>> check id service", id);
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await db.User.destroy({
        where: { id: id },
      });

      return {
        EM: "Delete success",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Delete failed",
        EC: "2",
        DT: [],
      };
    }
  } catch (err) {
    console.log(">> check err service delete", err);
    return {
      EM: "some thing wrong from service",
      EC: "-2",
      DT: [],
    };
  }
};

export { getAllUser, createNewUser, updateUser, deleteUser, getUserPerPage };
