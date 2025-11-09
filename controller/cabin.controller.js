// const { default: mongoose } = require("mongoose");
// const Cabin = require("../model/cabin");

// exports.getCabins = async (req, res) => {
//   try {
//     const cabins = await Cabin.find();

//     if (!cabins || !cabins.length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Cabin not found" });
//     }
//     return res.status(201).json({ cabins });
//   } catch (error) {
//     console.error(error.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

// exports.getCabin = async (req, res) => {
//   const cabinId = req.params.id;

//   if (!cabinId || !mongoose.Types.ObjectId.isValid(cabinId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid cabin id" });
//   }

//   try {
//     const cabin = await Cabin.findById(cabinId);

//     if (!cabin)
//       return res
//         .status(400)
//         .json({ success: false, message: "cabin not found" });

//     return res.status(201).json(cabin);
//   } catch (error) {
//     console.error("Error fetching cabin:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// exports.getCabinPrice = async (req, res) => {
//   const cabinId = req.params.id;

//   if (!cabinId || !mongoose.Types.ObjectId.isValid(cabinId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid cabin id" });
//   }

//   try {
//     const cabin = await Cabin.findById(cabinId).select("regularPrice discount");

//     if (!cabin)
//       return res
//         .status(400)
//         .json({ success: false, message: "cabin not found" });

//     return res.status(201).json({
//       regularPrice: cabin.regularPrice,
//       discount: cabin.discount,
//     });
//   } catch (error) {
//     console.error("Error fetching cabin:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };
