import { getFreelancerReviewsApi } from "@/services/freelancer/review";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayFreelancerRatings from "../ratings/get-ratings";
import Footer from "@/pages/home/footer";
import { FiMapPin } from "react-icons/fi";
import { getsingleProfileDetails } from "@/services/client/get-profiles";
import timeAgo from "@/utils/time-ago";
import { FaCheckCircle } from "react-icons/fa";
import CircularProgress from "@/components/circular-progress";
import { getBidsApi } from "@/services/freelancer/bids";
import { useRefresh } from "@/context/Refresh-context";

function ClientSingleProfileSearch() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [bids, setBids] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const { refreshFlag } = useRefresh();

  useEffect(() => {
    async function load() {
      const res = await getBidsApi(id);
      setBids(res.bids);
    }
    load();
  }, [refreshFlag]);

  useEffect(() => {
    async function load() {
      try {
        const profileRes = await getsingleProfileDetails(id);
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

  const completed = bids.filter((b) => b.status === "completed");
  const incomplete = bids.filter((b) => b.status === "incomplete");

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Loading Profile....
      </p>
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-4 pt-4 pb-30 items-start bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="flex flex-col w-full lg:w-[890px] rounded-b-sm space-y-4 px-3 lg:px-0">
          <div className="flex flex-col sm:flex-row rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-4 sm:p-6 bg-blue-50">
            <img
              src={
                profile.profileImage
                  ? profile.profileImage
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6 shadow-md p-1 bg-gradient-to-br from-blue-400 to-indigo-400"
            />
            <div className="flex flex-col justify-center space-y-1">
              <p className="font-bold text-xl sm:text-[30px]">{profile.name}</p>

              <div className="flex flex-wrap items-center">
                <p className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl sm:text-4xl ${i < Math.floor(profile.averageRating) ? "text-pink-700" : "text-gray-400"}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 mt-1.5 font-semibold text-lg sm:text-2xl">
                    {profile.averageRating
                      ? Number(profile.averageRating).toFixed(1)
                      : "0.0"}
                  </span>
                </p>

                <p className="flex items-center sm:-mt-0.5 ml-2">
                  <span className="mr-1 text-2xl sm:text-3xl opacity-85">
                    💬
                  </span>
                  <span className="text-lg sm:text-2xl font-semibold">
                    {profile.totalReviews ? Number(profile.totalReviews) : "0"}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center text-sm sm:text-base">
                <p className="font-bold">{profile.hourlyRate} $ / hour</p>
                <span className="mx-2">•</span>
                <FiMapPin className="mt-0.5" />
                <p className="ml-1 text-gray-700">{profile.country}</p>
                <span className="mx-2">•</span>
                <p>
                  Joined on: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="font-bold text-gray-700 mt-2 text-lg sm:text-xl md:text-[29px] tracking-tight">
                {profile.title}
              </div>
            </div>
          </div>

          <div className="py-6 px-5 sm:px-7 space-y-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-blue-50">
            <p className="text-2xl sm:text-3xl font-semibold">About Me :</p>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-gray-700 whitespace-pre-line">
              {profile.description}
            </p>
          </div>

          <div className="rounded-xl space-y-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] px-4 sm:px-6 py-6 sm:py-8 bg-blue-50">
            <h2 className="flex items-center flex-wrap">
              <p className="text-2xl sm:text-4xl font-bold ml-2">Reviews</p>
              <span className="mx-3 mt-1 text-2xl sm:text-3xl text-gray-500">
                •
              </span>
              <p className="font-bold text-2xl sm:text-[31px]">
                {profile.totalReviews}
              </p>
            </h2>

            {!reviews && <p>Loading reviews...</p>}

            {reviews && reviews.length > 0 ? (
              <div className="space-y-3 pr-2 sm:pr-8 pl-1 sm:pl-2">
                {reviews.slice(0, visibleCount).map((rev) => (
                  <div
                    key={rev._id}
                    className="border-b border-gray-300 pb-6 last:border-none space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 items-start sm:items-center">
                      <img
                        src={
                          rev.reviewerProfile?.profileImage ||
                          "/default-avatar.png"
                        }
                        alt="Freelancer"
                        className="w-14 h-14 sm:w-17 sm:h-17 rounded-xl object-cover border"
                      />
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-semibold text-[18px] sm:text-[20px]">
                            {rev.reviewerProfile?.name}
                          </p>
                          <DisplayFreelancerRatings value={rev.rating} />
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <p className="flex items-center">
                            <FiMapPin className="mr-1" />
                            {rev.reviewerProfile?.country}
                          </p>
                          <p>
                            <span className="mr-2">•</span>
                            {timeAgo(rev.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mt-2 ml-1 sm:ml-2">
                      {rev.reviewText}
                    </p>
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

        <div className="flex flex-col w-full sm:w-[245px] sticky top-2 bg-blue-50 p-6 rounded-xl space-y-3 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <CircularProgress
              value={(
                (completed.length / (completed.length + incomplete.length)) *
                100
              ).toFixed(0)}
            />
            <span className="text-lg sm:text-xl mt-2">Success Rate</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-700 text-2xl" />
            <span className="text-lg">Completed</span>
            <span className="font-semibold text-lg">{completed.length}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="border-[0.2px] border-blue-600 font-semibold text-blue-700 bg-blue-100 rounded-sm px-4 pt-0.5 pb-1 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default ClientSingleProfileSearch;
