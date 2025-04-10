const express = require('express');

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
    const products = [
        {
            "id": 1,
            "name": "Corolla",
            "price": 20000,
            "company": "Toyota",
            "description": "A compact car known for its reliability and fuel efficiency.",
        },
        {
            "id": 2,
            "name": "Civic",
            "price": 22000,
            "company": "Honda",
            "description": "A compact car that combines style and performance.",
        },
        {
            "id": 3,
            "name": "Model S",
            "price": 80000,
            "company": "Tesla",
            "description": "An all-electric sedan with impressive range and performance.",
        },
        {
            "id": 4,
            "name": "Mustang",
            "price": 30000,
            "company": "Ford",
            "description": "A classic American muscle car with powerful performance.",
        },
    ];

    res.json(products);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
