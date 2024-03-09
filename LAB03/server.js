// Import required modules
const connect = require('connect');
const url = require('url');

// Create a Connect app
const app = connect();

// Define a function to parse and calculate based on URL parameters
function calculate(req, res, next) {
    const queryObject = url.parse(req.url, true).query;

    // Retrieve parameters from the query string
    const method = queryObject.method;
    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);

    // Perform the calculation based on the method parameter
    let result;
    let operation;
    switch (method) {
        case 'add':
            result = x + y;
            operation = '+';
            break;
        case 'subtract':
            result = x - y;
            operation = '-';
            break;
        case 'multiply':
            result = x * y;
            operation = '*';
            break;
        case 'divide':
            if (y === 0) {
                res.end('Error: Division by zero is not allowed.');
                return;
            }
            result = x / y;
            operation = '/';
            break;
        default:
            res.end('Error: Invalid method. Supported methods are add, subtract, multiply, and divide.');
            return;
    }

    // Send the response with the calculated result
    res.end(`${x} ${operation} ${y} = ${result}`);
}

// Use the calculate function when the '/lab2' route is requested
app.use('/lab2', calculate);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
