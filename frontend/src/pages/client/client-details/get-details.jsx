import { getClientDetailsApi } from "@/services/client/client-details";
import { getClientReviewsApi } from "@/services/client/review";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayClientRatings from "../ratings/get-ratings";
import Footer from "@/pages/home/footer";
import { FiMapPin } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import timeAgo from "@/utils/time-ago";
import { getClientProjectApi } from "@/services/client/project";

function ClientDetailsPanel() {
  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState(null);
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getClientProjectApi();
      setProjects(res.projects);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const detailsRes = await getClientDetailsApi();
        setDetails(detailsRes.details);
      } catch (err) {
        console.error("Error fetching client details:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!details?.createdBy) return;

    async function loadReviews() {
      const res = await getClientReviewsApi(details.createdBy);
      setReviews(res.reviews);
    }

    loadReviews();
  }, [details]);

  function handleEdit() {
    navigate("/client/edit/details");
  }

  const inprogress = projects.filter((p) => p.status === "inprogress");
  const open = projects.filter((p) => p.status === "pending");

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Loading Profile....
      </p>
    );

  return (
    <>
      <div className="flex flex-row items-start justify-center gap-4 pt-4 pb-30 bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="flex flex-col relative w-[890px] rounded-b-sm space-y-4">
          <div className="flex flex-row relative rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 bg-blue-50">
            <img
              src={details.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-44 h-44 object-cover rounded-xl mr-6 shadow-md p-1 bg-gradient-to-br from-blue-400 to-indigo-400"
            />
            <div className="flex flex-col justify-center space-y-1">
              <p className="font-bold text-4xl">{details.name}</p>

              <div className="flex flex-row items-center">
                <p className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-4xl ${
                        i < Math.floor(details.averageRating)
                          ? "text-pink-700"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}

                  <span className="ml-2 mt-1.5 font-semibold text-2xl">
                    {details.averageRating
                      ? Number(details.averageRating).toFixed(1)
                      : "0.0"}
                  </span>
                </p>
                <p className="flex -mt-0.5">
                  <span className="ml-3 mr-1 text-3xl opacity-85">💬</span>
                  <span className="text-2xl mt-0.5 font-semibold">
                    {details.totalReviews ? Number(details.totalReviews) : "0"}
                  </span>
                </p>
              </div>
              <div className="flex flex-row ml-1 text-gray-700">
                <FiMapPin className="mt-1" />
                <p className="ml-1">{details.country}</p>
                <p>
                  <span className="mx-3">•</span>
                  {details.clientType}
                </p>

                <p className="">
                  <span className="mx-3">•</span>
                  Joined on: {new Date(details.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <button className="absolute top-6 right-6" onClick={handleEdit}>
            <FaEdit className="hover:text-gray-700 hover:scale-105 text-gray-500 cursor-pointer font-semibold text-2xl transition" />
          </button>

          <div className="py-8 px-7 space-y-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 bg-blue-50">
            <p className="text-3xl font-semibold">About Me :</p>
            <p className="text-[16px] whitespace-pre-line leading-relaxed text-gray-700">
              {details.description}
            </p>
          </div>

          <div className="rounded-xl space-y-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] px-6 py-8 bg-blue-50">
            <h2 className="flex flex-row">
              <p className="text-4xl font-bold ml-2">Reviews</p>{" "}
              <span className="mx-3 mt-1 text-3xl text-gray-500">•</span>
              <p className="font-bold text-[31px]">{details.totalReviews}</p>
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
                          <div className="flex flex-row gap-6 items-center">
                            <p className="font-semibold text-[20px]">
                              {rev.reviewerProfile?.name}
                            </p>
                            <div>
                              <DisplayClientRatings value={rev.rating} />
                            </div>
                          </div>
                          <div className="flex flex-row space-x-2">
                            <p className="font-bold text-md">
                              {rev.reviewerProfile?.title}
                            </p>
                            <p className="flex flex-row space-x-2">
                              <span className="text-gray-800">•</span>
                              <FiMapPin className="mt-1 mr-1" />
                              {rev.reviewerProfile?.country}
                            </p>
                            <p className="space-x-2">
                              <span className="text-gray-800">•</span>
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
                    className="mt-2 mb-6 cursor-pointer ml-2 text-blue-600 font-semibold hover:underline"
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

        <div className=" flex flex-col sticky top-2 bg-blue-50 px-4 py-10 rounded-xl space-y-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[245px]">
          <div className="flex flex-row  text-lg justify-between">
            Open projects
            <span className=" font-bold text-lg text-green-600">
              {open.length}
            </span>
          </div>
          <div className="flex flex-row  text-lg justify-between">
            Active projects
            <span className="font-bold text-lg text-green-700">
              {inprogress.length}
            </span>
          </div>

          <div className="flex flex-row  text-lg justify-between">
            Total projects
            <span className="font-bold text-green-700">{projects.length}</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ClientDetailsPanel;
