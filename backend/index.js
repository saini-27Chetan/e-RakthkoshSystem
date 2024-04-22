const express = require("express");
const nodemailer = require("nodemailer");
const mysql = require('mysql');
const app = express();

// Nodemailer transporter setup
const userMail = "chetan27saini@gmail.com";   // Your email Id
const appPassCode = "aujpgtupukanteei";       // Your app password, generate it form the respective application
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: userMail,
    pass: appPassCode
  },
});

app.use(express.json());
const connection = mysql.createConnection({
  host: 'e-rakthkosh-system-database.cz40woq2urck.ap-southeast-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'admin#123456',
  database: 'e_rakthkosh_db'
});

// Attempt to connect to the database
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting database:", err.message);
    return;
  }
  console.log("Database is connected...");
});

// Handle errors during the connection process
connection.on('error', function (err) {
  console.error("Database connection error:", err.message);
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});

// Query to use our e_rakthkosh_db  (Optional: as we are giving the name of our database in the connection itself)
connection.query('use e_rakthkosh_db;', (error, results) => {
  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  console.log(`Connected to e_rakthkosh_db`);
});

// To display hospital, blood bank and blood inventory
app.get('/api/display/:pageText', (req, res) => {
  const pageText = req.params.pageText;
  const tableName = pageText === 'hospitals' ? 'hospital' : pageText === 'blood banks' ? 'bloodbank' : 'bloodinventory';

  const query = `select * from ${tableName}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// To display donor
app.get('/api/display/person/Donor', (req, res) => {
  connection.query('select * from donor', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// To display Recipient
app.get('/api/display/person/Recipient', (req, res) => {
  connection.query('select * from recipient', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// 4. To display Admin
app.get('/api/Admin', (req, res) => {
  connection.query('select * from admin', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Search data entry in hospital, blood bank and blood inventories
app.get('/api/searchPage/:pageText', (req, res) => {
  const pageText = req.params.pageText;
  const searchValue = req.query.search;

  const tableName = pageText === 'hospitals' ? 'hospital' : pageText === 'blood banks' ? 'bloodbank' : 'bloodinventory';
  const query = `select * from ${tableName} where ${tableName}Name = ? OR ${tableName}City = ?`;

  connection.query(query, [searchValue, searchValue], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Handling form submitted by the user
app.post('/api/submit/:pageText', (req, res) => {
  const pageText = req.params.pageText;
  const formData = req.body;
  const tableName = pageText === 'want to donate' ? 'donor' : 'recipient';
  const column = `(${tableName}Name, ${tableName}Email, ${tableName}Contact, ${tableName}City, ${tableName}BloodType)`;
  const values = [formData.name, formData.email, formData.contactNumber, formData.city, formData.bloodGroup];
  const query = `INSERT INTO ${tableName} ${column} values (?, ?, ?, ?, ?)`;

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  });
});

// To add new donor, hospital, etc by the admin
app.post('/api/admin/submit/:pageText', (req, res) => {
  const pageText = req.params.pageText;
  const formData = req.body;

  const tableName = pageText === 'blood inventory' ? 'bloodinventory' : pageText === 'seeker' ? 'recipient' : pageText;

  let columns = '';
  let placeholders = '';
  let values = [];

  if (pageText === 'blood inventory') {
    columns = `(${tableName}Name, ${tableName}Email, ${tableName}Contact, ${tableName}City, bloodUnits, bloodType)`;
    placeholders = '(?, ?, ?, ?, ?, ?)';
    values = [
      formData.name, formData.email, formData.contact, formData.city, formData.bloodUnits, formData.bloodType];
  } else if (pageText === 'donor' || pageText === 'seeker') {
    columns = `(${tableName}Name, ${tableName}Email, ${tableName}Contact, ${tableName}City, ${tableName}BloodType)`;
    placeholders = '(?, ?, ?, ?, ?)';
    values = [
      formData.name, formData.email, formData.contact, formData.city, formData.bloodType];
  } else if (pageText === 'hospital' || pageText === 'blood bank') {
    columns = `(${tableName}Name, ${tableName}Email, ${tableName}Contact, ${tableName}City)`;
    placeholders = '(?, ?, ?, ?)';
    values = [
      formData.name, formData.email, formData.contact, formData.city];
  }

  const query = `INSERT INTO ${tableName} ${columns} VALUES ${placeholders}`;

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  });
});

// Deletion of the entry
app.delete("/api/delete/:pageURL/:id", (req, res) => {
  const pageText = req.params.pageURL;
  const entryId = req.params.id;
  const tableName = pageText === 'hospitals' ? 'hospital' : pageText === 'blood banks' ? 'bloodbank' : pageText === 'Donor' ? 'donor' : pageText === 'Recipient' ? 'recipient' : 'bloodinventory';
  const query = `DELETE FROM ${tableName} WHERE ${tableName}_Id = ?`;

  connection.query(query, [entryId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
});

// After the success of the service, we will delete their entry from the list and save to other data table for future reference
app.post('/api/duplicate/:pageURL', (req, res) => {
  const Name = req.body.DuplicateName;
  const Email = req.body.DuplicateEmail;
  const Contact = req.body.DuplicateContact;
  const City = req.body.DuplicateCity;
  const BloodType = req.body.DuplicateBloodType;
  const pageURL = req.params.pageURL;
  const tableName = pageURL === 'Donor' ? 'donorAccept' : 'recipientAccept';
  const columns = `(${tableName}Name, ${tableName}Email, ${tableName}Contact, ${tableName}City, ${tableName}BloodType)`;
  const placeholders = '(?, ?, ?, ?, ?)';
  const values = [Name, Email, Contact, City, BloodType];

  const query = `INSERT INTO ${tableName} ${columns} VALUES ${placeholders}`;
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  });
});

// Updating the data by the admin
app.put('/api/admin/update/:pageText', (req, res) => {
  const pageText = req.params.pageText;
  const formData = req.body.formData;
  const id = req.body.dataId;
  const tableName = pageText;

  let updateColumns = '';
  let values = [];

  if (pageText === 'bloodinventory') {
    updateColumns = `${tableName}Name = ?, ${tableName}Email = ?, ${tableName}Contact = ?, ${tableName}City = ?, bloodUnits = ?, bloodType = ?`;
    values = [
      formData.name, formData.email, formData.contact, formData.city, formData.bloodUnits, formData.bloodType];
  } else if (pageText === 'hospital' || pageText === 'bloodbank') {
    updateColumns = `${tableName}Name = ?, ${tableName}Email = ?, ${tableName}Contact = ?, ${tableName}City = ?`;
    values = [
      formData.name, formData.email, formData.contact, formData.city];
  }
  const query = `UPDATE ${tableName} SET ${updateColumns} WHERE ${tableName}_id = ?`;

  connection.query(query, [...values, id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
});

// ***********************************************************************
// Sending Email on Rejection and on Acceptance
// Function to send acceptance email
function sendAcceptanceEmail(recipientEmail, type, recipientName) {
  const mailOptions = {
    from: 'E-RakthKosh Admin <chetan27saini@gmail.com>',
    to: recipientEmail,
    subject: `Blood ${type} Request Accepted`,
    html: `<div>
    <h2>Thank You for Registering as a Blood ${type}!</h2>
    <p>Dear ${recipientName},</p>
    ${type === 'Donor' ? (`<p>We are thrilled to inform you that your registration as a blood donor with e-rakthkosh has been successfully accepted!</p><p>Your willingness to donate blood can save lives and make a significant impact on the community. We greatly appreciate your generosity and compassion.</p>
    <p>As a registered donor, you will be notified whenever there is a need for your blood type. Your commitment to donate when called upon is invaluable.</p>`) : (`<p>We are thrilled to inform you that your registration as a blood recipient with e-rakthkosh has been successfully accepted!</p><p>Your need for blood is crucial, and it's individuals like you who inspire hope and make a difference in our community. We understand the importance of receiving timely blood transfusions, and we're committed to providing you with the support and care you deserve.</p>
    <p>As a registered blood recipient, you will be promptly notified whenever blood matching your requirements becomes available. Your resilience and strength during this challenging time are truly admirable, and we're here to ensure you receive the lifesaving assistance you need.</p>`)}
    <p>If you have any questions or need assistance, please feel free to contact us at [info@erakthkosh.com].</p>
    <p>Thank you to be the part of this life saving vision</p>
    <p>Sincerely,</p>
    <p>The e-rakthkosh Team</p>
    </div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending acceptance email:', error);
    } else {
      console.log('Acceptance email sent:', info.response);
    }
  });
}

// Function to send rejection email
function sendRejectionEmail(recipientEmail, type, recipientName) {
  const mailOptions = {
    from: `E-RakthKosh Admin <chetan27saini@gmail.com>`,
    to: recipientEmail,
    subject: `Blood ${type} Request Rejected`,
    html: `<div>
    <h2>Notification: Rejection of Blood ${type} Registration</h2>
    <p>Dear ${recipientName},</p>
    <p>We regret to inform you that your registration as a blood ${type.toLowerCase()} with e-rakthkosh has been declined.</p>
    ${type === 'Donor' ? (`<p>Upon review, we found that your current medical condition or recent medical history does not meet our eligibility criteria for blood donation. This decision is made in the interest of your health and the safety of blood recipients.</p>
    <p>We understand that this news may be disappointing, but please know that it is based on careful consideration and adherence to medical guidelines.</p>
    <p>If you have any questions or concerns regarding this decision, please don't hesitate to reach out to us at [info@erakthkosh.com].</p>
    <p>We sincerely appreciate your willingness to contribute to our cause, and we encourage you to continue supporting blood donation efforts in other ways, such as spreading awareness or encouraging eligible individuals to donate.</p>`) : (`<p>Upon assessment, it has been determined that your current medical condition or recent medical history does not align with our eligibility criteria for receiving blood transfusions. This decision prioritizes your well-being and the safety of other blood recipients.</p>
    <p>We understand that receiving this information may be disheartening, but please know that it's based on thorough evaluation and adherence to medical standards.</p>
    <p>If you have any inquiries or require further clarification regarding this decision, please feel free to contact us at [info@erakthkosh.com].</p>
    <p>We sincerely value your understanding and cooperation. Although you may not be able to receive blood transfusions at this time, your support in raising awareness about blood donation and encouraging eligible individuals to donate is immensely appreciated.</p>`)}
    <p>Thank you for your understanding.</p>
    <p>Sincerely,</p>
    <p>The e-rakthkosh Team</p>
  </div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending rejection email:', error);
    } else {
      console.log('Rejection email sent:', info.response);
    }
  });
}

// Route to handle email submission
app.post('/send/reject/email/:pageURL', (req, res) => {
  const recipientEmail = req.body.recipientEmail;
  const recipientName = req.body.recipientName;
  const pageURL = req.params.pageURL;
  if (pageURL === 'Donor' || pageURL === 'Recipient') {
    sendRejectionEmail(recipientEmail, pageURL, recipientName);
    res.status(200).send('Rejection email sent successfully');
  } else {
    res.status(400).send('Invalid request');
  }
});

app.post('/send/accept/email/:pageURL', (req, res) => {
  const recipientEmail = req.body.recipientEmail;
  const recipientName = req.body.recipientName;
  const pageURL = req.params.pageURL;
  if (pageURL === 'Donor' || pageURL === 'Recipient') {
    sendAcceptanceEmail(recipientEmail, pageURL, recipientName);
    res.status(200).send('Rejection email sent successfully');
  } else {
    res.status(400).send('Invalid request');
  }
});