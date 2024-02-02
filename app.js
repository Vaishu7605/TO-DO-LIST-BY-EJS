const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({exxtended:true}));

let newItems = []
app.get('/',(req,res) => {
    let options = { weekday: 'long', year:'numeric', month: 'long',
    day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {kindofday: day, newListItems: newItems} );
});

app.post('/', (req,res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');
})

// app.get('/delete/:id', async(req,res)=>{
//     deleteStudent = await Student.findByIdAndDelete(req.params.id);
//     res.redirect('/')
// })

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < newItems.length) {
        newItems.splice(id, 1);
    }
    res.redirect('/');
});

app.listen(3000, ()=>console.log('port is running at server 3000'))