const { json } = require('body-parser')
const express =require('express')
const db_connect =require('./db_connect.js')

const db =db_connect.pool;
const app =express()


function order(){
    const element =document.getElementsByTagName("button")
    //element.style.color="blue";
}

function greet(){
    confirm('Welcome to our website how can we help you to fullfill your need😊😊👨‍🍳');
}



function checkFunction() {
  // Implement your desired function logic here
  const result = 'Function checked successfully!';
  return result;
}

app.get('/check-function', (req, res) => {
  const result = checkFunction();
  res.json({ result });
});


async function handle_request(request){
    payload =await request.json()

    intent =payload['queryResult']['intent']['displayName'];

    parameters =payload['queryResult']['parameters'];

    output_contexts = payload['queryResult']['outputContexts'];

    if (intent =="track.order"){
        return {
            "fulfillment":`Received ==${intent}==in the backend`
        }
    }
}

app.post('/add-to-cart', async (req, res) => {
    try {
      const { item } = req.body;
  
      // Establish a connection to the MongoDB database
      
  
      res.json({ message: 'Item added to cart successfully!', data: result });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Error adding item to cart' });
    }
});

async function addToCart(id){
    const Item ={
        name:id
    };
    console.log(Item);
}


app.listen(3000,()=>{
    console.log('server running on port 3000')
})