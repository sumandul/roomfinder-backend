const RoomPost = require("../../../models/user-model/post");


const defaultConfig={
  limit:5,
  page:1,
  address:"",
  title:"",


}
const Room = async ({query}, res, next) => {
const { limit,page,address,title,gt,lte}={...defaultConfig,...query}


  try {
    const total = await RoomPost.countDocuments();
    const totalPages = Math.ceil(total/ limit);
    const  list  =  await RoomPost.find()
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
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = Room;
