const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile("index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})