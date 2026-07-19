import type { PERIOD } from '#/constants'

type Period = (typeof PERIOD)[keyof typeof PERIOD]

export type { Period }
