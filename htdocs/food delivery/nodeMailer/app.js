const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to use the path module

const app = express();
const port = 3000; // Adjust the port as needed

app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML files (including success.html and error.html)
app.use(express.static(__dirname)); // Use __dirname to get the current directory

// Handle form submission
app.post('/submit-form', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cookobsofficial@gmail.com',
      pass: 'dskt myal mnzy wgjb', // Use your Gmail app password
    },
  });

  // HTML content for the email
  const html = `
    <h1>New Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"CooKOBS" <cookobsofficial@gmail.com>',
      to: 'cookobsofficial@gmail.com',
      subject: 'ORDER ALERT !',
      html: html,
    });

    console.log('Message sent: %s', info.messageId);
    res.redirect('/success.html'); // Redirect to a success page
  } catch (error) {
    console.error('Error sending email:', error);
    res.redirect('/error.html'); // Redirect to an error page
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
