require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurityPath = ["/", "/login", "/register"];

const createJWT = (payload) => {
  try {
    let key = process.env.JWT_SECRET;
    let token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRE_IN, // Đúng chính tả
    });

    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (err) {
    console.log(err);
  }
  // console.log(data);
  return data;
};

const JWTCheck = (req, res, next) => {
  console.log(">>> check path", req.path);
  if (nonSecurityPath.includes(req.path)) {
    console.log(">>> next");
    next();
  } else {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
      let token = cookies.jwt;
      let decoded = verifyToken(token);
      if (decoded) {
        req.user = decoded; // gán biến mới cho req để các hàm sau có thể sử dụng req.user
        req.token = token;
        next();
        // console.log("my jwt", cookies);
      } else {
        return res.status(401).json({
          EM: "NOT AUTHENTICATED ",
          EC: "-1",
          DT: "",
        });
      }
    } else {
      return res.status(401).json({
        EM: "NOT AUTHENTICATED ",
        EC: "-1",
        DT: "",
      });
    }
  }
};

const checkUserPermission = (req, res, next) => {
  console.log(">>> check path", req.path);

  if (nonSecurityPath.includes(req.path) || req.path === "/account") {
    console.log(">>> next");
    next();
  } else {
    if (req.user) {
      let email = req.user.email;
      let roles = req.user.roles.Roles;
      let currentRole = req.path;

      console.log(">>> check roles", roles);
      // console.log(">>> check email", email);
      // console.log(">> check currentRole", currentRole);

      if (!roles || roles.length === 0) {
        return res.status(403).json({
          EM: "YOU DONT HAVE PERMISTION TO ACCESSS ",
          EC: "-1",
          DT: "",
        });
      } else {
        let canAccess = roles.some((item) => item.url === currentRole);
        if (canAccess === true) {
          next();
          // console.log("TRUEEEE");
        } else {
          return res.status(403).json({
            EM: "YOU DONT HAVE PERMISTION TO ACCESSS ",
            EC: "-1",
            DT: "",
          });
        }
      }
    } else {
      return res.status(401).json({
        EM: "NOT AUTHENTICATED ",
        EC: "-1",
        DT: "",
      });
    }
  }
};

export { createJWT, verifyToken, JWTCheck, checkUserPermission };
