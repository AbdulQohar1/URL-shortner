
const getAllUrls = async (req , res) => {
  res.send('Get all url')
};

const getUrl = async (req , res) => {
  res.send('get a url')
};

const createUrl = async (req , res) => {
  res.send('Url created')
};

const updateUrl = async (req , res) => {
  res.send('Url updated')
};

const deleteUrl = async (req , res) => {
  res.send('User deleted')
};


module.exports = {
  getAllUrls,
  getUrl,
  createUrl,
  updateUrl,
  deleteUrl
};
