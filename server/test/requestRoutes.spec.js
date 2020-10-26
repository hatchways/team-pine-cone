const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { Profile, User } = require("../models");
const mongoose = require("mongoose");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const testingIds = [];
let agent;

describe("Request Routes", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/team-pine-cone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const dbc = mongoose.connection;
    agent = chai.request.agent(app);
    dbc.on("error", console.error.bind(console, "connection error"));
    dbc.once("open", function () {
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
          const test = {
            email: "joe@test.com",
            password: "joetest"
          };
          const testUser = new User({
            ...test,
            profile: testingIds[0]
          });
          testUser.save().then(() => {
            agent
              .post("/login")
              .send({
                email: test.email,
                password: test.password
              })
              .end(() => {
                done();
              });
          });
        });
      });
    });
  });
  let requestId;
  it("POST /request/create Creates a request with a correct POST request", done => {
    agent
      .post("/request/create")
      .send({
        sitter_id: testingIds[1],
        start: new Date(),
        end: new Date()
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property("user_id");
        expect(res.body).to.have.property("sitter_id");
        expect(res.body).to.have.property("start");
        expect(res.body).to.have.property("end");
        expect(res.body).to.have.property("accepted");
        expect(res.body).to.have.property("declined");
        expect(res.body).to.have.property("paid");
        requestId = res.body._id;
        done();
      });
  });
  let request;
  it("GET /request/me Returns a user's requests", done => {
    agent
      .get("/request/me")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.toString()).to.eql(requestId.toString());
        request = res.body[0];
        done();
      });
  });
  it("PUT /request/update/:id Updates a request", done => {
    request.accepted = true;
    agent
      .put(`/request/update/${requestId}`)
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.accepted).to.eql(true);
        done();
      });
  });
  it("POST /request/create Returns 401 if not logged in", (done) => {
    chai.request(app)
      .post("/request/create")
      .send({
        sitter_id: testingIds[1],
        start: new Date(),
        end: new Date(),
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("GET /request/me Returns 401 if not logged in", done => {
    chai.request(app)
      .get("/request/me")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("PUT /request/update/:id Returns 401 if the user is not logged in", done => {
    request.paid = true;
    chai.request(app)
      .put(`/request/update/${requestId}`)
      .send(request)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});
