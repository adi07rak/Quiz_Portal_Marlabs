const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = config.get('app_port');
const db_connect = config.get('mongoDB_host') + ':' + config.get('mongoDB_port') + '/' + config.get('dbName');
const authRoutes = require('./routes/auth.router');
const quizRoutes = require('./routes/quiz.router');

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb7c06ec1fc7b413c95446355c7fa86c2.mailgun.org';
const mg = mailgun({apiKey: 'c8bba50aa35342c3dcca2b6095d9d2b1-1b6eb03d-b94e973c', domain: DOMAIN});
const data = {
	from: 'noreplyTo@quiz-portal.com',
	to: 'adityarjani5@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://localhost:4200'
}));

// mongoose.set('useFindAndModify', false);
mongoose.connect(db_connect, { useNewUrlParser: true })
    .then(() => {
        console.log('Connection established!!')
    })
    .catch((error) => {
        console.log('Error Connenction: ', error.message);
    });

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);

const topicmodel = require('./models/technology.model');
app.post('/addtemp', (req,res)=>{
    var nt = new topicmodel();
    nt.title = req.body.title;
    nt.description = req.body.description;
    nt.technology = req.body.technology;
    nt.save((error,data)=>{
        if(error) {
            console.log('error:::==>>', error);
        }
        else{ 
            console.log('data:::==>>', data);
        }
    });
    
});

app.put('/update', (req,res)=>{
    topicmodel.findOneAndUpdate({_id:req.body._id}, req.body, {new: true},(error, data)=>{
        if(error) {
            console.log('error',error)
        } else {  
            console.log('res',data);
        }
    })
})



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});

