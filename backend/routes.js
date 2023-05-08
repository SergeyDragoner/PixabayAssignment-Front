const axios = require('axios');

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};


const sortByIds = (item1, item2) => {
  // console.log(item1.id);
  return item2.id - item1.id;
};

const GetItems = async (req, res) => {
  const page = req.query.page;
  const category = req.query.category;
  const isSortRequired = req.query.sort ? true : false;
  const sortType = isSortRequired ? req.query.sort : null;

  console.log(category, page);

  // Should be in .env
  const url = `https://pixabay.com/api/`;
  const key = `25540812-faf2b76d586c1787d2dd02736`;

  try {
    const { data } = await axios.get(url, { params: { key, q: category } });
    const itemArray = data.hits;
    let result = paginate(itemArray, 9, page);

    if (isSortRequired && (sortType === 'date' || sortType === 'id')) {
      result = result.sort(sortType === 'date' ? sortByDates : sortByIds);
    }

    res.send(result);
  } catch (error) {
    res.send([]); // Failed to finish api request + send right status code
  }
};

const Routes = {
  ITEMS: GetItems,
};

module.exports = { Routes };
