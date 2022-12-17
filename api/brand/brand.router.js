const express = require("express");
const router = express.Router();

const brandController = require("./brand.controller");

// router.post('/get-products-by-dates-idlp', productController.getRoomsByDatesIdlp);
// router.post('/get-products-by-dates-idlp-number', productController.getRoomsByDatesIdlpNumber);
// router.get('/get-products-by-idbill-with-bill/:id', productController.getDataByIdBillWithBill);
// router.get('/get-products-by-idbooking-with-bill/:id', productController.getDataByIdBookingWithBill);

router.get("/", brandController.index);
router.post("/", brandController.store);
router.put("/", brandController.update);
router.delete("/:idBrand", brandController.destroy);
// router.get('/:id', productController.show);
// router.put('/:id', productController.update);
// router.delete('/:id', productController.destroy);

module.exports = router;
