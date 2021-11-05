import { useRouter } from 'next/router'
import * as React from 'react'
import { Plus } from 'react-feather'

import { AddBookmarkDialog } from '~/components/Bookmarks/AddBookmarkDialog'
import { GhostButton } from '~/components/Button'
import {
  BookmarksIcon,
  ExternalLinkIcon,
  GitHubIcon,
  HomeIcon,
  SecurityChecklistIcon,
  StackIcon,
  TwitterIcon,
  WritingIcon,
} from '~/components/Icon'
import { UserRole, useViewerQuery } from '~/graphql/types.generated'

import { NavigationLink } from './NavigationLink'

function ThisAddBookmarkDialog() {
  return (
    <AddBookmarkDialog
      trigger={
        <GhostButton size="small-square">
          <Plus size={16} />
        </GhostButton>
      }
    />
  )
}

export function SidebarNavigation() {
  const router = useRouter()
  const { data } = useViewerQuery()
  const isAdmin = data?.viewer?.role === UserRole.Admin
  const links = [
    {
      href: '/',
      label: 'Home',
      icon: HomeIcon,
      trailingAccessory: null,
      isActive: router.asPath === '/',
      trailingAction: null,
      isExternal: false,
    },

    {
      href: '/writing',
      label: 'Writing',
      icon: WritingIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf('/writing') >= 0,
      trailingAction: null,
      isExternal: false,
    },

    'Me',

    {
      href: '/bookmarks',
      label: 'Bookmarks',
      icon: BookmarksIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf('/bookmarks') >= 0,
      trailingAction: isAdmin ? ThisAddBookmarkDialog : null,
      isExternal: false,
    },

    {
      href: '/stack',
      label: 'Stack',
      icon: StackIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf('/stack') >= 0,
      trailingAction: null,
      isExternal: false,
    },

    'Projects',

    {
      href: '/security',
      label: 'Security Checklist',
      icon: SecurityChecklistIcon,
      trailingAccessory: null,
      isActive: router.asPath.indexOf('/security') >= 0,
      trailingAction: null,
      isExternal: false,
    },

    'Online',

    {
      href: 'https://twitter.com/zonito87',
      label: 'Twitter',
      icon: TwitterIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },

    {
      href: 'https://github.com/zonito',
      label: 'GitHub',
      icon: GitHubIcon,
      trailingAccessory: ExternalLinkIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
  ]

  return (
    <ul className="flex-1 px-3 py-3 space-y-1">
      {links.map((link, i) => {
        if (typeof link === 'string') {
          return (
            <li
              key={i}
              className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 dark:text-white text-opacity-40"
            >
              {link}
            </li>
          )
        }

        return <NavigationLink key={i} link={link} />
      })}
    </ul>
  )
}
