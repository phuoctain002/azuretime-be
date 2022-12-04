const express = require("express");
const router = express.Router();

const cateController = require("./cate.controller");

// router.post('/get-products-by-dates-idlp', productController.getRoomsByDatesIdlp);
// router.post('/get-products-by-dates-idlp-number', productController.getRoomsByDatesIdlpNumber);
// router.get('/get-products-by-idbill-with-bill/:id', productController.getDataByIdBillWithBill);
// router.get('/get-products-by-idbooking-with-bill/:id', productController.getDataByIdBookingWithBill);

router.get("/", cateController.index);
// router.get('/:id', productController.show);
// router.post('/', productController.store);
// router.put('/:id', productController.update);
// router.delete('/:id', productController.destroy);

module.exports = router;
