const express=require('express');
const app=express();
const PORT=3010;

const people=[
    {
        "name":"pooja",
        "age":19
    },
    {
        "name":"abhipsa",
        "age":21
    },
    {
        "name":"abhiraj",
        "age":30
    }
]

app.get('/',(req,res)=>{
    res.send("WELCOME TO API TESTING ");
});

app.get('/api/people',(req,res)=>{
    res.send({"data":people});
});

app.listen(PORT,()=>{
    console.log("Listening on "+ PORT);
})