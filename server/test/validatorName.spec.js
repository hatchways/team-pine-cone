const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Register Validator test", () => {
  it("Successful register with ' in name.", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({
        email: "test@test.com",
        password: "123456",
        firstName: "D'Michael",
        lastName: "D'Braga",
        birthDate: "1988-12-24",
        phone: "+1 (416) 653-8266",
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("Should fail with numbers in names", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({
        email: "test11@test.com",
        password: "123456",
        firstName: "D2Michael",
        lastName: "D2Braga",
        birthDate: "1988-12-24",
        phone: "+1 (416) 653-8266",
      })
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});
