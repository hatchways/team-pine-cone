const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User } = require("../models/");

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe("GET /user/me", () => {
  after((done) => {
    User.deleteMany({}).then(() => done());
  });

  it("Should return 200 on successful authentication", () => {
    const agent = chai.request.agent(app);
    //register new user which has httpOnly cookie
    agent
      .post("/register")
      .send({ email: "test@test.com", password: "123456" })
      .then((res) => {
        expect(res).to.have.cookie("JWT");

        //auth new user
        return agent
          .get("/user/me")
          .then((res) => {
            res.should.have.status(200);
            res.body.should.have.property("user");
            res.body.user.should.have.property("_id");
          })
          .catch(console.error);
      });
  });

  it("Should return 401 if authentication fails", (done) => {
    chai
      .request(app)
      .get("/user/me")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
