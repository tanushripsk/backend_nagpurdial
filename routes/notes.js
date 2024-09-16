const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../modules/Notes");
var fetchuser = require("../fetch/Fetchuser");

//api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("firstname", "Enter valid firstname").isLength({ min: 3 }),
    body("middlename", "Enter valid middle").isLength({ min: 3 }),
    body("lastname", "Enter valid lastname").isLength({ min: 3 }),
    body("emailid", "Enter valid emailid").isEmail(),
    body("businessname", "Enter businessname").isLength({ min: 5 }),
    body("businessaddress", "Enter businessaddress").isLength({ min: 10 }),
    body("number", "Enter number").isLength({ min: 12 }),
    body("businessDescription", "Enter businessDescription").isLength({
      min: 1,
    }),
    // body("businessNumber", "Enter businessNumber").isLength({ min: 10 }),
    body("pincode", "Enter pincode").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const {
        firstname,
        middlename,
        lastname,
        emailid,
        businessname,
        businessaddress,
        number,
        businessDescription,
        pincode,
      } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        firstname,
        middlename,
        lastname,
        emailid,
        businessname,
        businessaddress,
        number,
        businessDescription,
        pincode,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("internal error");
    }
  }
);

//api/notes/fetchuser
router.post("/fetchuser", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error");
  }
});

// udpate
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    emailid,
    businessname,
    businessaddress,
    number,
    businessDescription,
    pincode,
  } = req.body;
  const newNote = {};
  if (firstname) {
    newNote.firstname = firstname;
  }
  if (middlename) {
    newNote.middlename = middlename;
  }
  if (lastname) {
    newNote.lastname = lastname;
  }

  if (emailid) {
    newNote.emailid = emailid;
  }

  if (businessname) {
    newNote.businessname = businessname;
  }
  if (number) {
    newNote.number = number;
  }

  if (businessDescription) {
    newNote.businessDescription = businessDescription;
  }
  if (pincode) {
    newNote.pincode = pincode;
  }

  var note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// delete
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("not allow");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note deleted", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server erross");
  }
});

//api/notes/fetchuser
router.get("/fetchuser", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
