const RoomPost = require("../../../models/user-model/post");
const { getMyProfile } = require("../../../helpers/jwtSign");

const defaultConfig = {
  limit: 5,
  page: 1,
  address: "",
  title: "",
};
 module.exports = async (req, res, next) => {
  const { query } = req;
  const { limit, page, address, title, gt, lte, lt } = {
    ...defaultConfig,
    ...query,
  };
  const id = getMyProfile(req);
  try {
    const total = await RoomPost.countDocuments({
      userId: id,
      title: { $regex: title, $options: "i" },
      address: { $regex: address, $options: "i" },
    });
    const totalPages = Math.ceil(total / limit);
    const list = await RoomPost.find({
      userId: id,
      title: { $regex: title, $options: "i" },
      address: { $regex: address, $options: "i" },
      //   price: {
      //     $gt: gt,
      // },
    });
    // console.log(list)
    // const list = await RoomPost.find({
    //   title: { $regex: title, $options: "i" },
    //   address:{ $regex: address, $options: "i" },
    //   gt:[{gt:{$gt:gt}}]
    // })
    //   .skip((page - 1) * limit)
    //   .limit(limit);
    // console.log(list)

    res.status(200).json({
      list,
      currentPage: page,
      totalPages,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


