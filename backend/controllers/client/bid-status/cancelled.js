const Bid = require("../../../models/freelancer-model/freelancer-bid");
const Project = require("../../../models/client-model/client-project");

const cancelBid = async (req, res) => {
  const { bidId } = req.params;

  const bid = await Bid.findByIdAndUpdate(
    bidId,
    { status: "incomplete" },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    bid.projectId,
    { status: "incomplete" },
    { new: true }
  );

  res.status(200).json({ message: "Bid closed", bid });
};

module.exports = cancelBid;
