const express=require('express');
const cors=require('cors');
var app=express();
const bodyParser=require('body-parser');
  
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var routes=require('./router/personRouter');
routes(app);
app.listen(9008,()=>{
    console.log("port no 9008 is on....");
})