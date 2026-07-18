const Transaction = require("../models/transactionModel");

const addTransaction = (req, res) => {

    const {
        amount,
        transaction_type,
        category,
        transaction_description,
        transaction_date
    } = req.body;

    const user_id = req.user.id;

    Transaction.addTransaction(
        user_id,
        amount,
        transaction_type,
        category,
        transaction_description,
        transaction_date,
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Transaction Added Successfully"
            });

        }
    );

};

const getTransactions = (req, res) => {

    const user_id = req.user.id;

    Transaction.getTransactions(user_id, (err, result) => {

        if(err){

            return res.status(500).json({
                message: err.message
            });

        }

        res.json(result);

    });

};

const deleteTransaction = (req, res) => {

    const id = req.params.id;

    Transaction.deleteTransaction(id, (err, result) => {

        if(err){

            return res.status(500).json({
                message: err.message
            });

        }

        res.json({
            message: "Transaction Deleted Successfully"
        });

    });

};

const getTransactionById = (req, res) => {

    Transaction.getTransactionById(
        req.params.id,
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result[0]);

        }
    );

};

const updateTransaction = (req, res) => {

    const id = req.params.id;

    const {
        amount,
        transaction_type,
        category,
        transaction_description,
        transaction_date
    } = req.body;

    Transaction.updateTransaction(
        id,
        amount,
        transaction_type,
        category,
        transaction_description,
        transaction_date,
        (err, result)=>{

            if(err){

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({
                message:"Transaction Updated Successfully"
            });

        }
    );

};

module.exports = {
    addTransaction,
    getTransactions,
    deleteTransaction,
    getTransactionById,
    updateTransaction
};