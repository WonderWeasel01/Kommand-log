// backend/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Der opstod en fejl på serveren',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export default errorHandler;