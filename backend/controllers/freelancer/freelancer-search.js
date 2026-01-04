import Project from "../../models/client-model/client-project.js";
import { StatusCodes } from "http-status-codes";
import Bid from "../../models/freelancer-model/freelancer-bid.js";
import Details from "../../models/client-model/client-details.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const { projectTitle, sort } = req.query;

    const queryObject = {};

    if (projectTitle) {
      queryObject.projectTitle = { $regex: projectTitle, $options: "i" };
    }

    let query = Project.find(queryObject);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      query = query.sort(sortList);
    } else {
      query = query.sort("-createdAt");
    }

    let projects = await query.lean();

    const projectIds = projects.map((p) => p._id);

    const proposalCounts = await Bid.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    proposalCounts.forEach((c) => {
      countMap[c._id.toString()] = c.count;
    });

    projects = projects.map((p) => ({
      ...p,
      requiredSkills: Array.isArray(p.requiredSkills) ? p.requiredSkills : [],
      proposalCount: countMap[p._id.toString()] || 0,
    }));

    res.status(StatusCodes.OK).json({ projects, nbHits: projects.length });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId)
    .populate("createdBy", "name email")
    .lean();

  if (!project) {
    throw new NotFoundError(`No project found`);
  }

  const clientDetails = await Details.findOne({
    createdBy: project.createdBy._id,
  })
    .select("country averageRating createdAt")
    .lean();

  const enrichedProject = {
    ...project,
    clientDetails: clientDetails || null,
  };

  res.status(StatusCodes.OK).json({ project: enrichedProject });
};
