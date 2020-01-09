var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io')(server);



const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const empData = require('./employee.json');

// const empRecord = require('./emp-record.json');

// const chartData = require('./chart-data.json');

const listOfRegisteredUsers = require('./list-of-register-user.json');

const newEmpCameInFrontOfCamera = require('./new-emp-data.json');
const newEmpCameInFrontOfCameraOne = require('./new-emp-data.1.json');
const newEmpCameInFrontOfCameraTwo = require('./new-emp-data.2.json');
const newEmpCameInFrontOfCameraThree = require('./new-emp-data.3.json');


// app.listen(3000, () => {
//  console.log("Server running on port 3000");
// });

// Initialize our websocket server on port 5000
server.listen(3000, () => {
    console.log("started on port 5000");
});

// app.post("/employee-attendance", (req, res, next) => {
//     console.log("=========== BOdy Payload =============");
//     console.log(req.body);

//     console.log("============ Header ==============");
//     console.log(JSON.stringify(req.headers));

//     console.log(req.body.awi_label);

//     if( req.body.awi_label ) {
//         console.log("===================== Serving employee data ======================= ");
//         res.json(empRecord);
//     } else if( req.body.awi_chart_data ) {
//         console.log("===================== Serving chart data ======================= ");
//         res.json(chartData);
//     } else {
//         console.log("===================== Serving normal data ======================= ");
//         res.json(empData);
//     }

// });

app.post('/employee-attendance', (req, res, next) => {
    console.log("=========== empdata =============");
    res.json(empData);
})

app.post('/list_of_registered_users', (req, res, next) => {
    console.log("=========== Serving list_of_registered_users =============");
    res.json(listOfRegisteredUsers);
})

app.get('/new_emp', (req, res, next) => {
    console.log("=========== Serving list_of_registered_users =============");
    res.json(newEmpCameInFrontOfCamera);
})

io.on("connection", socket => {
    // Log whenever a user connects
    console.log("user connected");
  
    // Log whenever a client disconnects from our websocket server
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

  
    socket.on("message", () => {
        // setInterval(() => {
        // console.log("Message Received: " );
        //     io.emit("message", newEmpCameInFrontOfCamera);
        // }, 5000);
        setTimeout(() => {
            console.log("Message Received: " );
            io.emit("message", newEmpCameInFrontOfCameraOne);
        }, 7000);
        setTimeout(() => {
            console.log("Message Received: " );
            io.emit("message", newEmpCameInFrontOfCameraTwo);
        }, 10000);
        // setTimeout(() => {
        //     console.log("Message Received: " );
        //     io.emit("message", newEmpCameInFrontOfCameraThree);
        // }, 11000);
      });
  
    
});
