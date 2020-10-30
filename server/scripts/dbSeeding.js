require("dotenv").config();

const { Profile } = require("../models/");
const mongoose = require("mongoose");
const got = require("got");
const { addMonths, subYears } = require("date-fns");
const {
  name,
  random,
  date: fakerDate,
  lorem,
  phone,
  image,
} = require("faker/locale/en_CA");

const mongodbUri = process.env.MONGODB_URI;
const genders = Profile.schema.paths.gender.enumValues;

const randomDateBetweenNowAndAMonth = () => {
  const today = new Date();
  return fakerDate.between(today, addMonths(new Date(), 1));
};

const Toronto = [-79.447256, 43.6824164];
const QuebecCity = [-71.2074252, 46.8141835];
const Montreal = [-73.553363, 45.509062];
const Calgary = [-114.05803, 51.046362];

const mainCitiesGPS = [Toronto, QuebecCity, Montreal, Calgary];

(async function () {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    await mongoose.connection.db.dropDatabase();

    for (let i = 0; i < 15; i++) {
      let availabilityStart = randomDateBetweenNowAndAMonth();
      let availabilityEnd = randomDateBetweenNowAndAMonth();
      const coordinates = random.arrayElement(mainCitiesGPS);
      const randomBirthDate = fakerDate.between(
        subYears(new Date(), 19),
        subYears(new Date(), 90)
      );

      if (availabilityStart > availabilityEnd) {
        [availabilityEnd, availabilityStart] = [
          availabilityStart,
          availabilityEnd,
        ];
      }

      const mock = {
        firstName: name.firstName(),
        lastName: name.lastName(),
        gender: random.arrayElement(genders),
        birthDate: randomBirthDate,
        description: lorem.paragraph(),
        isSitter: i > 1,
        availability: [
          {
            start: availabilityStart,
            end: availabilityEnd,
          },
        ],
        location: {
          type: "Point",
          coordinates: coordinates,
        },
        phone: phone.phoneNumber("+1 (!##) !##-####"),
        photo: image.avatar(),
      };

      const { body } = await got.post("http://localhost:3001/register", {
        json: {
          firstName: mock.firstName,
          lastName: mock.lastName,
          birthDate: mock.birthDate,
          phone: mock.phone,
          email: `user${i}@test.com`,
          password: "123456",
        },
        responseType: "json",
      });

      await got.put(`http://localhost:3001/profile/${body.user.profile}`, {
        json: {
          ...mock,
        },
      });
    }

    console.log("Seeding successful");
    process.exit();
  } catch (err) {
    console.log(err.message);
    console.log("Seeding failed");
    process.exit();
  }
})();
