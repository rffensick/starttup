const express = require("express");
const request = require("request-promise-native");
const router = express.Router();

function detectText(arr) {
  const obj = arr.find(item => item.type === "TEXT");

  return obj.characters;
}

const options = {
  url: `${process.env.FIGMA_URL}/v1/files/JDQEg9AIDvXJFyxeWJ7nrXgM`,
  headers: {
    "X-Figma-Token": process.env.FIGMA_TOKEN
  }
};

router.get("/", async (req, res) => {
  let result = await request(options);

  let parseResult = JSON.parse(result).document.children[0].children[0].children;

  let resultmap = parseResult.map(component => {
    if (component.type === "COMPONENT" || component.type === "INSTANCE") {
      return {
        name: component.name,
        inputText: detectText(component.children),
        styled: {
          width: `${component.absoluteBoundingBox.width}px`,
          height: `${component.absoluteBoundingBox.height}px`
        }
      };
    }
  });





  res.json({ code: 0, result: resultmap });
});

router.get("/getmeta", async (req, res) => {
  res.json({ code: 0 });
});

module.exports = router;
