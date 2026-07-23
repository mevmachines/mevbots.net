import axios from "axios";

import type { Period } from "#/types";

export const fetchMiners = async (period: Period, page = 1, limit = 10) => {
  const apiUrl = `https://api.mevbots.net/api/miners?period=${period}&page=${page}&limit=${limit}`;

  try {
    const request = await axios.get(apiUrl);

    return request.data;
  } catch (error) {
    console.warn(`Failed to retrieve API data from ${apiUrl}:`, error);
    return undefined;
  }
};
