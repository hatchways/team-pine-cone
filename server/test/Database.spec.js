const chai = require('chai');
const mongoose = require('mongoose');

chai.should()

describe('Database Tests', () => {
    before(done => {
        mongoose.connect("mongodb://localhost/team-pine-cone");
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function () {
          done();
        });
    })
})