const express = require ("express");
const app = express(); 
const cors = require("cors"); //jembatan antara server dan client
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

app.use(cors());
app.use(morgan("dev"));
//connect to mongoodb
connectDB();

//define routes and API
app.use(express.json({extended:false}));
app.use("/api/users",require("./routes/userApi"));
app.use("/api/products",require("./routes/productApi"));
app.use("/api/auth",require("./routes/authApi"));


app.get("/",(req,res)=>{
    res.send('My App is up');
})


app.listen(PORT,()=>{
    console.log(`Server is Listening at port ${PORT}`);
})