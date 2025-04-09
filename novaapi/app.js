const express = require("express");
const app = express();

app.get("/novaapi", (req, res) => {
  const response = [
    { id: 1, name: "Felipe" },
    { id: 2, name: "Jorge" },
    { id: 3, name: "Alberto" },
    { id: 4, name: "Luiz" },
  ];

  res.json(response.find((e) => e.id == req.query.id));
});

app.listen(4000, () => console.log("Server is running on port 3000"));