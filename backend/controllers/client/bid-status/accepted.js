import Bid from "../../../models/freelancer-model/freelancer-bid.js";
import Project from "../../../models/client-model/client-project.js";

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

export default acceptBid;
