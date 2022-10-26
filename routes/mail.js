const router = require("express").Router();
var nodemailer = require("nodemailer");

router.post("/message", async (request, response) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vijaybsbs@gmail.com",
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: "vijaybsbs@gmail.com",
      to: "vijay@vktfabs.com,vijaybsbs@gmail.com",
      subject: request.body.subject,
      text: `Customer Details`,
      html: `<div><h3>Customer</h3>
      <h1>Name</h1> : <p>${request.body.name}</p>
      <h1>Company Name</h1> : <p>${request.body.companyName}</p>
      <h1>position</h1> : <p>${request.body.position}</p>
      <h1>Email ID</h1> : <p>${request.body.mailid}</p>
      <h1>Contact No</h1> : <p>${request.body.contactNo}</p>
      <h1>Address</h1> : <p>${request.body.address}</p>
      <h1>Enquiry</h1> : <p>${request.body.message}</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        response.json({
          message: "Email not send",
        });
      } else {
        console.log("Email sent: " + info.response);
        response.json({
          message: "Email Send",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
