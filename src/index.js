const express = require('express');
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use(require('./routes/index.js'));

//listen
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('escuchando ', PORT);
});