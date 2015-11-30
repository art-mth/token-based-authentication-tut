/*

dataCtrl.js
configuring routes for dataRouter

*/

module.exports = function() {
  return {
    getData: function(req, res) {
      res.json('Congrats you successfully retrieved data from the server');
    }
  };
};
