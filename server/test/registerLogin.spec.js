const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User, Profile } = require("../models/");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe("/POST register", () => {
  it("should return 422 if email/password is not in parametes", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({})
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it("should return 201 if validation succeeds", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({
        email: "test@test.com",
        password: "123456",
        firstName: "Michael",
        lastName: "Braga",
		birthDate: "1988-12-24",
		  phone: "+1 (416) 653-8266"
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("user");
        expect(res).to.have.cookie("JWT");
        Profile.find({}).then((p) => {
          expect(p.length).to.equal(1);
          done();
        });
      });
  });

  it("should return 422 if email is already in database", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({ email: "test@test.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

describe("/POST login", () => {
  after((done) => {
    User.deleteMany({})
      .then(() => Profile.deleteMany({}))
      .then(() => done());
  });
  it("should return 422 if email/password is not in parametes", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({})
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it("should return 404 if user not found", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "tes@test.com",
        password: "123456",
        firstName: "Michael",
        lastName: "Braga",
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should return 403 if passwords dont match", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "test@test.com",
        password: "1234567",
        firstName: "Michael",
        lastName: "Braga",
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should return 200 if login succeeds", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "test@test.com",
        password: "123456",
        firstName: "Michael",
        lastName: "Braga",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("user");
        expect(res).to.have.cookie("JWT");
        done();
      });
  });
});
