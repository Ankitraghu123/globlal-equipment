const express = require("express")
const app = express();
const path = require('path');
const dbconnect = require('./config/db.config')
// const morgan = require('morgan')
const cors = require('cors')
require("dotenv").config()
const productRouter = require("./routes/product.routes")
const cartRouter = require("./routes/cart.routes")
const categoryRouter = require("./routes/category.routes")
const subacategoryRouter = require("./routes/subcategory.routes")
const fileUpload = require('express-fileupload');
const UserRegistration = require("./routes/RegistartionRoute");
const webapiRoute = require('./routes/webapiRoute');
const Enquiry = require("./routes/enquiryroutes")
const Contact= require("./routes/Contactroutes")
const AdminLogin = require("./routes/AdminRoute");
// app.use(morgan('dev'))
app.use(cors())

dbconnect();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use(fileUpload());


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subacategoryRouter);
app.use("/user", UserRegistration)
app.use('/webapi',webapiRoute);
app.use('/enquiry', Enquiry)
app.use("/contact", Contact)
app.use("/admin", AdminLogin)


const PORT = process.envPORT || 8080

app.listen(PORT, ()=>{
    console.log(`server runnig at port: ${PORT}`)
})