import Invitation from "../../models/invitation-model/invitation.js";
import Profile from "../../models/freelancer-model/freelancer-profile.js"

export const Invite = async (req, res) => {
  try {
    const { projectId, freelancerId } = req.body;
    const clientId = req.user.userId;

    if (!projectId || !freelancerId) {
      return res.status(400).json({
        success: false,
        message: "ProjectId and FreelancerId are required",
      });
    }

    const existingInvite = await Invitation.findOne({
      projectId,
      freelancerId,
      clientId,
    });

    if (existingInvite) {
      return res.status(409).json({
        success: false,
        message: "Invitation already sent to this freelancer",
      });
    }

    const invitation = await Invitation.create({
      projectId,
      freelancerId,
      clientId,
      status: true,
    });

    res.status(201).json({
      success: true,
      invitation,
    });
  } catch (error) {
    console.error("Invite error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send invitation",
    });
  }
};


export const getClientInvitations = async (req, res) => {
  try {
    const clientId = req.user.userId;

    const invitations = await Invitation.find({
      clientId,
      status: true,
    })
      .populate("projectId", "projectTitle")
      .populate("freelancerId", "_id email")
      .sort({ createdAt: -1 })
      .lean();

    if (!invitations.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        invitations: [],
      });
    }

    const freelancerIds = invitations
      .map((i) => i.freelancerId?._id)
      .filter(Boolean);

    const profiles = await Profile.find({
      createdBy: { $in: freelancerIds },
    })
      .select(
        "name profileImage averageRating country hourlyRate description skills title totalReviews createdBy"
      )
      .lean();

    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[p.createdBy.toString()] = p;
    });

    const finalInvitations = invitations.map((inv) => {
      const freelancerId = inv.freelancerId?._id?.toString();
      const profile = profileMap[freelancerId] || null;

      return {
        ...inv,
        freelancer: {
          _id: inv.freelancerId?._id || null,
          email: inv.freelancerId?.email || null,
          name: profile?.name || null,
          profileImage: profile?.profileImage || null,
          title: profile?.title || null,
          averageRating: profile?.averageRating || 0,
          country: profile?.country || null,
          description: profile?.description || null,
          hourlyRate: profile?.hourlyRate || null,
          skills: profile?.skills || [],
          totalReviews: profile?.totalReviews || 0,
        },
      };
    });

    res.status(200).json({
      success: true,
      count: finalInvitations.length,
      invitations: finalInvitations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch invitations",
      error: error.message,
    });
  }
};


