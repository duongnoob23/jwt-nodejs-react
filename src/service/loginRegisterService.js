import { where } from "sequelize/lib/sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import { getGroupWithRoles } from "./JWTService";
import { createJWT, checkUserPermission } from "../middleware/JWTACtion";
require("dotenv").config();

const { Op } = require("sequelize");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const checkPass = (inputPass, userPass) => {
  return bcrypt.compareSync(inputPass, userPass);
};

const checkEmailExits = async (email) => {
  let user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExits = async (phone) => {
  let user = await db.User.findOne({
    where: {
      phone: phone,
    },
  });
  if (user) return true;
  return false;
};

const registerNewUser = async (userData) => {
  // check email/phone are  exist
  try {
    let isEmailExits = await checkEmailExits(userData.email);
    if (isEmailExits === true) {
      return {
        EM: "Email is already exits",
        EC: 2,
      };
    }
    let isPhoneExits = await checkPhoneExits(userData.phone);
    if (isPhoneExits === true) {
      return {
        EM: "Phone is already exits",
        EC: 2,
      };
    }

    // hash user password
    let password = hashPassword(userData.password);
    // create new user

    await db.User.create({
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      password: password,
      groupId: "4",
    });

    return {
      EM: "user is created successlly",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "some thing wrongs in serviceRegister",
      EC: -2,
    };
  }
};

const loginUser = async (userData) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: userData.account }, { phone: userData.account }],
      },
    });

    if (user) {
      // console.log(">>> found user", user.get({ plain: true }));
      if (checkPass(userData.password, user.password) === true) {
        let roles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          roles: roles,
          expireIn: process.env.JWT_EXPIRE_IN,
          username: user.username,
        };
        let token = createJWT(payload);
        return {
          EM: "Login success",
          EC: "0",
          DT: {
            email: user.email,
            username: user.username,
            access_token: token,
            data: roles,
          },
        };
      }
    }
    // console.log(">>> Input value ", userData);
    return {
      EM: "Email or Phone or Passwords is wrongs",
      EC: "2",
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "some thing wrongs in serviceLogin",
      EC: "-2",
    };
  }
};

export { registerNewUser, loginUser };

// NOTE
// trong bảng user có thuộc tính groupId để biết được người dùng đó thuộc nhóm nào
// ttrong bảng group và role đểu có id, vì có mối quan hệ n - n nên bắt buộc phải sinh thêm một bảng
// group - role để có thể lấy được các quyền của người dùng thì ta phải làm như sau
// sau khi người dùng login thì lấy ra người dùng đó để đẩy vào hàm tìm role, gọi đến hàm getGroupWithRoles
// hàm này sẽ tìm ra id == user.groupId, nghĩa là tìm ra người dùng đó thuộc vị trí nào dev, lead
// sau đó tra trong bảng role để tìm ra à vị trí dev này có nhưng quyền gì
//  include: [
//       {
//         model: db.Role,
//         attributes: ["id", "url", "description"],
//         through: { attributes: [] }, // để lấy mỗi thuộc tính nhưu đã chọn phải thêm dòng này, chatgptchatgpt
//       },
// ],
// chỉ cần code như này thì mối quan hệ nhiều nhiều sẽ được sử lý được joinjoin
