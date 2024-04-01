console.log("I am Vincent. Ncc student ID is: 223190716");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});


// user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// create the table if not exists
db.run('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title716 TEXT, author716 TEXT, ISBN716 TEXT, description716 TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Books Table created successfully');

    commandInterface();
});

function listBooks() {
    // list all books
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.ID}, Title716: ${row.title716}, Author716: ${row.author716}, ISBN716: ${row.ISBN716}, Description716: ${row.description716}`);
        });
    });
}
// queue -> task 1(callback)
function commandInterface() {
    readline.question('Enter book title716: ', (title716) => {
        readline.question('Enter book author716: ', (author716) => {
            readline.question('Enter book ISBN716: ', (ISBN716) => {
                readline.question('Enter book description716: ', (description716) => {
                    // insert the book into the database
                    db.run('INSERT INTO books (title716, author716, ISBN716, description716) VALUES (?, ?, ?, ?)', [title716, author716, ISBN716, description716], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        readline.question('Do you want to add another book? (yes/no): ', (answer) => {
                            if (answer === 'yes') {
                                commandInterface();
                            } else {
                                listBooks();
                                
                                readline.close();
                            }
                        });
                    });
                });
            });
        });
    });
    // callback hell
}
