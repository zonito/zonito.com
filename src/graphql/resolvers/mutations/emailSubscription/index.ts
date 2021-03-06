import { UserInputError } from 'apollo-server-errors'

import { Context } from '~/graphql/context'
import {
  EmailSubscriptionType,
  MutationEditEmailSubscriptionArgs,
} from '~/graphql/types.generated'
import { revue } from '~/lib/revue'
import { validEmail } from '~/lib/validators'

export async function editEmailSubscription(
  _,
  args: MutationEditEmailSubscriptionArgs,
  ctx: Context
) {
  const { data } = args
  const { subscribed, type, email } = data
  const { prisma, viewer } = ctx

  if (!viewer?.email && !email) {
    throw new UserInputError('No email')
  }

  if (email && !validEmail(email)) {
    throw new UserInputError('Invalid email')
  }

  const emailToUse = viewer && viewer.email ? viewer.email : email
  if (type === EmailSubscriptionType.Newsletter) {
    if (subscribed) {
      revue.addSubscriber({ email: emailToUse, doubleOptIn: !viewer })
    } else {
      revue.removeSubscriber({ email: emailToUse, doubleOptIn: !viewer })
    }
  }

  return viewer
    ? await prisma.user.findUnique({ where: { id: viewer.id } })
    : null
}
