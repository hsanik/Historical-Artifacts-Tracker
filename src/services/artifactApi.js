import { toast } from 'react-toastify'

const BASE_URL = 'https://artifacts-server-side-ldmznqrlw-4niks-projects.vercel.app';

const handleResponse = async (res) => {
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Request failed');
  }
  return res.json();
};

export const getAllArtifacts = async (search='') => {
  const qs = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE_URL}/artifacts${qs}`);
  return handleResponse(res);
};

export const getArtifactById = async (id) => {
  const res = await fetch(`${BASE_URL}/artifacts/${id}`);
  return handleResponse(res);
};

export const addArtifact = async (artifact) => {
  const toastId = toast.loading('Adding artifact…');
  try {
    const res = await fetch(`${BASE_URL}/artifacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artifact),
    });
    const data = await handleResponse(res);
    toast.update(toastId, { render: 'Artifact added!', type: 'success', isLoading: false, autoClose: 2000 });
    return data;
  } catch (err) {
    toast.update(toastId, { render: err.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw err;
  }
};

export const updateArtifact = async (id, updated) => {
  const toastId = toast.loading('Updating artifact…');
  try {
    const res = await fetch(`${BASE_URL}/artifacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    await handleResponse(res);
    toast.update(toastId, { render: 'Artifact updated', type: 'success', isLoading: false, autoClose: 2000 });
  } catch (err) {
    toast.update(toastId, { render: err.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw err;
  }
};

export const deleteArtifact = async (id) => {
  const toastId = toast.loading('Deleting artifact…');
  try {
    const res = await fetch(`${BASE_URL}/artifacts/${id}`, { method: 'DELETE' });
    await handleResponse(res);
    toast.update(toastId, { render: 'Deleted', type: 'success', isLoading: false, autoClose: 2000 });
  } catch (err) {
    toast.update(toastId, { render: err.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw err;
  }
};

export const likeArtifact = async (id, userEmail) => {
  const res = await fetch(`${BASE_URL}/artifacts/${id}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail }),
  });
  return handleResponse(res);
};

export const getMyArtifacts = async (email) => {
  const res = await fetch(`${BASE_URL}/artifacts/mine/${email}`);
  return handleResponse(res);
};

export const getLikedArtifacts = async (email) => {
  const res = await fetch(`${BASE_URL}/likes/${email}`);
  return handleResponse(res);
};

export const getTopArtifacts = async () => {
  const res = await fetch(`${BASE_URL}/artifacts/top`);
  return handleResponse(res);
}; 