import express from "express";

/**
 * 
 * @param {*} app - express app
 */

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    
    app.set("view engine", "ejs");
    app.set("views", "./src/views"); // tự đông tìm thư mục trong views
}

export default configViewEngine;