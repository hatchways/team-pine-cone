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
const jobTitles = Profile.schema.paths.jobTitle.enumValues;

const randomDateBetweenNowAndAMonth = () => {
  const today = new Date();
  return fakerDate.between(today, addMonths(new Date(), 1));
};

const TorontoGPS = [-79.447256, 43.6824164];
const QuebecCityGPS = [-71.2074252, 46.8141835];
const MontrealGPS = [-73.553363, 45.509062];
const CalgaryGPS = [-114.05803, 51.046362];

const adressGroup = [
  ["Toronto, ON", TorontoGPS],
  ["Quebec City, QC", QuebecCityGPS],
  ["Montreal, QC", MontrealGPS],
  ["Calgary, AB", CalgaryGPS],
];

const ratings = [0, 1, 2, 3, 4, 5];

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
      const [address, coordinates] = random.arrayElement(adressGroup);
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
        firstName: name.firstName().replace(/[0-9]/g, ""),
        lastName: name.lastName().replace(/[0-9]/g, ""),
        gender: random.arrayElement(genders),
        birthDate: randomBirthDate,
        description: lorem.paragraph(),
        isSitter: i > 1,
        rating: random.arrayElement(ratings),
        hourlyRate: random.float({
          min: 0,
          max: 300,
        }),
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
        address: address,
        phone: phone.phoneNumber("+1 (!##) !##-####"),
        photo: image.avatar(),
        jobTitle: random.arrayElement(jobTitles),
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
