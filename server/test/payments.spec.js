const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User } = require("../models/");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

const agent = chai.request.agent(app);

let user = {
  email: "test@test.com",
  password: "123456",
  firstName: "Michael",
  lastName: "Braga",
  birthDate: "1988-12-24",
  phone: "+1 (416) 653-8266",
};

describe("/POST /payment/methods", () => {
  before((done) => {
    agent
      .post("/register")
      .send(user)
      .end((err, res) => {
		  res.user = user;
        done();
      });
  });

	after(done => {
		User
			.deleteMany()
			.then(() => done())
			.catch(() => done());
	})

  it("Should success create a stripe customer id and save it Profile", async (done) => {
	  console.log(stripe.paymentMethods)
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 10,
        exp_year: 2021,
        cvc: "314",
      },
    });

	  agent.request(app)
		  .post("/payment")
	  		.send({ user_id: user.id, card_id: paymentMethods.id })
	  .end(() => { 
			res.should.have.status(201);
		  expect(res.body.profile).to.have("stripId");
		  done();

	  })
  });
});
