const dbConnect = require("../utils/dbConnect");

module.exports = {
  testGet: async () => {
    try {
      const col = dbConnect.getConnect().collection("users");

      return await col
        .aggregate([
          {
            $group: { _id: "$gender", arrSex: { $push: "$$ROOT" } }
          },
          {
            $project: { count: { $size: "$arrSex" } }
          },
          {
            $addFields: { nameSex: "$_id" }
          },
          {
            $project: { _id: 0 }
          }
        ])
        .toArray();
    } catch (err) {
      return err;
    }
  }
};
