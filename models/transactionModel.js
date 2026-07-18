const db = require("../config/db");

const addTransaction = (
    user_id,
    amount,
    transaction_type,
    category,
    transaction_description,
    transaction_date,
    callback
) => {

    const sql = `
        INSERT INTO transactions
        (user_id, amount, transaction_type, category, transaction_description, transaction_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            amount,
            transaction_type,
            category,
            transaction_description,
            transaction_date
        ],
        callback
    );
};

const deleteTransaction = (id, callback) => {

    const sql = `
        DELETE FROM transactions
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

const getTransactions = (user_id, callback) => {

    const sql = `
        SELECT *
        FROM transactions
        WHERE user_id = ?
        ORDER BY transaction_date DESC
    `;

    db.query(sql, [user_id], callback);

};

const getTransactionById = (id, callback) => {

    const sql = `
        SELECT *
        FROM transactions
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

const updateTransaction = (
    id,
    amount,
    transaction_type,
    category,
    transaction_description,
    transaction_date,
    callback
) => {

    const sql = `
        UPDATE transactions
        SET
            amount=?,
            transaction_type=?,
            category=?,
            transaction_description=?,
            transaction_date=?
        WHERE id=?
    `;

    db.query(sql,
        [
            amount,
            transaction_type,
            category,
            transaction_description,
            transaction_date,
            id
        ],
        callback
    );

};

module.exports = {
    addTransaction,
    getTransactions,
    deleteTransaction,
    getTransactionById,
    updateTransaction
};