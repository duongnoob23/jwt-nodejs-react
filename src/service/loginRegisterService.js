import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
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
        EC: 1,
      };
    }
    let isPhoneExits = await checkPhoneExits(userData.phone);
    if (isPhoneExits === true) {
      return {
        EM: "Phone is already exits",
        EC: 1,
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

export { registerNewUser };
