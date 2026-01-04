import Bid from "../../models/freelancer-model/freelancer-bid.js";
import Project from "../../models/client-model/client-project.js";

export const completeProject = async (req, res) => {
  try {
    const { bidId } = req.params;

    const completedBid = await Bid.findByIdAndUpdate(
      bidId,
      { status: "completed" },
      { new: true }
    );
    if (!completedBid) {
      return res.status(404).json({
        success: false,
        message: "No project found",
      });
    }

    const completedProject = await Project.findByIdAndUpdate(
      completedBid.projectId,
      { status: "completed" },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project Completed Successfully",
      bid: completedBid,
      project: completedProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
};
