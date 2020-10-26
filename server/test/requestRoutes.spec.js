const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { Profile } = require("../models")

const { expect } = chai;

chai.should()
chai.use(chaiHttp)

describe("Request Routes", () => {
    before(async () => {
        const testProfile = new db.Profile({
          firstName: "Joe",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "+1 (555) 555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile2.save();
        const testProfile = new db.Profile({
          firstName: "Joe",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "+1 (555) 555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile2.save();
    })
})
