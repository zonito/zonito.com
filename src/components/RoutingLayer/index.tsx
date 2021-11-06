import React from 'react'

import { Detail } from '~/components/ListDetail/Detail'
import { TitleBar } from '~/components/ListDetail/TitleBar'
import routes from '~/config/routes'
import { MarkdownRenderer } from '../MarkdownRenderer'

const text = `
# Routing Layer
`

export function RoutingLayer() {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef(null)

  return (
    <Detail.Container data-cy="routing-layer" ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title={'Routing Layer'}
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />

      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>
            {routes.routinglayer.seo.title}
          </Detail.Title>
          <p className="text-xl text-tertiary">
            {routes.routinglayer.seo.description}
          </p>
        </Detail.Header>

        <MarkdownRenderer
          children={text}
          variant="longform"
          className="pt-16 space-y-24"
        />
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
