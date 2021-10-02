const express = require('express');
const app = express();
const multer = require('multer')
app.use(express.static('frontend'));
const morgan = require("morgan");
const cors = require("cors");
const hbs = require('nodemailer-handlebars');
const nodemailer = require("nodemailer");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
const knex = require("knex");

const { v4: uuidv4 } = require("uuid");
const { unique } = require('jquery');

// Create database object
const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "madhu$19",
    database: "rcme",
  },
});
app.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});


app.post("/user", (req, res) => {
  const {
    studentName,
    studentAge,
    grade,
    parentName,
    email,
    phoneNumber,
    school,
    region,
    city,
    address,
    pincode,
    payment,
    ageGroup,
  } = req.body;
  const uniqueid = uuidv4();
  console.log(uniqueid);

  db.insert({
    uniqueid,
    studentname:studentName,
    studentage:studentAge,
    grade,
    parentname:parentName,
    email,
    agegroup:ageGroup,
    phonenumber:phoneNumber,
    school,
    region,
    city,
    address,
    pincode,
    payment,
    status:false
  })
    .into("entries")
    .then(() => res.json({ success: true }))
    .catch((err) =>
      console.log({ success: false, message: "upload failed", stack: err.stack })
    );
  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "rotractclub52@gmail.com", // generated ethereal user
      pass: "rcme@1234",
    },
  };
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.studentName}</li>

    </ul>
    <h3>Message</h3>
   
  `;

  var transporter = nodemailer.createTransport(smtpConfig);
//   transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: './views/'
// }));
 
  let mailOptions = {
    from: "rotractclub52@gmail.com", // sender address
    to: email, // list of receivers
    subject: "RCME Registration Successful", // Subject line
  // plain text body
    html: "<h2>Hello "+studentName+",</h2> <h3>Your registration was successful. Please use this id " +uniqueid+"to upload your drawing <a href='http://localhost:3001/upload'>here</a></h3>"
    // template: 'index',
    // context: {
    //     studentName: studentName,
    //     uniqueid: uniqueid
    // }
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});

app.get("/user", function(req, res){

  var count;
    db.raw("SELECT Count(*) from entries")
   .then(data=>{ count=data.rows[0].count} );
    var page = req.query.page
    var per_page = req.query.per_page  
    
    var end = per_page*page;
    var start=  (end - per_page)+1;
  

    db.select("*")
    .from('entries')
      .whereBetween('id', [start, end])
      .then(data => res.json({data:data,count}))
      .catch(err => res
      .status(404)
      .json(
         {
           success: false, 
           message: 'not found', 
           stack: err.stack,
         }
            ),
            );
})


// app.get("/paginated-results", (req, res) => {
//   const page = req.query.page;

//   return db("entries").select("*").paginate({
//     perPage: 10,
//     currentPage: page
//   }).then(results => {
//     res.json(results)
//   })
// })


app.put("/update/:uniqueid", (req, res)=>{

  db("entries")
      .where("uniqueid", req.params.uniqueid)
      .update({
        status:req.body.status,
        mark1: req.body.mark1,
        mark2: req.body.mark2,
        signedby: req.body.signedby,
        remarks: req.body.remarks,
      })
      .then(() => res.json({ success: true }))
      .catch((err) =>
        res.json({
          success: false,
          message: "upload failed",
          stack: err.stack,
        })
      );
})



app.put("/users/:uniqueid", (req, res) => {
  db("entries")
    .where("uniqueid", req.params.uniqueid)
    .update({
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      signedby: req.body.signedby,
      remark: req.body.remark,
    })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.json({
        success: false,
        message: "upload failed",
        stack: err.stack,
      })
    );
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  db.select("*")
    .from("users")
    .where("username", userName)
    .then((data) => {
      res.send(data[0])
    });
});
app.get("/admin", (req, res) => {
  db.select("*")
    .from("entries")
    .then((data) => res.json(data));
});

app.get("/userage", (req, res) => {
  db.select("*")
    .from("entries")
    .where("age", req.body.age)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

app.get("/usercity", (req, res) => {
  db.select("*")
    .from("entries")
    .where("region", req.body.region)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'frontend/src/components/AdminCom/public/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')
app.get("/",(req,res)=>{
    res.send("hello");
})



app.put('/upload/:uniqueid', (req, res) => {
    
    upload(req, res, (err) => {
        console.log(req.file);
      if (err) {
        res.sendStatus(500);
      }
      
      
    db("entries")
      .where("uniqueid", req.params.uniqueid)
      .update({
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      }).then(() => res.json({ success: true }))
     .catch(err =>
       res.json({ success: false, message: 'upload failed', stack: err.stack }),
     );

     });
  });

  
  app.get("/usersing/:uniqueid", (req, res) => {
    db.select("*")
      .from("entries")
      .where("uniqueid", req.params.uniqueid)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(404).json({
          success: false,
          message: "not found",
          stack: err.stack,
        })
      );
  });
  
  app.listen(3050, () => {
    console.log(`Example app listening at http://localhost:3050`);
  });
  