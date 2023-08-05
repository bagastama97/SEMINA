const { StatusCodes } = require("http-status-codes");
const { getAllOrders } = require("../../../services/mongoose/order");

const index = async (req, res, next) => {
  try {
    const result = getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: {
        order: result.data,
        pages: (await result).pages,
        total: result.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };
