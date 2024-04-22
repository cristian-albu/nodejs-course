function httpGetOrders(req, res) {
  console.log(req);

  return res.status(200).json({
    worked: true,
  });
}

module.exports = {
  httpGetOrders,
};
