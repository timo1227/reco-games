import { env } from '@/../env.mjs'
import { Resend } from 'resend'

const resendApiKey = env.AUTH_RESEND_KEY

export const resend = new Resend(resendApiKey)
