const express = require("express")
const app = express()

app.use(express.static("../Session3"))

app.get("/", function(req, res) {
    res.redirect("Session2")
})

app.get("/Session2", function(req, res) {
    res.redirect("/Session2/index.html")
})


app.get("/google/:searchTerm", function(req, res) {
    let searchTerm = req.params.searchTerm
    res.redirect("https://google.com/search?q=" + searchTerm)
})

app.get("/*", function(req, res) {
    res.status(404).send("<h1>Error 404</h1>")
})

app.listen(3000, function() {
    console.log("Example is running on port 3000...")
})
