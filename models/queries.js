import { text } from "express";
import pool from "../config/db.js";

const addUserQuery = async (nombre, balance) => {
  try {
    const query = {
      text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
      values: [nombre, balance],
    };
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

const getUsersQuery = async () => {
  try {
    const query = {
      text: "SELECT * FROM usuarios",
    };
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

const editUserQuery = async (id, nombre, balance) => {
  try {
    const query = {
      text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *",
      values: [nombre, balance, id],
    };
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

const deleteUserQuery = async (id) => {
  try {
    const query = {
      text: "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      values: [id],
    };
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

const addTransactionQuery = async (emisor, receptor, monto) => {
  try {
    await pool.query("BEGIN");

    const senderIdQuery = {
      text: "SELECT id FROM usuarios WHERE nombre = $1",
      values: [emisor],
    };
    const senderIdResult = await pool.query(senderIdQuery);
    const emisorId = senderIdResult.rows[0].id; // Assuming username is unique

    const receiverIdQuery = {
      text: "SELECT id FROM usuarios WHERE nombre = $1",
      values: [receptor],
    };
    const receiverIdResult = await pool.query(receiverIdQuery);
    const receptorId = receiverIdResult.rows[0].id; // Assuming username is unique

    const query = {
      text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [emisorId, receptorId, monto, "now()"],
    };
    const senderSubtraction = {
      text: "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
      values: [monto, emisorId],
    };
    const receiverAddition = {
      text: "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
      values: [monto, receptorId],
    };
    await pool.query(senderSubtraction);
    await pool.query(receiverAddition);
    const result = await pool.query(query);
    await pool.query("COMMIT");
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

const getTransactionsQuery = async () => {
  try {
    const query = {
      text: "SELECT * FROM transferencias",
      rowMode: "array",
    };
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error :" + error.code + "\nMensaje: " + error.message);
  }
};

export {
  addUserQuery,
  getUsersQuery,
  editUserQuery,
  deleteUserQuery,
  addTransactionQuery,
  getTransactionsQuery,
};
