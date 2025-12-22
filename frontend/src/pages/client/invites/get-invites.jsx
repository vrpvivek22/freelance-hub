import { useEffect, useState } from "react";
import { GetClientInvitesApi } from "@/services/client/invites";

function ClientInvitations() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await GetClientInvitesApi();
        setInvites(res.invitations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  if (loading) return <p>Loading invites...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Invitations</h2>

      {invites.length === 0 ? (
        <p>No invitations sent yet</p>
      ) : (
        <div className="space-y-4">
          {invites.map((invite) => (
            <div key={invite._id} className="border p-4 rounded shadow">
              <p>
                <strong>Project:</strong> {invite.projectId?.projectTitle}
              </p>

              <p>
                <strong>Freelancer:</strong> {invite.freelancerId?.name}
              </p>

              <p>
                <strong>Status:</strong> {invite.status ? "Pending" : "Closed"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientInvitations;
