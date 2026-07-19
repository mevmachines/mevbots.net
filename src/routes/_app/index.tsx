import { createFileRoute } from '@tanstack/react-router'

import { Home } from '#/pages'

import { seo } from '#/utils'

export const Route = createFileRoute('/_app/')({
  head: () => ({
    meta: seo({
      title: 'MEVBOTS.NET',
      description: 'MEVBOTS.NET description',
      image: '/mevbots.png',
    }),
  }),
  component: Home,
})
