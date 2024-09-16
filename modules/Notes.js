const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, 

  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
  },
  businessname: {
    type: String,
    required: true,
  },
  businessaddress: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  businessDescription: {
    type: String,
    required: true,
  },
  //   businessNumber: {
  //     type: String,
  //     required: true,
  //   },
  pincode: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("notes", NotesSchema);
module.exports = Notes;

// module.exports=mongoose.model('user',UserSchema
