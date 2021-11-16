export const baseUrl = process.env.BASE_URL;
export const baseEmail = 'hello@zonito.com'

export const defaultSEO = {
  title: 'Love Sharma | Personal Website',
  description:
    'Hey, I\'m Love Sharma. I intend to showcase my work, thoughts, and a little about personal things.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Love Sharma | Personal Website',
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: 'Love Sharma | Personal Website',
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
