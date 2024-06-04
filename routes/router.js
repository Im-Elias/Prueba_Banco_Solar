import { Router } from "express";
import {
  addUser,
  home,
  getUsers,
  editUser,
  deleteUser,
  addTransaction,
  getTransactions,
} from "../controllers/controller.js";

const router = Router();

router.get("/", home);

router.post("/usuario", addUser);

router.get("/usuarios", getUsers);

router.put("/usuario", editUser);

router.delete("/usuario", deleteUser);

router.post("/transferencia", addTransaction);

router.get("/transferencias", getTransactions);

export default router;
