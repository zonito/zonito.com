import { UserInputError } from 'apollo-server-micro'
import fetch from 'isomorphic-unfetch'

import { Context } from '~/graphql/context'
import {
  MutationAddStackArgs,
  MutationDeleteStackArgs,
  MutationEditStackArgs,
  MutationToggleStackUserArgs,
} from '~/graphql/types.generated'
import { validUrl } from '~/lib/validators'

export async function editStack(_, args: MutationEditStackArgs, ctx: Context) {
  const { id, data } = args
  const { name, url, tag, description, image } = data
  const { prisma } = ctx

  if (!name || name.length === 0)
    throw new UserInputError('Stack must have a name')

  if (!url || url.length === 0)
    throw new UserInputError('Stack must have a URL')

  await prisma.stack.update({
    where: { id },
    data: {
      tags: {
        set: [],
      },
    },
  })

  if (tag) {
    // set new tag
    return await prisma.stack.update({
      where: { id },
      data: {
        name,
        url,
        description,
        image,
        tags: {
          connectOrCreate: {
            where: { name: tag },
            create: { name: tag },
          },
        },
      },
      include: { tags: true },
    })
  } else {
    return await prisma.stack.update({
      where: { id },
      data: {
        name,
        url,
        description,
        image,
      },
      include: { tags: true },
    })
  }
}

export async function addStack(_, args: MutationAddStackArgs, ctx: Context) {
  const { data } = args
  const { url, name, description, image, tag } = data
  const { prisma } = ctx

  if (!validUrl(url)) throw new UserInputError('URL was invalid')

  const tags = tag
    ? {
        connectOrCreate: {
          where: { name: tag },
          create: { name: tag },
        },
      }
    : undefined

  return await prisma.stack.create({
    data: {
      name,
      url,
      description,
      image,
      tags,
    },
    include: { tags: true },
  })
}

export async function deleteStack(
  _,
  args: MutationDeleteStackArgs,
  ctx: Context
) {
  const { id } = args
  const { prisma } = ctx

  await prisma.stack.delete({
    where: { id },
  })

  return true
}

export async function toggleStackUser(
  _,
  args: MutationToggleStackUserArgs,
  ctx: Context
) {
  const { id } = args
  const { prisma, viewer } = ctx

  const stackUsers = await prisma.stack.findUnique({
    where: { id },
    include: { users: true },
  })

  if (stackUsers.users.find((s) => s.id === viewer.id)) {
    const data = await prisma.stack.update({
      where: { id },
      data: {
        users: {
          disconnect: { id: viewer.id },
        },
      },
      include: { users: true },
    })

    const usedBy = data.users
    const usedByViewer =
      viewer?.id && data.users.some((s) => s.id === viewer.id)

    return {
      ...data,
      usedBy,
      usedByViewer,
    }
  } else {
    const data = await prisma.stack.update({
      where: { id },
      data: {
        users: {
          connect: { id: viewer.id },
        },
      },
      include: { users: true },
    })

    const usedBy = data.users
    const usedByViewer =
      viewer?.id && data.users.some((s) => s.id === viewer.id)

    return {
      ...data,
      usedBy,
      usedByViewer,
    }
  }
}
