import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import 'dotenv/config'


const app=express();
let port=3000||process.env.PORT;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//connect to mongoDb
mongoose.connect("mongodb+srv://admin-mahmoud:mahmoud123@cluster0.rkskfqb.mongodb.net/ToDoListDb");
const itemsSchema=new mongoose.Schema(
{
    name:String
});

const Item=mongoose.model("item",itemsSchema);

const todo1=new Item(
    {
        name:"we are going to play"
    });

const todo2=new Item(
{
    name:"we are going to play"
});

//Item.insertMany([todo1,todo2]);
    

const workSchema=new mongoose.Schema(
    {
        name:String
    });
    
    const Work=mongoose.model("work",itemsSchema);
    
    const work1=new Work(
        {
            name:"finish the backend task"
        });
    
    const work2=new Work(
    {
           name:"attend the meeting"
    });


    //Work.insertMany([work1,work2]);



app.listen(port,()=>
{
    console.log("port started on port:"+port);
});



app.get("/",async(req,res)=>
{
    const ToDos=await Item.find();    
    res.render("index.ejs",{tasks:ToDos});

})

app.get("/work",async(req,res)=>
{    
    const work=await Work.find();
    res.render("index2.ejs",{works:work});
});

app.post("/today",async(req,res)=>
{
    //add new task
    const newToDo= new Item({name:req.body.task});
    newToDo.save();

    //get all tasks 
    const ToDos=await Item.find();  
    res.render("index.ejs",{tasks:ToDos});

});


app.post("/work",async (req,res)=>
{
    //add new work items
    const workItem=new Work({name:req.body.task});
    workItem.save();

    //get all work items
    const work=await Work.find();
    res.render("index2.ejs",{works:work});
});


app.post("/deleteItem",async(req,res)=>
{    
    const id= req.body.checkBox;
    await Item.deleteOne({_id:id});
    res.redirect("/")
});


app.post("/deleteWork",async(req,res)=>
{   

    const id= req.body.checkBox;
    await Work.deleteOne({_id:id});
    res.redirect("/work")
});
