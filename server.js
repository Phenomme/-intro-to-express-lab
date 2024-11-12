const PORT = 3000
const express = require("express")


const app = express()

// 1. Be Polite, Greet the User

app.get("/greetings/:username", (req, res) => {
    const username = req.params
    res.send(`Hello there, ${req.params.username}!`)
})

// 2. Rolling the Dice

app.get("/roll/:number", (req,res) => {
    const rolledNumber = req.params.number

    if (isNaN(rolledNumber)) {
       return res.send("You must specify a number")
    }
    const randomRoll = Math.floor(Math.random() * (rolledNumber + 1));
    res.send(`You rolled a ${randomRoll}.`);
})

// 3. Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get("/collectibles/:index", (req, res) => {
    const index =req.params.index;

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!")
    }
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})

// 4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get("/shoes", (req,res) => {
const type = req.query.type;
const minPrice = req.query.minPrice;
const maxPrice = req.query.maxPrice;

    
    let filteredShoes = shoes

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }
    res.send(filteredShoes)
})


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})