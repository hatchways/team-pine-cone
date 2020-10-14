const chai = require('chai');
const mongoose = require('mongoose');
const db = require('../models');

chai.should();

describe('Database Tests', () => {
    before(done => {
        mongoose.connect("mongodb://localhost/team-pine-cone");
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function () {
          done();
        });
    })
    describe('Profile Model', () => {
      it('Should save with all fields filled correctly', done => {
        const testProfile = new db.Profile({
          firstName: 'John',
          lastName: 'Smith',
          gender: 'male',
          birthDate: new Date('01-01-1990'),
          description: 'This is not a test',
          availability: [
            {
              start: new Date('10-01-2020'),
              end: new Date('10-31-2020')
            }
          ]
        })
        testProfile.save(done)
      });

      it ('Should save with only first and last name filled', done => {
        const testProfile = new db.Profile({
          firstName: 'John',
          lastName: 'Smith'
        })
        testProfile.save(done)
      });
    })
})