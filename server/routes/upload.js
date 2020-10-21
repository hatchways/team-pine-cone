const createError = require("http-errors");
const express = require("express");
const multiparty = require("multiparty");
const fs = require("fs")
const fileType = require("file-type")

const upload = require("../utils/upload");
const Profile = require("../models/Profile");
const {authenticate} = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate(), (req, res, next) =>{
    if (!req.user) {
      return next(createError(403));
    }
    try {
        const form = new multiparty.Form()
        form.parse(req, async (err, fields, files) => {
          const buffer = fs.readFileSync(files.file[0].path)
          const type = await fileType.fromBuffer(buffer)
          const name = files.file[0].originalFilename.replace(`.${type.ext}`, "") + "-" + new Date();
          upload(buffer, name, type).then(result => {
              Profile.findById(req.user.profile).then(profile => {
                profile.photo = result.Location;
                profile.save()
              })
              res.json({url: result.Location})
          })
        });
    }
    catch (e) {
        console.log(e)
        return next(createError(503))
    }
})

router.put("/delete", authenticate(), (req, res, next) => {
    if (!req.user) {
      return next(createError(403));
    }
    Profile.findById(req.user.profile).then(profile => {
        profile.photo = null;
        profile.save();
        res.status(200).end();
    }).catch(e => {
        console.log(e)
        next(createError(503));
    })
})

module.exports= router;