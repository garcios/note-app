const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

/////############ HBS SETUP ###############///
app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');

//CSS
app.use("/css", express.static(__dirname + '/public/css'))

const jsonParser = bodyParser.json(); 

//GET
app.get('/add_note', (req,res)=>{
  res.render('add_note');
});


app.get('/', (req,res)=>{

    fetch('http://localhost:3004/messages')
    .then(response=>{
        response.json().then(json =>{
            res.render('home',{
                articles: json
            });
        })
    })
    .catch(error =>{
        console.log(error);
    })


  
});

//POST
app.post('/api/add_note', jsonParser,(req,res)=>{
  
    fetch('http://localhost:3004/messages',{
        method: 'POST',
        body: JSON.stringify(req.body),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response=>{
        res.status(200).send();
    })
    .catch(error =>{
        console.log(error);
    })

});

// DELETE
app.delete('/api/delete/:id', (req,res)=>{
  
    const id = req.params.id;
    
    fetch(`http://localhost:3004/messages/${id}`,{
       method: 'DELETE' 
    }).then(response=>{
        res.status(200).send();
    })
    .catch(error =>{
        console.log(error);
    })


});


/////############ PORT ###############///

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server up on port ${port}`);
})
