const express= require('express');
var app=express();
const hbs = require('hbs');
const fs = require('fs');

const port=process.env.PORT || 3000;

/* For static Website use app.use(); by providing the path for files that files can be accessed directly by its full name */
//app.use(express.static(__dirname+'/views'));
/*ends----*/
/* Middleware example starts from here*/
app.use((req,res,next)=>{
  var log = `${req.originalUrl} ${new Date().toString()} \n`;
console.log(log);
fs.appendFile('server.log',log,(err)=>{
});
  next();//next is used for executing code further without this code will not be executed any futher
});

/*Middleware ends here*/
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});
///Routes...
app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
title:'Projects',
paragraph:'Heres my projects'  
});
});
app.get('/x',(req,res)=>{
//res.send({hello:'skdjs'});
res.render('about.hbs',{
title:'hii there '
})  ;
});

app.get('/',(req,res)=>{
//res.send('<h1>Hello Express</h1>');
res.render('some.hbs',{
title:'First Node Applications',
paragraph:'Hey There i don\'t what to do with my life i am stuck this mortal human form '
});
});
app.listen(port,()=>{
  console.log('Server is up on port 3000');
});

app.get('/bad',(req,res)=>{
res.send({
errorMessage:'Unable to fullfill your request'
});
});
