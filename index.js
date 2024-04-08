const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser"); // Optional, needed for JSON data
const cors = require("cors");
const VITE_CLOUDINARY_API_KEY = "b6159905-13i9-305u-r8o6-k08722y8nmo0";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.post("/inscribe", async (req, res) => {
  try {
    const resp = await axios.post(
      `https://api-dev.bitmap.community/api/v1/inscribe/create-inscription?api-key=${VITE_CLOUDINARY_API_KEY}`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    console.log(resp.data.order_id);

    const details = await axios.post(
      `https://api-dev.bitmap.community/api/v1/inscribe/inscription-status?api-key=${VITE_CLOUDINARY_API_KEY}`,
      {
        order_ids: [resp.data.order_id],
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    console.log(details.data[0]);
    res.status(200).json(details.data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
