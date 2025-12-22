import axios from "axios";

export default async function createClientProjectApi(body) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:5000/api/v1/client/project",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getClientProjectApi() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/v1/client/project",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getClientProjectsApi(clientId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/v1/client/project/all/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getSingleClientProjectApi(projectId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/v1/client/project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function deleteProjectApi(projectId) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `http://localhost:5000/api/v1/client/project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function updateProjectApi(projectId, body) {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `http://localhost:5000/api/v1/client/project/${projectId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
