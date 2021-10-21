const express = require("express");
const app = express();
const path = require("path");
const requestTo = require("./app");
const port = process.env.PORT || 3000;


app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



// routes----
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/products/:query", async (req, res) => {
    let query = req.params.query;
    query = query.split(" ").join("");
    let result = await requestTo(query);
    res.render("products", { result });
});

app.post("/", (req, res) => {
    let query = req.body.userQuery;
    res.redirect(`/products/${query}`);
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});