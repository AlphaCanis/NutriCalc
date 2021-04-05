const express=require('express');
const mongoose=require('mongoose');

const app= express();
app.use(express.json());

//schema for food collection
const foodSchema=new mongoose.Schema({
    name:String,
    calories:Number,
    protien:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,
})

const foodModel=new mongoose.model("foods",foodSchema);




//mongo connection 
mongoose.connect("mongodb://127.0.0.1:27017/nutrition",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected");
})
//for creating data-> post
//get to fetch data
//put to update data
//gettting data get request
app.post("/food/create",(req,res)=>{
    const food=req.body;

    let foodObj=new foodModel(food);
    foodObj.save().then(()=>{
        res.send({status:"food stored"});
      
    })
    
})

//route to fetch data

app.get("/food",async (req,res)=>{      //await and async to make the code synchronous

    let foods=await foodModel.find();  //asychronous task-> task not make ur code wait

    res.send({foods:foods});
})

// app.get('/demo',(req,res)=>{
//     console.log('get request called');
//     res.send('response is done');
// })

app.listen(8000);