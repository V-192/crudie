import express from "express";
import mongoose from "mongoose";
import { LicenseController, UserController } from "./controllers/index.js";
import checkAuth from "./utils/checkAuth.js";
import "dotenv/config";
import cors from "cors";


const app = express();
//Connecting to DB and catching error
mongoose.connect(process.env.DB_CONNECT).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log("DB error", err);
  }
);

app.use(cors()); //No CORS errors
app.use(express.json()); //Reading JSON

//Routing
app.get("/", (req, res) => {
  res.json({ Bimbo: "Toilet" });
});

//License thing
//Create
app.post("/api/license", checkAuth, LicenseController.createLicense);
//Find contract
app.get("/api/license/:id", checkAuth, LicenseController.fetchOne);
//All contracts
app.get("/api/license", checkAuth, LicenseController.fetchAll);
//Update
app.put("/api/license/:id", checkAuth, LicenseController.updateLicense);
//Delete
app.delete("/api/license/:id", checkAuth, LicenseController.deleteLicense);

//Auth thing
//Register
app.post("/api/auth/register", UserController.register);
//Login
app.post("/api/auth/login", UserController.login);
//Fetch user
app.get("/api/auth/getMe", checkAuth, UserController.getMe)
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started");
});
