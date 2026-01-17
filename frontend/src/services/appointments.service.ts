import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`;

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const AppointmentsService = {
  create(data: {
    service: string;
    date: string;
    notes?: string;
  }) {
    return axios.post(API_URL, data, {
      headers: getAuthHeaders(),
    });
  },

  getMine() {
    return axios.get(`${API_URL}/me`, {
      headers: getAuthHeaders(),
    });
  },

  cancel(id: string) {
    return axios.patch(
      `${API_URL}/${id}/cancel`,
      {},
      { headers: getAuthHeaders() },
    );
  },
};
