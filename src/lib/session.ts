import { cache } from 'react'

import { auth } from './auth'

const getSession = cache(auth)

export default getSession
