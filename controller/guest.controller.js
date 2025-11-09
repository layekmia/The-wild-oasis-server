// const Guest = require("../model/guest");

// exports.createGuest = async (req, res) => {
//   const { fullName, email } = req.body;

//   if (!fullName || !email) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Full name and email are required" });
//   }

//   try {
//     let guest = await Guest.findOne({ email });

//     if (guest) {
//       return res.status(200).json({
//         success: true,
//         message: "Guest already exists, signed in successfully",
//         guest,
//       });
//     }

//     guest = await Guest.create({ fullName, email });

//     return res.status(201).json(guest);
//   } catch (error) {
//     console.error("Error creating guest:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

exports.getGuest = async (req, res) => {
  res.status(2001).json({message: "hi"})
  // const email = req.params.email;
  // if (!email)
  //   return res.status(400).json({ success: false, message: "Invalid email" });

  // try {

  //   connectDB();

  //   const guest = await Guest.findOne({ email });
  //   if (!guest) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Guest not found" });
  //   }
  //   return res.status(201).json(guest);
  // } catch (error) {
  //   console.error("Error in guest route:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Internal server error ",
  //   });
  // }
};

// exports.updateGuest = async (req, res) => {
//   const guestId = req.params.id;
//   const updateData = req.body;

//   if (!guestId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid or missing guest ID" });
//   }

//   try {
//     const updatedGuest = await Guest.findByIdAndUpdate(guestId, updateData, {
//       new: true, // return updated document
//       runValidators: true, // enforce schema validation on update
//     });

//     if (!updatedGuest) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Guest not found" });
//     }

//     // 4️⃣ Return success response
//     return res.status(200).json(updatedGuest);
//   } catch (error) {
//     console.error("Error updating guest:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };
