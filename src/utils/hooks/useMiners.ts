import { useQuery } from "@tanstack/react-query";

import { fetchMiners } from "../queries";

import type { Period } from "#/types";

export const useMiners = (period: Period, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["Miners", period, page, limit],
    queryFn: () => fetchMiners(period, page, limit),
  });
};
