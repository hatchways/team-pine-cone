const { date: fakerDate, random } = require("faker");
const {
  addMonths,
  eachHourOfInterval,
  getYear,
  getMonth,
  getDay,
  differenceInHours,
} = require("date-fns");

const createAvailbility = function () {
  const grid = [];
  const randomDateBetweenNowAndAMonth = () => {
    const today = new Date();
    return fakerDate.between(today, addMonths(new Date(), 1));
  };

  for (let i = 0; i < 10; i++) {
    let randomDay = randomDateBetweenNowAndAMonth();

    const randomHour = random.number({
      min: 8,
      max: 19,
    });

    const year = getYear(randomDay);
    const month = getMonth(randomDay);
    const day = getDay(randomDay);

    grid.push({
      start: new Date(year, month, day, randomHour),
      end: new Date(year, month, day, randomHour + 1),
    });
  }

  const availability = grid
    .sort((a, b) => {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    })
    .reduce((acc, date) => {
      if (acc.length === 0) return [date];
      const lastDate = acc[acc.length - 1];
      const diff = differenceInHours(
        new Date(lastDate.end),
        new Date(date.start)
      );
      if (diff === 0 || diff === 1) {
        lastDate.end = date.end;
        return acc;
      } else {
        return [...acc, date];
      }
    }, []);

  return availability;
};

module.exports = { createAvailbility };
