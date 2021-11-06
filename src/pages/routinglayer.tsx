import { NextSeo } from 'next-seo'
import * as React from 'react'

import routes from '~/config/routes'

export default function RoutingLayerPage() {
  return (
    <>
      <NextSeo
        title={routes.routinglayer.seo.title}
        description={routes.routinglayer.seo.description}
        openGraph={routes.routinglayer.seo.openGraph}
      />

      Hello World!
    </>
  )
}
