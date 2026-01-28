import { getFreelancerProfileApi } from "@/services/freelancer/freelancer-profile";
import { getFreelancerReviewsApi } from "@/services/freelancer/review";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayFreelancerRatings from "../ratings/get-ratings";
import Footer from "@/pages/home/footer";
import { FiMapPin } from "react-icons/fi";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import timeAgo from "@/utils/time-ago";
import { getAllbidsApi } from "@/services/freelancer/bids";
import { useRefresh } from "@/context/Refresh-context";
import CircularProgress from "@/components/circular-progress";

function FreelancerProfilePanel() {
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState(null);
  const [bids, setBids] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshFlag } = useRefresh();

  useEffect(() => {
    async function load() {
      const res = await getAllbidsApi();
      setBids(res.bids);
    }
    load();
  }, [refreshFlag]);

  useEffect(() => {
    async function load() {
      try {
        const profileRes = await getFreelancerProfileApi();
        setProfile(profileRes.profile);
      } catch (err) {
        console.error("Error fetching client profile:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!profile?.createdBy) return;

    async function loadReviews() {
      const res = await getFreelancerReviewsApi(profile.createdBy);
      setReviews(res.reviews);
    }

    loadReviews();
  }, [profile]);

  function handleEdit() {
    navigate("/freelancer/edit/profile");
  }

  const completed = bids.filter((b) => b.bidStatus === "completed");
  const incomplete = bids.filter((b) => b.bidStatus === "incomplete");

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Loading Profile....
      </p>
    );

  return (
    <>
      <div className="flex flex-row items-start justify-center pt-4 bg-gradient-to-br from-blue-100 to-indigo-100 gap-4 pb-30">
        <div className="flex flex-col relative w-[895px] rounded-b-sm space-y-4">
          <div className="flex flex-row rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 bg-blue-50">
            <img
              src={profile.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-xl mr-6 shadow-md p-1 bg-gradient-to-br from-blue-300 to-indigo-300"
            />
            <div className="flex flex-col justify-center space-y-1">
              <p className="font-bold text-[30px]">{profile.name}</p>

              <div className="flex flex-row items-center">
                <p className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-4xl ${
                        i < Math.floor(profile.averageRating)
                          ? "text-pink-700"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}

                  <span className="ml-2 mt-1.5 font-semibold text-2xl">
                    {profile.averageRating
                      ? Number(profile.averageRating).toFixed(1)
                      : "0.0"}
                  </span>
                </p>
                <p className="flex -mt-0.5">
                  <span className="ml-3 mr-1 text-3xl opacity-85">💬</span>
                  <span className="text-2xl mt-0.5 font-semibold">
                    {profile.totalReviews ? Number(profile.totalReviews) : "0"}
                  </span>
                </p>
              </div>

              <div className="flex flex-row">
                <p className="font-bold">$ {profile.hourlyRate} / hour</p>
                <span className="mx-3">•</span>
                <FiMapPin className="mt-1" />
                <p className="ml-1 text-gray-700 ">{profile.country}</p>
                <p>
                  <span className="mx-3 text-gray-700 text-sm">•</span>
                  Joined on: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="font-bold text-gray-700 mt-2 text-xl md:text-[29px] tracking-tight">
                {profile.title}
              </div>
            </div>
          </div>
          <div className="absolute top-9 right-6">
            <button className="ml-15 mt-1" onClick={handleEdit}>
              <FaEdit className="hover:text-gray-700 hover:scale-105 text-gray-500 cursor-pointer font-semibold text-2xl transition" />
            </button>
          </div>

          <div className="py-8 px-7 space-y-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 bg-blue-50">
            <p className="text-3xl font-semibold">About Me :</p>
            <p className="text-[16px] whitespace-pre-line leading-relaxed text-gray-700">
              {profile.description}
            </p>
          </div>

          <div className="rounded-xl space-y-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] px-6 py-8 bg-blue-50">
            <h2 className="flex flex-row ">
              <p className="text-4xl font-bold ml-2">Reviews</p>{" "}
              <span className="mx-3 mt-1 text-3xl text-gray-500">•</span>
              <p className="font-bold text-[31px]">{profile.totalReviews}</p>
            </h2>

            {!reviews && <p>Loading reviews...</p>}

            {reviews && reviews.length > 0 ? (
              <div className="space-y-3 pr-8 pl-2">
                {reviews.slice(0, visibleCount).map((rev) => (
                  <div
                    key={rev._id}
                    className="border-b border-gray-300 pb-6 last:border-none space-y-6"
                  >
                    <div className="flex flex-row justify-between space-x-3">
                      <div className="flex flex-row space-x-4 items-center">
                        <img
                          src={
                            rev.reviewerProfile?.profileImage ||
                            "/default-avatar.png"
                          }
                          alt="Freelancer"
                          className="w-17 h-17 mt-2 rounded-md object-cover border"
                        />
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center gap-6">
                            <p className="font-semibold text-[20px]">
                              {rev.reviewerProfile?.name}
                            </p>
                            <div>
                              <DisplayFreelancerRatings value={rev.rating} />
                            </div>
                          </div>
                          <div className="flex flex-row gap-3">
                            <p className="flex flex-row space-x-3 mt-0.5">
                              <FiMapPin className="mt-1 mr-1" />
                              {rev.reviewerProfile?.country}
                            </p>
                            <p className="mt-0.5">
                              <span className="text-gray-800 mr-3">•</span>
                              <span className="text-black">
                                {timeAgo(rev.createdAt)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-800 mt-2 ml-2">{rev.reviewText}</p>
                  </div>
                ))}
                {visibleCount < reviews.length && (
                  <button
                    onClick={() => setVisibleCount(visibleCount + 5)}
                    className="mt-2 cursor-pointer ml-2 mb-8 text-blue-600 font-semibold hover:underline"
                  >
                    Show More
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-600 ml-3 text-xl mb-10">
                No reviews yet.
              </p>
            )}
          </div>
        </div>

        <div className=" flex flex-col sticky top-2 bg-blue-50 p-7 rounded-xl space-y-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[245px]">
          <div className="flex flex-row gap-2">
            <CircularProgress
              value={(
                (completed.length / (completed.length + incomplete.length)) *
                100
              ).toFixed(0)}
            />
            <span className="text-xl mt-2"> Success Rate</span>
          </div>
          <div className="flex flex-row space-x-2 mx-2 mb-6">
            {" "}
            <FaCheckCircle className="text-green-700 text-2xl mt-1" />
            <span className="text-xl">Completed</span>{" "}
            <span className="font-semibold text-xl">{completed.length}</span>
          </div>

          <div className="flex flex-row">
            <p className="flex flex-row flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="flex border-[0.2px] border-blue-600 font-semibold text-blue-700 bg-blue-100 rounded-sm px-4 pt-0.5 pb-1 text-sm"
                >
                  {skill}
                  {i !== profile.skills.length - 1}
                </span>
              ))}
            </p>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default FreelancerProfilePanel;

// border-4 border-white shadow-indigo-400 shadow-[0_0_15px_rgba(0,0,0,0.3)]
