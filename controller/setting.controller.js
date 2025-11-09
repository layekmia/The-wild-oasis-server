const Setting = require("../model/Setting");

exports.getSetting = async (req, res) => {
  try {
    const setting = await Setting.find();
    if (!setting)
      return res
        .status(400)
        .json({ success: false, message: "setting not found" });

    return res.status(201).json(setting);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
