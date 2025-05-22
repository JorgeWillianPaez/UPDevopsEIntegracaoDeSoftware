const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "jdsjfdsnfiuchenrfcjhfkasdhfjks";

const users = [
    { id: 1, email: "email@email.com" , password: "senha1", cpf: "xxx.xxx.xxx-xx" },
    { id: 2, email: "email2@email.com", password: "senha2", cpf: "yyy.yyy.yyy-yy" },
    { id: 3, email: "email3@email.com", password: "senha3", cpf: "zzz.zzz.zzz-zz" },
]

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) res.status(404).json({ msg: "not-found" });  
    
    const jwtObject = {
        id: user.id,
        email: user.email,
        password: user.password,
    };

    const token = jwt.sign(jwtObject, JWT_SECRET);

    res.json({ token });
});

app.get("/cpf", (req, res) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "token not found" });

    token = token.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "invalid token" });

        const user = users.find(user => user.id === decoded.id);

        if (!user) return res.status(404).json({ message: "user not found" });

        const userCondition = user.email == decoded.email;
        const passwordCondition = user.password == decoded.password;
        const idCondition = user.id == decoded.id;

        const generalCondition = userCondition && passwordCondition && idCondition;

        if (!generalCondition) return res.status(403).json({ message: "invalid token" });

        res.json({ cpf: user.cpf });
    });
});

app.listen(3000, () => console.log("Server is running on port 3000"));