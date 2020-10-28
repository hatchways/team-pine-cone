const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { getRequestsByUser, createRequest, updateRequest } = require("../controllers/request");

const Router = express.Router();

Router.get("/me", authenticate(), getRequestsByUser);

Router.post("/create", authenticate(), createRequest);

Router.put("/update/:id", authenticate(), updateRequest);

module.exports= Router;