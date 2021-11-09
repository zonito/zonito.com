import { UserInputError } from 'apollo-server-errors'

import { Context } from '~/graphql/context'
import {
  MutationAddTagArgs, MutationDeleteTagArgs,
} from '~/graphql/types.generated'
import { graphcdn } from '~/lib/graphcdn'

export async function addTag(
  _,
  args: MutationAddTagArgs,
  ctx: Context
) {
  const { name } = args
  const { prisma } = ctx

  console.log(`Adding tag ${name}`)

  return await prisma.tag.create({
      data: {
        name
      }
    })
    .then((tag) => {
      graphcdn.purgeList('tags')
      return tag
    })
    .catch((err) => {
      console.error({ err })
      throw new UserInputError('Unable to create tag')
    })
}

export async function deleteTag(
  _,
  args: MutationDeleteTagArgs,
  ctx: Context
) {
  const { id } = args
  const { prisma } = ctx

  return await prisma.tag
    .delete({
      where: { id },
    })
    .then(() => {
      graphcdn.purgeList('tags')
      return true
    })
    .catch((err) => {
      console.error({ err })
      throw new UserInputError('Unable to delete tag')
    })
}

