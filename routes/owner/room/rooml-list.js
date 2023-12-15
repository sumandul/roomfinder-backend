const { getMyProfile } = require("../../../lib/jwtSign");

const defaultConfig = {
  limit: 5,
  page: 1,
  address: "",
  title: "",
};
 module.exports = async (req, res, next) => {
  console.log(req,'suman')
  const { query ,model ,auth} = req;
  console.log(auth)
  const { limit, page, address, title, gt, lte, lt } = {
    ...defaultConfig,
    ...query,
  };
  try {
    const total = await model.post.countDocuments({
      userId: auth.id,
      title: { $regex: title, $options: "i" },
      address: { $regex: address, $options: "i" },
    });
    const totalPages = Math.ceil(total / limit);
    const list = await model.post.find({
      userId: auth.id,
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
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};


