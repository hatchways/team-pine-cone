require("dotenv").config();

const { Profile } = require("../models/");
const mongodbUri = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const { name, random, date: fakerDate, lorem, phone, image } = require("faker/locale/en_CA");

const genders = Profile.schema.paths.gender.enumValues;

const createBirthdate = subYear => new Date(new Date().getFullYear() - subYear, 1, 1);
const minDate = createBirthdate(19);
const maxDate = createBirthdate(90);

//const createDate = month => new Date(new Date().getFullYear, );
const nearestMonthDate = () => {
	const today = new Date();
	return fakerDate.between(today, new Date(today.getFullYear, 11, 1));
};

(async function () {
	/*
  const connection = await mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  */

	let profiles = [];

	for (let i = 0; i < 15; i++) { 
		const user = { 
			firstName: name.firstName(),
			lastName: name.lastName(),
			gender: random.arrayElement(genders),
			birthDate: fakerDate.between(minDate, maxDate),
			description: lorem.paragraph(),
			isSitter: true,
			
			phone: phone.phoneNumber("+1 (!##) !##-####"),
			photo: image.avatar(),
		};

		profiles.push(user);
	}

	console.log(nearestMonthDate())

})();
