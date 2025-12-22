const Bid = require("../../../models/freelancer-model/freelancer-bid");
const Project = require("../../../models/client-model/client-project");

// const acceptBid = async (req, res) => {
//   const { bidId } = req.params;

//   const bid = await Bid.findByIdAndUpdate(
//     bidId,
//     { status: "inprogress" },
//     { new: true }
//   );

//   await Project.findByIdAndUpdate(
//     bid.projectId,
//     { status: "inprogress" },
//     { new: true }
//   );

//   res.status(200).json({ message: "Bid accepted", bid });
// };

// module.exports = acceptBid;

const acceptBid = async (req, res) => {
  const { bidId } = req.params;

  const acceptedBid = await Bid.findByIdAndUpdate(
    bidId,
    { status: "inprogress" },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    acceptedBid.projectId,
    { status: "inprogress" },
    { new: true }
  );

  await Bid.updateMany(
    {
      projectId: acceptedBid.projectId,
      _id: { $ne: bidId },
    },
    { status: "closed" }
  );

  res.status(200).json({
    message: "Bid accepted",
    bid: acceptedBid,
  });
};

module.exports = acceptBid;
