const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User } = require("../models/");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe("POST /register", () => {
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
      .send({ email: "test@test.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("user");
        expect(res).to.have.cookie("JWT");
        done();
      });
  });

  it("should return 400 if email is already in database", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({ email: "test@test.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("/POST login", () => {
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
      .send({ email: "tes@test.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should return 403 if passwords dont match", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "1234567" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should return 200 if login succeeds", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("user");
        expect(res).to.have.cookie("JWT");
        done();
      });
  });
});

describe("POST /logout", () => {
  after((done) => {
    User.remove({}).then(() => done());
  });
  const agent = chai.request.agent(app);

  it("should logout user by clearing JWT cookie", (done) => {
    agent
      .post("/login")
      .send({ email: "test@test.com", password: "123456" })
      .then(() => {
        return agent.post("/logout").then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.not.have.cookie("JWT");
          done();
        });
      });
  });
});
