const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const homeOwnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  contact: {
    type: Number,
    required: true,
  },
  token:{
    type: String,
  },
type:{
  type:String,
  required:true,
  default:"user"
},
verified:{
type:Boolean,
required:true,
default:false
},
  email:{
    type:String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  }

},{
  // Exclude the '__v' field from query results
  versionKey: false,
  // Transform the '_id' field to 'id' in the JSON representation
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  }
});

// Pre-save middleware to hash the password before saving
homeOwnerSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("Users", homeOwnerSchema);

module.exports = User;
