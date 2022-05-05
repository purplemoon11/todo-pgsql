const express = require("express")
const app = express()
const env = require("dotenv")
const pool = require("./db")

env.config();

app.use(express.json())

//ROUTES

//get all todos
app.get("/todos", async (req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM tododb")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todos
app.get("/todos/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        const todo = await pool.query("SELECT * FROM tododb WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        
    }
})

//create a todo
app.post("/todos", async (req, res)=>{
    try {
       const {description} = req.body;
       const newTodo = await pool.query("INSERT INTO tododb (description) VALUES ($1) RETURNING *",
       [description]
       );
       res.json(newTodo.rows[0]) 
    } catch (error) {
      console.error(error.message)  
    }
})

//Update a todo
app.put("/todos/:id", async (req, res)=>{
    try {
        const {id} =req.params;
        const {description} = req.body;

        const updateTodo = await pool.query("UPDATE tododb SET description = $1 WHERE todo_id = $2", [description, id])

        res.json("Todo was updated")
    } catch (error) {
        console.error(error.message)
    }
})

//Delete a todo
app.delete("/todos/:id", async (req, res)=>{
    
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM tododb WHERE todo_id = $1", [id])
        res.json("Todo was successfully deleted.")
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})