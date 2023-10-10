const mongoose = require("mongoose");
const config = require("../databse/db");


const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  University:{
    type:String,
    require:true,
    default:config.university[0]
  },
//   address: {

//   },
  contact: {
    type: String,
    required: true,
  },
  faculty: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
    required: true,
    
  },

});

const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;