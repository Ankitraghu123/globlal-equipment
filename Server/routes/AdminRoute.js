const express= require("express");
const route = express.Router();
const adminController= require("../controllers/AdminController");

route.post("/adminlogin", adminController.adminLogin)
// route.post("/createuser", adminController.createUser)






module.exports=route;