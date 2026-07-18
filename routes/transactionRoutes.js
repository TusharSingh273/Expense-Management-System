const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const transactionController =
require("../controllers/transactionController");

router.post(
    "/add",
    verifyToken,
    transactionController.addTransaction
);

router.get(
    "/",
    verifyToken,
    transactionController.getTransactions
);

router.get(
    "/:id",
    verifyToken,
    transactionController.getTransactionById
);

router.put(
    "/:id",
    verifyToken,
    transactionController.updateTransaction
);

router.delete(
    "/:id",
    verifyToken,
    transactionController.deleteTransaction
);

module.exports = router;