const { users, tasks } = require("../data");


// Get all tasks for authenticated user
exports.getAllTask = (req, res) => {
  try {
    const userTasks = tasks.filter((task) => task.userId === req.user.id);
    return res
      .status(200)
      .send({
        success: true,
        message: "all task get for authenticated user",
        data: userTasks,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Get a single task by ID for authenticated user
exports.getSingleTask =  (req, res) => {
  try {
    const task = tasks.find(
        (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id
      );
      if (!task) return res.status(404).send("Task not found");
      return res
      .status(200)
      .send({
        success: true,
        message: "single task by ID for authenticated user",
        data: task,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
    
  }
};

// Create a new task for authenticated user
exports.createTask =  (req, res) => {
 try {
    const { title, completed } = req.body;
    const newTask = {
      id: tasks.length + 1,
      title,
      completed,
      userId: req.user.id 
    };
    tasks.push(newTask);
    res.status(201).json({
        success: true,
        message: "single task by ID for authenticated user",
        data: newTask,
      });
 } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
    
 }
}

// Update a task by ID for authenticated user
exports.updateTask = (req, res) => {
  try {
    const task = tasks.find(
        (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id
      );
      if (!task) return res.status(404).send("Task not found");
    
      const { title, completed } = req.body;
      task.title = title || task.title;
      task.completed = completed !== undefined ? completed : task.completed;
      res.status(200).json({
        success: true,
        message: "update task by ID for authenticated user",
        data: task,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
    
  }
};

// Delete a task by ID for authenticated user
exports.deleteTask = (req, res) => {
  try {
    const taskIndex = tasks.findIndex(
        (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id
      );
      if (taskIndex === -1) return res.status(404).send("Task not found");
    
      tasks.splice(taskIndex, 1);
      res.status(200).json({
        success: true,
        message: "delete task by ID for authenticated user",
       
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}
