import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";

import { Home } from "#/pages";

import { seo } from "#/utils";

import { PERIOD } from "#/constants";

const periodValues = Object.values(PERIOD);

const searchSchema = z.object({
  period: z.enum(periodValues).default(PERIOD.DAY).catch(PERIOD.DAY),
  page: z.coerce.number().int().positive().default(1).catch(1),
  limit: z.coerce.number().int().positive().default(5).catch(5),
});

export const Route = createFileRoute("/_app/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: seo({
      title: "MEVBOTS.NET",
      description: "MEVBOTS.NET description",
      image:
        "https://raw.githubusercontent.com/stabilitydao/.github/main/os/mevbots.png",
    }),
  }),
  component: Home,
});
