const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { Profile } = require('../models/');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe('/POST profile/create', () => { 
	let request = null;

	beforeEach(() => { 
		request = chai
			.request(app)
			.post('/profile/create')
	})

	after(done => { 
		Profile.remove({})
			.then(() => done());
	});

	it('should return 422 if required params are missing', done => { 
		request
			.send({})
			.end((err, res) => { 
				res.should.have.status(422)
				done();
			})
	})

	it('should return 201 if successful created profile', done => { 
		request
			.send({ 
				firstName: 'John',
				lastName: 'Doe',
				description: 'Good stuff',
			})
			.end((err, res) => { 
				res.should.have.status(201);
				res.body.should.have.property('profile');
				done();
			}); 
	});

	//need a test to check if duplicate 
});

describe('/POST profile/:id', () => { 
	
});

describe('/GET /profile', () => { 
	beforeEach(() => { 
		request = chai
			.request(app)
			.post('/profile/create')
	})

	after(done => { 
		Profile.remove({})
			.then(() => done());
	});

	it('should return 200 with all profiles when requested', done => { 
		chai
			.request(app)
			.get('/profile')
			.end((err, res) => { 
				res.should.have.status(200);
				res.body.should.have.property('profiles');
				done();
			});
	});
});
