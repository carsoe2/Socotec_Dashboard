const axios = require('axios');
const bcrypt = require('bcrypt');

// Hashing the password
const saltRounds = 10; // Number of salt rounds, you can adjust this according to your security needs

const uname = 'admin'
const userProvidedPassword = 'admin';

// Generate a salt
bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
        console.error('Error generating salt:', err);
        return;
    }

    // Hash the password with the generated salt
    bcrypt.hash(userProvidedPassword, salt, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }

        // Store the salt and hashedPassword in the database
        console.log('Salt:', salt);
        console.log('Hashed Password:', hashedPassword);
        const user = {
            uname: uname,
            password_salt: salt,
            password_hash: hashedPassword
        }

        axios.post('http://localhost:3001/api/post/createUser', user).then(function(response) {
            console.log(response.data);
        });
    });
});

// Verifying the password during login
const storedSalt = '...'; // Retrieve the stored salt from the database
const storedHashedPassword = '...'; // Retrieve the stored hashed password from the database

// Hash the entered password with the stored salt
bcrypt.hash(userProvidedPassword, storedSalt, (err, hashedEnteredPassword) => {
    if (err) {
        console.error('Error hashing entered password:', err);
        return;
    }

    // Compare the hashed entered password with the stored hashed password
    bcrypt.compare(hashedEnteredPassword, storedHashedPassword, (err, passwordsMatch) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }

        if (passwordsMatch) {
            console.log('Authentication successful');
        } else {
            console.log('Authentication failed');
        }
    });
});