
// Server file starts it all. 

const express = require('express');
const mongoose = require('mongoose'); // database connection
const cors = require('cors') // Cross Origin - Send data across differnt domains

const bodyParser = require('body-parser'); // Send a receive data
const users = require('./routes/users');
const passport = require('passport'); // Store the password in a secure way.

const app = express();

// Body parser middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// // DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res) => res.json({msg:"hello my name is"}));
app.get('/about', (req,res) => res.send("Our company was founded in 2015"));
app.use('/users', users);

app.get('/dashboard', passport.authenticate('jwt', {session:false}),(req,res) => {
  return res.json({
    data: [
      {
        "name": "Mina Beach Club",
        "type": "Pool & Beach",
        "price": "250 AED"
      },
      {
        "name": "Nations Beach Club",
        "type": "Golf Day",
        "price": "500 AED"
      },
      {
        "name": "Kempinski Palm",
        "type": "Spa Day",
        "price": "800 AED"
      }
      {
        "name": "Sofitel Beach,
        "type": "Pool & Beach",
        "price": "880 AED"
      }
      {
        "name": "Hilton JBR",
        "type": "Spa Day",
        "price": "500 AED"
      }
      {
        "name": "Fairmont Palm",
        "type": "Golf Day",
        "price": "1500 AED"
      }
      {
        "name": "Atlantis Palm",
        "type": "Pool & Beach",
        "price": "950 AED"
      }
    ]
  })
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));