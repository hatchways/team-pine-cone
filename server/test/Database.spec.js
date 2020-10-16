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
          firstName: "John",
          lastName: "Smith",
          gender: "male",
          birthDate: new Date("01-01-1990"),
          description: "This is not a test",
          availability: [
            {
              start: new Date("10-01-2020"),
              end: new Date("10-31-2020"),
            },
          ],
          isSitter: true,
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
          phone: "555-555-5555"
        });
        testProfile.save(done)
      });

      it('Save with only first name, last name, birth date, phone, and location filled', done => {
        const testProfile = new db.Profile({
          firstName: "Joe",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save(done)
      });

      it('Save gender as "prefer not to say" if none specified', done => {
        const testProfile = new db.Profile({
          firstName: "Jane",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save().then(profile => {
          expect(profile.gender).to.eql('prefer not to say')
          done()
        })
      })

      it('Save isSitter as false if not specified', (done) => {
        const testProfile = new db.Profile({
          firstName: "Jane",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save().then((profile) => {
          expect(profile.isSitter).to.eql(false);
          done();
        });
      });

      it('Don\'t save without first name', done => {
        const testProfile = new db.Profile({
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save(err => {
          if (err) { 
            return done() 
          }
          throw new Error('No first name should throw an error');
        })
      })

      it('Don\'t save without last name', (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          birthDate: new Date("01-01-1990"),
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error('No last name should throw an error');
        });
      });

      it("Don't save without phone number", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          lastName: "Smith",
          birthDate: new Date("01-01-1990"),
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("No phone number should throw an error");
        });
      });

      it("Don't save without birth date", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          lastName: "Smith",
          phone: "555-555-5555",
          location: {
            type: "Point",
            coordinates: [-122.5, 37.7],
          },
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("No birth date should throw an error");
        });
      });

      it("Don't save without location", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          lastName: "Smith",
          phone: "555-555-5555",
          birthDate: new Date("01-01-1990"),
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("No location should throw an error");
        });
      });

      it('Retrieves data from the database', done => {
        db.Profile.find({firstName: 'John'}, (err, profile) => {
          if (err) {
            throw err
          }
          if (!profile) {
            throw new Error('No data found')
          }
          done()
        })
      })

      it("Rejects user if under 18", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          lastName: "Smith",
          birthDate: new Date(),
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("Under 18 should throw an error");
        });
      });

      it("Rejects if availability contains a negative range", (done) => {
        const testProfile = new db.Profile({
          firstName: "John",
          lastName: "Smith",
          availability: [
            {
              start: new Date("11-01-2020"),
              end: new Date("10-31-2020"),
            },
          ],
        });
        testProfile.save((err) => {
          if (err) {
            return done();
          }
          throw new Error("Negative date range should throw an error");
        });
      });
    })

    after(function (done) {
      mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done);
      });
    });
})