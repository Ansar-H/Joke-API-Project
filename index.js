import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {joke: null, error: null});
});

app.post("/", async (req, res) => {
    const name = req.body.name;
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any")
        const joke = response.data.joke || `${response.data.setup} ... ${response.data.delivery}`;
        res.render("index.ejs", {joke: `${name}, here's a joke for you: ${joke}`, error: null});
    } catch (error) {
        res.render("index.ejs", {joke: null, error: "Error, please try again"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});