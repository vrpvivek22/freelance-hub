import Invitation from "../../models/invitation-model/invitation.js";

export const getfreelancerInvitations = async (req, res) => {
  try {
    const freelancerId = req.user.userId;

    const invitations = await Invitation.find({ freelancerId })
      .populate(
        "projectId",
        "_id projectTitle budget skills createdAt projectDetails"
      )
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invitations.length,
      invitations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch invitations",
      error: error.message,
    });
  }
};
