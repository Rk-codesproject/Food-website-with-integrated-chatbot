const express = require('express');
const bodyParser = require('body-parser');
const db_connect =require('./db_connect.js')
const server = require('./server.js')
const path = require('path');

const db =db_connect.pool;
const httpsServer =server.httpsServer;
const httpsPort =server.httpsPort;
const app = express();
app.use(bodyParser.json());

// Sample order data to store orders for demonstration purposes
let orders = {};

// Function to handle the "order.add" intent
function handleOrderAdd(intentParameters, session_id) {
  // Extract necessary parameters from intentParameters
  const item = intentParameters.item;
  const quantity = intentParameters.quantity;

  // Store the order in the orders object using the session_id as a key
  orders[session_id] = orders[session_id] || [];
  orders[session_id].push({ item, quantity });

  // Respond with a success message
  return {
    fulfillmentText: `Order for ${quantity} ${item}(s) added successfully.`,
  };
}

// Function to handle the "order.remove" intent
function handleOrderRemove(intentParameters, session_id) {
  // Extract necessary parameters from intentParameters
  const item = intentParameters.item;

  // Check if there are orders for the given session_id
  if (!orders[session_id] || orders[session_id].length === 0) {
    return {
      fulfillmentText: "No orders found for this session.",
    };
  }

  // Find and remove the specified item from the order list
  orders[session_id] = orders[session_id].filter((order) => order.item !== item);

  // Respond with a success message
  return {
    fulfillmentText: `Order for ${item} removed successfully.`,
  };
}

function trackorder(intentParameters, session_id) {
    // Extract necessary parameters from intentParameters
    const item = intentParameters.item;
    const quantity = intentParameters.quantity;
  
    // Store the order in the orders object using the session_id as a key
    orders[session_id] = orders[session_id] || [];
    orders[session_id].push({ item, quantity });
  
    // Respond with a success message
    return {
      fulfillmentText: `Order for ${quantity} ${item}(s) deliver.`,
    };
  }
// Webhook endpoint to receive requests from Dialogflow
app.post('/webhook', (req, res) => {
  const requestBody = req.body;
  const session_id = requestBody.session.split('/').pop(); // Extract session_id from the request

  // Check if the request contains a queryResult with intent information
  if (requestBody.queryResult && requestBody.queryResult.intent) {
    const intentName = requestBody.queryResult.intent.displayName;
    const intentParameters = requestBody.queryResult.parameters;

    let response;

    // Handle different intents based on their names
    switch (intentName) {
      case 'order.add':
        response = handleOrderAdd(intentParameters, session_id);
        break;
      case 'order.remove':
        response = handleOrderRemove(intentParameters, session_id);
        break;
      case 'track.order-context:ongoing-tracking':
        response = trackorder(intentParameters, session_id);
      default:
        response = {
          fulfillmentText: "Sorry, I don't understand that intent.",
        };
    }

    // Send the response back to Dialogflow
    res.json(response);
  } else {
    // If there's no intent information, respond with an error message
    res.json({
      fulfillmentText: "Sorry, I couldn't process the request.",
    });
  }
});

db.query('SELECT * FROM items', (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
  } 
});
var result;
app.get('/data',(req,res)=>{
  db.query('SELECT * FROM items', (error,results) => {
    if (error) {
      console.error('Error executing query:', error);
    }
    result =results
  });
  res.send(result);
})

// Start the server on port 3000 (or any other port you prefer)
/*const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});*/
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on https://localhost:${httpsPort}/`);
  });
