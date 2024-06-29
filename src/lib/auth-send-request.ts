import MagicLinkEmail from '@/emails/magic-link-email'

import { resend } from '@/lib/resend'

export async function sendVerificationRequest(params: any) {
  const { identifier, url } = params
  const { host } = new URL(url)

  try {
    const data = await resend.emails.send({
      from: 'no-reply@timsserver.com',
      to: [identifier],
      subject: `Log in to Reco Games`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    })
    return { success: true, data }
  } catch (error) {
    throw new Error('Failed to send the verification Email.')
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
;``
