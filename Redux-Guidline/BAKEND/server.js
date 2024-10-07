const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let tasks = [
    {id:1, task:"Start creating redux application", completed: true},
    {id:2, task:"Design Redux store", completed: true},
    {id:3, task:"Define all actions list", completed: false},
    {id:4, task:"Create reducers", completed: false},
    {id:5, task:"Create store using reducers", completed: false},

]

app.get("/api/tasks", (req, res)=>{
    res.json(tasks);
});

app.post("/api/tasks", (req, res)=>{
    const newTask = {id:tasks.length+1, ...req.body, completed:false};
    tasks.push(newTask);
    console.log(tasks);
    res.json(newTask);
});

app.patch("/api/tasks/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task)=> task.id===id);
    const task = tasks[index];
    task.completed = req.body.completed;
    res.json(task);

});

app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== id); // Use tasks instead of redeclaring
    res.json(id);
});


app.listen(5000,()=> console.log("Server is running on port 5000"));




