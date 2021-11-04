export const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://zonito.com' : ''
export const baseEmail = 'hello@zonito.com'

export const defaultSEO = {
  title: 'Zonito | Love Sharma',
  description:
    'Product designer, podcaster, and writer, living in San Francisco.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Zonito | Love Sharma',
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: 'Zonito | Love Sharma',
      },
    ],
  },
  twitter: {
    handle: '@zonito87',
    site: '@zonito',
    cardType: 'summary_large_image',
  },
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/static/${options.image}` }]
    : defaultSEO.openGraph.images

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options.url}`,
    },
  }
}
