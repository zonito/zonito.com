import { NextSeo } from 'next-seo'
import * as React from 'react'

import { ListDetailView } from '~/components/Layouts'
import { RoutingLayer } from '~/components/RoutingLayer'
import routes from '~/config/routes'

export default function RoutingLayerPage() {
  return (
    <>
      <NextSeo
        title={routes.routinglayer.seo.title}
        description={routes.routinglayer.seo.description}
        openGraph={routes.routinglayer.seo.openGraph}
      />

      <ListDetailView list={null} hasDetail detail={<RoutingLayer />} />
    </>
  )
}
