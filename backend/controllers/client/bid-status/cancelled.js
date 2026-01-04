import Bid from "../../../models/freelancer-model/freelancer-bid.js";
import Project from "../../../models/client-model/client-project.js";

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

export default cancelBid;
