const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/results", async (req, res) => {
  const hallticket = req.body.hallticket;
  let results = "";

  const url =
    "https://results.cmrithyderabad.edu.in/helper.php?gamaOne=getResult";

  try {
    // for (let id = 50; id > 0; id--) {
    //   const data = `hallticket=${hallticket}&result=${id}`;
    //   // Fetch data from the API
    //   const response = await axios.post(url, data, {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     cache: "no-cache",
    //   });
    //   const invalidResult =
    //     '<div class="isa_error">Invalid Hallticket, Please contact Exam Branch if you think this is a mistake.</div>';

    //   const result = response.data;
    //   if (result !== invalidResult) {
    //     results += result;
    //   }
    // }
    const requests = [];
    for (let id = 30; id > 20; id--) {
      const data = `hallticket=${hallticket}&result=${id}`;
      requests.push(
        await axios.post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          cache: "no-cache",
        })
      );
    }
    const responses = await Promise.all(requests);
    const invalidResult =
      '<div class="isa_error">Invalid Hallticket, Please contact Exam Branch if you think this is a mistake.</div>';
    for (let response of responses) {
      let result = response.data;
      if (result !== invalidResult) {
        results += result;
      }
    }

    res.send(results);
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).send("Error fetching data from API");
  }
});
// Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
module.exports = app;
