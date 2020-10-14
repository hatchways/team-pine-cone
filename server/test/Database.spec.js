const { expect } = require('chai');
const chai = require('chai');
const mongoose = require('mongoose');
const db = require('../models');

chai.should();

describe('Database Tests', () => {
    before(done => {
        mongoose.connect("mongodb://localhost/team-pine-cone");
        const dbc = mongoose.connection
        dbc.on("error", console.error.bind(console, "connection error"));
        dbc.once("open", function () {
          done();
        });
    })
    
    describe('Profile Model', () => {
      it('Save with all fields filled correctly', done => {
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

      it('Save with only first and last name filled', done => {
        const testProfile = new db.Profile({
          firstName: 'Joe',
          lastName: 'Smith'
        })
        testProfile.save(done)
      });

      it('Save gender as "prefer not to say" if none specified', done => {
        const testProfile = new db.Profile({
          firstName: 'Jane',
          lastName: 'Smith',
        });
        testProfile.save().then(profile => {
          expect(profile.gender).to.eql('prefer not to say')
          done()
        })
      })

      it('Don\'t save without first name', done => {
        const testProfile = new db.Profile({
          lastName: 'Smith'
        });
        testProfile.save(err => {
          if (err) { 
            return done() 
          }
          throw new Error('No first name should throw an error');
        })
      })

      it("Don't save without last name", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("No last name should throw an error");
        });
      });
    })

    after(function (done) {
      mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done);
      });
    });
})