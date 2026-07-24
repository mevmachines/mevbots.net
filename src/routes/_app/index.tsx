import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

import { z } from "zod";

import { Home } from "#/pages";

import { seo } from "#/utils";

import { PERIOD } from "#/constants";

const periodValues = Object.values(PERIOD);

const searchSchema = z.object({
  period: z.enum(periodValues).default(PERIOD.DAY),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export const Route = createFileRoute("/_app/")({
  validateSearch: searchSchema,
  search: {
    middlewares: [
      stripSearchParams({
        period: PERIOD.DAY,
        page: 1,
        limit: 10,
      }),
    ],
  },
  head: () => ({
    meta: seo({
      title: "MEV bots",
      description: "Maximal Extractable Value tracker powered by MEVBOTS DAO",
      image:
        "https://raw.githubusercontent.com/stabilitydao/.github/main/os/mevbots.png",
    }),
  }),
  component: Home,
});
