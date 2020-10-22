const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { getRequestsByUser, createRequest, updateRequest } = require("../controllers/request");

const Router = express.Router();

Router.get("/me", authenticate(), getRequestsByUser);

Router.post("/request", authenticate(), createRequest);

Router.put("/request/:id", authenticate(), updateRequest);

module.exports= Router;