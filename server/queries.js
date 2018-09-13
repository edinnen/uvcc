const axios = require('axios');

function getInstagram(req, res) {
  try {
    axios
      .get(
        'https://api.instagram.com/v1/users/self/media/recent/?access_token=3936531534.1677ed0.3ba966d9e8b9436c90188c7abf153810',
      )
      .then(result => {
        res.status(200).send(result.data.data);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  getInsta: getInstagram,
};
