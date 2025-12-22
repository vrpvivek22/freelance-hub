const Invitation = require("../../models/invitation-model/invitation");

const Invite = async (req, res) => {
  const { projectId, freelancerId } = req.body;
  const clientId = req.user.userId;

  const invitation = await Invitation.create({
    projectId,
    freelancerId,
    clientId,
    status: true,
  });
  res.json({ success: true, invitation });
};

const getClientInvitations = async (req, res) => {
  try {
    const clientId = req.user.userId;

    const invitations = await Invitation.find({ clientId, status: true })
      .populate("projectId", "projectTitle")
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

module.exports = { Invite, getClientInvitations };
