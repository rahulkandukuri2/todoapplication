const express= require('express');
const path= require('path');
const { open }= require('sqlite');
const sqlite3= require('sqlite3')

const dbPath = path.join(__dirname, 'simpleTodo.db')
const app = express();

app.use(express.json())

let db;

const initialiseDbAndServer = async ()=>{
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        app.listen(4000, () =>{
            console.log("server has started on port 5500")
        })
    } catch(e){
        console.log(e.message)
        process.exit(1)
    }
   
}
initialiseDbAndServer()

app.get('/todos',async (request,response)=>{
    const getTodos =`SELECT * FROM todos;`
    const todos = await db.all(getTodos)
    response.send(todos)
})

app.delete('/todos/:id', async (request,response) => { 
    const {id}=request.params;
    console.log(id)
    const deleteTodos =`DELETE FROM todos WHERE id= ${id};`
    await db.run(deleteTodos)
    response.send("Todo Deleted")

})

app.post('/todos',async (request,response)=>{
    const {title}=request.body;
    const postQuery =`INSERT INTO todos (title)
    VALUES ('${title}');`
    await db.run(postQuery)
    response.send("TODO ADDED")
})