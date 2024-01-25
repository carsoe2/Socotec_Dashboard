const express = require("express");
const mysql = require("mysql2/promise"); // We're using 'mysql2/promise' for async/await support
const cors = require("cors");
// Create an Express app
const app = express();
app.use(cors());
const bodyParser = require('body-parser');

// MySQL connection configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "stay alive", // Replace with your MySQL password
  database: "mitr", // Replace with your MySQL database name
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);
app.use(bodyParser.json());

// Test the MySQL connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
  });

// Define your routes and handle database queries here

// Start the Express server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Returns all entries from employee database
app.get("/api/employees", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM employees;");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns all entries from license database
app.get("/api/licenses", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM licenses;");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns all entries from computer hardware devices database
app.get("/api/chd", async (req, res) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM computer_hardware_devices;"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Removes entries from employee database by employeeid
app.delete("/api/delete/employee/:employeeid", async (req, res) => {
  const employeeid = parseInt(req.params["employeeid"]);
  try {
    const query = "DELETE FROM employees WHERE employeeId = ?";
    const [rows, fields] = await pool.query(query, [employeeid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns entries from employee database by employeeid
app.get("/api/get/employee/employeeid/:employeeid", async (req, res) => {
  const employeeid = parseInt(req.params["employeeid"]);
  try {
    const query = "SELECT * FROM employees WHERE employeeId = ?";
    const [rows, fields] = await pool.query(query, [employeeid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns entries from employee database by employeeid
app.get("/api/get/employee/licenseid/:licenseid", async (req, res) => {
  const licenseid = parseInt(req.params["licenseid"]);
  try {
    const query = "SELECT * FROM employees WHERE licenseId = ?";
    const [rows, fields] = await pool.query(query, [licenseid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns entries from computer hardware device database being used by by employeeid
app.get("/api/get/chd/employeeid/:employeeid", async (req, res) => {
  const employeeid = parseInt(req.params["employeeid"]);
  try {
    const query =
      "SELECT * FROM computer_hardware_devices WHERE employeeOwnerId = ?";
    const [rows, fields] = await pool.query(query, [employeeid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/employees/", async (req, res) => {
  const fName = req.body["fName"];
  const lName = req.body["lName"];
  const email = req.body["email"];
  const division = req.body["division"];
  const company = req.body["company"];
  const profitCenter = req.body["profitCenter"];
  const isActive = true;
  const licenseId = parseInt(req.body["licenseId"]);
  try {
    const query = `INSERT INTO employees(fName, lName, email, division, company, profitCenter, isActive, licenseId)
                      VALUES('${fName}', '${lName}', '${email}', '${division}', '${company}', '${profitCenter}', ${isActive}, ${licenseId});`;
    const [rows, fields] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.log("Error:" + err);
    res.sendStatus(500);
  }
});

app.post('/api/licenses/', async (req, res) => {
  const vendor = req.body["vendor"];
  const product = req.body["product"];
  const price = parseFloat(req.body["price"]).toFixed(2);
  const expirationData = req.body["expirationData"];
  const isActive = true;
  try {
      const query = `INSERT INTO licenses(vendor, product, price, expirationData, isActive)
                      VALUES('${vendor}', '${product}', '${price}', '${expirationData}', ${isActive});`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log("Error:" + err);
      res.sendStatus(500);
  }
});

app.post('/api/chd/', async (req, res) => {
  const name = req.body["name"];
  const manufacturer = req.body["manufacturer"];
  const serialNumber = parseInt(req.body["serialNumber"]);
  const model = req.body["model"];
  const price = parseFloat(req.body["price"]).toFixed(2);
  const warrantyExpiration = req.body["warrantyExpiration"];
  const purchaseDate = req.body["purchaseDate"];
  const employeeOwnerId = parseInt(req.body["employeeOwnerId"]);
  console.log(req.body);
  try {
      const query = `INSERT INTO computer_hardware_devices(name, manufacturer, model, serialNumber, price,
                      purchaseDate, warrantyExpiration, employeeOwnerId)
                      VALUES('${name}', '${manufacturer}', '${model}', ${serialNumber}, ${price},
                              '${purchaseDate}', '${warrantyExpiration}', ${employeeOwnerId});`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log("Error:" + err);
      res.sendStatus(500);
  }
});

app.post('/api/chdNoOwner/', async (req, res) => {
  const name = req.body["name"];
  const manufacturer = req.body["manufacturer"];
  const serialNumber = parseInt(req.body["serialNumber"]);
  const model = req.body["model"];
  const price = parseFloat(req.body["price"]).toFixed(2);
  const warrantyExpiration = req.body["warrantyExpiration"];
  const purchaseDate = req.body["purchaseDate"];
  try {
      const query = `INSERT INTO computer_hardware_devices(name, manufacturer, model, serialNumber, price,
                      purchaseDate, warrantyExpiration)
                      VALUES('${name}', '${manufacturer}', '${model}', ${serialNumber}, ${price},
                              '${purchaseDate}', '${warrantyExpiration}');`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log("Error:" + err);
      res.sendStatus(500);
  }
});

// Returns entries from computer hardware device database being used by by employeeid
app.post('/api/post/createUser', async (req, res) => {
  const uname = req.body["uname"];
  const password_salt = req.body["password_salt"];
  const password_hash = req.body["password_hash"];
  try {
      const query = `INSERT INTO users(uname, password_salt, password_hash)
                      VALUES('${uname}', '${password_salt}', '${password_hash}');`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log("Error:" + err);
      res.sendStatus(500);
  }
});

app.get("/api/get/employee/activeCount", async (req, res) => {
  try {
      const query = `with grouped as (select count(*) as filtered from employees where isActive group by email)
      select sum(filtered) from grouped;`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.get("/api/get/employee/totalCount", async (req, res) => {
  try {
      const query = `with grouped as (select count(*) as filtered from employees group by email)
      select sum(filtered) from grouped;`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.get("/api/get/license/activeCount", async (req, res) => {
  try {
      const query = `with grouped as (select count(*) as filtered from licenses where isActive)
      select sum(filtered) from grouped;`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.get("/api/get/license/totalCount", async (req, res) => {
  try {
      const query = `with grouped as (select count(*) as filtered from licenses)
      select sum(filtered) from grouped;`;
      const [rows, fields] = await pool.query(query);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.get("/api/get/license/active/:licenseid", async (req, res) => {
  const licenseid = parseInt(req.params["licenseid"]);
  try {
      const query = `select count(*) from employees where licenseId=${licenseid} and isActive;`;
      const [rows, fields] = await pool.query(query, [licenseid]);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.get("/api/get/license/inactive/:licenseid", async (req, res) => {
  const licenseid = parseInt(req.params["licenseid"]);
  try {
      const query = `select count(*) from employees where licenseId=${licenseid} and not isActive;`;
      const [rows, fields] = await pool.query(query, [licenseid]);
      res.json(rows);
  } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
});

app.put('/api/put/employee/employeeid/:employeeId', async (req, res) => {
  const employeeId = parseInt(req.params["employeeId"]); // use employeeId to identify which user to update

  // Initialize an array to store the column-value pairs for the SET clause
  const updateValues = [];

  // Define the SQL update statement
  let sqlUpdate = `UPDATE employees SET`;

  // Helper function to add a column-value pair to the SET clause
  const addUpdateValue = (columnName, value) => {
    updateValues.push(`${columnName} = ${value}`);
  };

  // Check and add each property to the updateValues array
  if (req.body.hasOwnProperty("fName") && req.body["fName"] !== null) {
    addUpdateValue('fName', pool.escape(req.body["fName"]));
  }
  if (req.body.hasOwnProperty("lName") && req.body["lName"] !== null) {
    addUpdateValue('lName', pool.escape(req.body["lName"]));
  }
  if (req.body.hasOwnProperty("email") && req.body["email"] !== null) {
    addUpdateValue('email', pool.escape(req.body["email"]));
  }
  if (req.body.hasOwnProperty("division") && req.body["division"] !== null) {
    addUpdateValue('division', pool.escape(req.body["division"]));
  }
  if (req.body.hasOwnProperty("company") && req.body["company"] !== null) {
    addUpdateValue('company', pool.escape(req.body["company"]));
  }
  if (req.body.hasOwnProperty("profitCenter") && req.body["profitCenter"] !== null) {
    addUpdateValue('profitCenter', pool.escape(req.body["profitCenter"]));
  }

  if (req.body.hasOwnProperty("licenseId")) {
    const licenseIdValue = req.body["licenseId"] !== null ? parseInt(req.body["licenseId"]) : null;
    addUpdateValue('licenseId', licenseIdValue);
  }

  // Combine the updateValues array into the SET clause of the SQL query
  sqlUpdate += ` ${updateValues.join(', ')} WHERE employeeId = ` + employeeId;

  // Execute the SQL query
  try {
    const [rows, fields] = await pool.query(sqlUpdate);
    res.json(rows);
  } catch (err) {
    console.log("Error:" + err);
    res.sendStatus(500);
  }

});

app.delete("/api/delete/license/:licenseid", async (req, res) => {
  const licenseid = parseInt(req.params["licenseid"]);
  try {
    const query = "DELETE FROM licenses WHERE licenseId = ?";
    const [rows, fields] = await pool.query(query, [licenseid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put('/api/put/license/licenseid/:licenseId', async (req, res) => {
  const licenseId = parseInt(req.params["licenseId"]); // use licenseId to identify which license to update

  // Initialize an array to store the column-value pairs for the SET clause
  const updateValues = [];

  // Define the SQL update statement
  let sqlUpdate = `UPDATE licenses SET`;

  // Helper function to add a column-value pair to the SET clause
  const addUpdateValue = (columnName, value) => {
    updateValues.push(`${columnName} = ${value}`);
  };

  // Check and add each property to the updateValues array
  if (req.body.hasOwnProperty("vendor") && req.body["vendor"] !== null) {
    addUpdateValue('vendor', pool.escape(req.body["vendor"]));
  }
  if (req.body.hasOwnProperty("product") && req.body["product"] !== null) {
    addUpdateValue('product', pool.escape(req.body["product"]));
  }
  if (req.body.hasOwnProperty("price") && req.body["price"] !== null) {
    addUpdateValue('price', parseFloat(req.body["price"]));
  }
  if (req.body.hasOwnProperty("expirationDate") && req.body["expirationDate"] !== null) {
    addUpdateValue('expirationDate', pool.escape(req.body["expirationDate"]));
  }
  if (req.body.hasOwnProperty("isActivate")) {
    const isActivateValue = req.body["isActivate"] !== null ? req.body["isActivate"] : null;
    addUpdateValue('isActivate', isActivateValue);
  }

  // Combine the updateValues array into the SET clause of the SQL query
  sqlUpdate += ` ${updateValues.join(', ')} WHERE licenseId = ` + licenseId;

  // Execute the SQL query
  try {
    const [rows, fields] = await pool.query(sqlUpdate);
    res.json(rows);
  } catch (err) {
    console.log("Error:" + err);
    res.sendStatus(500);
  }
});

app.get("/api/get/license/licenseid/:licenseid", async (req, res) => {
  const licenseid = parseInt(req.params["licenseid"]);
  try {
    const query = "SELECT * FROM licenses WHERE licenseId = ?";
    const [rows, fields] = await pool.query(query, [licenseid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/api/delete/hardware/:hardwareid", async (req, res) => {
  const hardwareid = parseInt(req.params["hardwareid"]);
  try {
    const query = "DELETE FROM computer_hardware_devices WHERE hardwareId = ?";
    const [rows, fields] = await pool.query(query, [hardwareid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/api/put/hardware/hardwareid/:hardwareId", async (req, res) => {
  const hardwareId = parseInt(req.params["hardwareId"]); // use hardwareId to identify which hardware to update

  // Initialize an array to store the column-value pairs for the SET clause
  const updateValues = [];

  // Define the SQL update statement
  let sqlUpdate = `UPDATE computer_hardware_devices SET`;

  // Helper function to add a column-value pair to the SET clause
  const addUpdateValue = (columnName, value) => {
    updateValues.push(`${columnName} = ${value}`);
  };

  // Check and add each property to the updateValues array
  if (req.body.hasOwnProperty("name") && req.body["name"] !== null) {
    addUpdateValue('name', pool.escape(req.body["name"]));
  }
  if (req.body.hasOwnProperty("manufacturer") && req.body["manufacturer"] !== null) {
    addUpdateValue('manufacturer', pool.escape(req.body["manufacturer"]));
  }
  if (req.body.hasOwnProperty("model") && req.body["model"] !== null) {
    addUpdateValue('model', pool.escape(req.body["model"]));
  }
  if (req.body.hasOwnProperty("serialNumber") && req.body["serialNumber"] !== null) {
    addUpdateValue('serialNumber', parseInt(req.body["serialNumber"]));
  }
  if (req.body.hasOwnProperty("price") && req.body["price"] !== null) {
    addUpdateValue('price', parseFloat(req.body["price"]));
  }
  if (req.body.hasOwnProperty("purchaseDate") && req.body["purchaseDate"] !== null) {
    addUpdateValue('purchaseDate', pool.escape(req.body["purchaseDate"]));
  }
  if (req.body.hasOwnProperty("warrantyExpiration") && req.body["warrantyExpiration"] !== null) {
    addUpdateValue('warrantyExpiration', pool.escape(req.body["warrantyExpiration"]));
  }
  if (req.body.hasOwnProperty("employeeOwnerId")) {
    const employeeOwnerIdValue = req.body["employeeOwnerId"] !== null ? parseInt(req.body["employeeOwnerId"]) : null;
    addUpdateValue('employeeOwnerId', employeeOwnerIdValue);
  }

  // Combine the updateValues array into the SET clause of the SQL query
  sqlUpdate += ` ${updateValues.join(', ')} WHERE hardwareId = ` + hardwareId;
  console.log(sqlUpdate);
  // Execute the SQL query
  try {
    const [rows, fields] = await pool.query(sqlUpdate);
    res.json(rows);
  } catch (
    err
  ) {
    console.log("Error:" + err);
    res.sendStatus(500);
  }
});

app.get("/api/get/hardware/hardwareid/:hardwareid", async (req, res) => {
  const hardwareid = parseInt(req.params["hardwareid"]);
  try {
    const query = "SELECT * FROM computer_hardware_devices WHERE hardwareId = ?";
    const [rows, fields] = await pool.query(query, [hardwareid]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});