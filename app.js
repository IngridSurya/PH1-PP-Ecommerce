const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}));

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use('/', require('./routers'));

app.listen(port, () => {
  console.log(`Web app listening on port ${port}`);
})
