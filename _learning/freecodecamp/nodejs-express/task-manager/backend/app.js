import express from "express"
import tasks from "./routes/task.js"

const app = express()

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send("Task Manager App")
})

app.use('/api/v1/tasks', tasks)

/* app.get('api/v1/tasks') - get all the tasks
app.post('api/v1/tasks') - create the tasks
app.get('api/v1/tasks/:id') - get single task
app.patch('api/v1/tasks/:id') - patch a single task
app.delete('api/v1/tasks/:id') - delete task */

const port = 8000;

app.listen(port, console.log(`Server listening on port ${port}`))
