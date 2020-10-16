const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { Profile } = require('../models/');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

let id = null;

describe('/POST profile/create', () => { 
	let request = null;

	beforeEach(() => { 
		request = chai
			.request(app)
			.post('/profile/create')
	})

	it('should return 422 if required params are missing', done => { 
		request
			.send({})
			.end((err, res) => { 
				res.should.have.status(422);
				done();
			})
	})

	it('should return 201 if successful created profile', done => { 
		request
			.send({ 
				firstName: 'John',
				lastName: 'Doe',
				gender: 'male',
				birthDate: '1988-10-11T04:00:00.000Z',
				description: 'Good stuff',
			})
			.end((err, res) => { 
				res.should.have.status(201);
				res.body.should.have.property('profile');
				expect(res.body.profile).to.have.property('firstName');
				expect(res.body.profile).to.have.property('lastName');
				id = res.body.profile._id;
				done();
			}); 
	});

	//need a test to check if duplicate 
});

describe('/PUT /profile/:id', () => { 
	it('should return 200 with profile', done => { 
		chai
			.request(app)
			.put(`/profile/${id}`)
			.send({ gender: 'female' })
			.end((err, res) => { 
				res.should.status(200);
				res.body.should.have.property('profile');
				expect(res.body.profile.gender).to.equal('female');
				done();
			})
	});
	
	it('should return 422 on invalid input', done => { 
		chai
			.request(app)
			.put(`/profile/${id}`)
			.send({ gender: 'Femalee' })
			.end((err, res) => { 
				res.should.status(422);
				done();
			})
	})
})

describe('/GET /profile', () => { 
	it('should return 200 with all profiles when requested', done => { 
		chai
			.request(app)
			.get('/profile')
			.end((err, res) => { 
				res.should.have.status(200);
				res.body.should.have.property('profiles');
				expect(res.body.profiles.length).to.equal(1);
				done();
			});
	});
});

describe('/GET /profile/:id', () => {
	after(done => { 
		Profile.remove({})
			.then(() => done());
	});

	it('should return 200 with profile', done => {
		chai
			.request(app)
			.get(`/profile/${id}`)
			.end((err, res) => { 
				res.should.have.status(200);
				res.body.should.have.property('profile');
				expect(res.body.profile).to.have.property('firstName');
				done();
			})
	});

	it('Should return 404 if Profile not found', done => { 
		chai
			.request(app)
			.get(`/profile/507f191e810c19729de860ea`)
			.end((err, res) => { 
				res.should.have.status(404);
				done();
			})
	})
});
