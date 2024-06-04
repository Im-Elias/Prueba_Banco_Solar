import path from "path";
import {
  addUserQuery,
  getUsersQuery,
  editUserQuery,
  deleteUserQuery,
  addTransactionQuery,
  getTransactionsQuery,
} from "../models/queries.js";

const __dirname = path.resolve();

const home = (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
};

const addUser = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const user = await addUserQuery(nombre, balance);
    if (user.rowCount > 0) {
      console.log("User added");
    } else {
      console.log("Error adding user");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getUsersQuery();
    if (users.rowCount > 0) {
      console.log("Users fetched");
      res.send(users.rows);
    } else {
      console.log("Error fetching users");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, balance } = req.body;
    const user = await editUserQuery(id, name, balance);
    if (user.rowCount > 0) {
      console.log("User updated");
    } else {
      console.log("Error updating user");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await deleteUserQuery(id);
    if (user.rowCount > 0) {
      console.log("User deleted");
    } else {
      console.log("Error deleting user");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
};

const addTransaction = async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;
    const transaction = await addTransactionQuery(emisor, receptor, monto);
    if (transaction.rowCount > 0) {
      console.log("Transaction added");
    } else {
      console.log("Error adding transaction");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await getTransactionsQuery();
    if (transactions.rowCount > 0) {
      console.log("Transactions fetched");
      res.send(transactions.rows);
    } else {
      console.log("Error fetching transactions");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export {
  home,
  addUser,
  getUsers,
  editUser,
  deleteUser,
  addTransaction,
  getTransactions,
};
