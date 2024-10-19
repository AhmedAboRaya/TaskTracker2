import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask, 
  getUserTasks ,getCountCompletedTasks} from "../controllers/taskController.js";
const router = express.Router();


router.get("/", getTasks).post("/", createTask);
router.delete("/:id", deleteTask).put("/:id", updateTask);
router.get('/:userId/tasks', getUserTasks);
router.get('/taskCompleted/:userId', getCountCompletedTasks);

export default router;
