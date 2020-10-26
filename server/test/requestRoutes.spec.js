const { IdentityStore } = require("aws-sdk");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { Profile, User } = require("../models");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const testingIds = [];

describe("Request Routes", () => {
  before(async done => {
    const testProfile = new Profile({
      firstName: "Joe",
      lastName: "Smith",
      birthDate: new Date("01-01-1990"),
      phone: "+1 (555) 555-5555",
      location: {
        type: "Point",
        coordinates: [-122.5, 37.7],
      },
    });
    testProfile.save().then(profile => {
      testingIds.push(profile._id);
      const testProfile2 = new Profile({
        firstName: "Jim",
        lastName: "Smith",
        birthDate: new Date("01-01-1990"),
        phone: "+1 (555) 555-5555",
        location: {
          type: "Point",
          coordinates: [-122.5, 37.7],
        },
      });
      testProfile2.save().then(profile => {
        testingIds.push(profile._id);
        const testUser = new User({
          email: "joe@test.com",
          password: "joetest",
          profile: testingIds[0]
        });
        testUser.save().then(() => {
          chai
            .request(app)
            .post("/login")
            .send({
              email: testUser.email,
              password: testUser.password
            })
            .end(res => {
              res.should.have.status(200);
              done();
            });
        });
      });
    });
  });
});
