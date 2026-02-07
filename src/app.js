const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.send(people);
});

app.post('/api/people',(req,res)=>{
    const {name,age}=req.body;

    if(!name || !age){
        return res.status(400).json({error:'Name or age not mentioned'});
    }
    console.log("Received Data:",{name,age});

    const newPerson={name,age};
    people.push(newPerson);

    res.status(201).json({
        message:"Profile created successfully",
        data:{name,age}
    });
});

app.get('/api/people/:id',(req,res)=>{
    const id=parseInt(req.params.id);

    if(id<0 || id>=people.length){
        return res.status(404).json({error:"No people available"});
    }

    res.json(people[id]);
});

app.put('/api/people/:id',(req,res)=>{  
    const id=parseInt(req.params.id);

    if(id<0 || id>=people.length){
        return res.status(404).json({error:'Person does not exist'});
    }

    const {name,age}=req.body;

    if(name && age) {
        people[id].name=name;
        people[id].age=age;
    }

    res.status(201).json({
        message:`Profile ${id} updated successfully`
    });
});

app.delete('/api/people/:id',(req,res)=>{
    const id=parseInt(req.params.id);

    if(id<0 || id>=people.length){
        return res.status(404).json({error:"Person does not exist"});
    }

    const deleted= people.splice(id,1);

    res.send(`Person with id ${id} deleted succesfully`);
});

app.listen(PORT,()=>{
    console.log("Listening on "+ PORT);
})