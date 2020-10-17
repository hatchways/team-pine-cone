const express = require("express");
const multiparty = require("multiparty");
const fs = require("fs")
const fileType = require("file-type")

const upload = require("../utils/upload")

const router = express.Router();

router.post("/", (req, res) =>{
    try {
        const form = new multiparty.Form()
        form.parse(req, async (err, fields, files) => {
          const buffer = fs.readFileSync(files.file[0].path)
          const type = await fileType.fromBuffer(buffer)
          const name = files.file[0].originalFilename.replace(`.${type.ext}`, "");
          upload(buffer, name, type).then(result => {
              // Add image to the user profile
              res.json({url: result.Location})
          })
        });
    }
    catch (e) {
        console.log(e)
        res.end()
    }
})

module.exports= router;