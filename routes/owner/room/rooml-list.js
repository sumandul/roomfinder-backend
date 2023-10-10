const RoomPost = require("../../../models/owner-model/post");


const defaultConfig={
  limit:5,
  page:1,
  address:"",
  title:""

}
const Room = async ({query}, res, next) => {
const { limit,page,address,title}={...defaultConfig,...query}



  try {
    const total = await RoomPost.countDocuments();
    const totalPages = Math.ceil(total/ limit);
  

    const list = await RoomPost.find({
      title: { $regex: title, $options: "i" },
      address:{ $regex: address, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit);

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

module.exports = Room;
