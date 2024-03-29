import * as React from 'react'

import { Detail } from '~/components/ListDetail/Detail'
import { TitleBar } from '~/components/ListDetail/TitleBar'

import { MarkdownRenderer } from '../MarkdownRenderer'
import { about } from './about'

function SectionTitle(props) {
  return (
    <p
      className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:font-normal md:text-base md:pt-0 md:text-right md:text-opacity-40"
      {...props}
    />
  )
}

function SectionContent(props) {
  return <div className="col-span-10" {...props} />
}

interface TableRowProps {
  href: string
  title: string
  date: string
  subtitle?: string
}

function TableRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center space-x-4 group"
    >
      <span className="flex-none font-medium text-gray-1000 group-hover:underline group-hover:text-blue-600 dark:group-hover:text-blue-500 dark:text-gray-100">
        {title}
      </span>
      <span className="flex-shrink w-full border-t border-gray-300 border-dashed dark:border-gray-800" />
      {subtitle && <span className="flex-none text-tertiary">{subtitle}</span>}
      {date && (
        <span className="flex-none font-mono text-quaternary">{date}</span>
      )}
    </a>
  )
}

function SectionContainer(props) {
  return (
    <div
      className="grid items-start grid-cols-1 gap-6 md:grid-cols-12"
      {...props}
    />
  )
}

const technicalAdvisor = [
  {
    href: 'https://www.centreformindfulness.sg/',
    company: 'Centre for Mindfulness',
    title: 'Technical Advisor',
    date: '2020-\u00a0\u00a0',
  },
  {
    href: 'https://www.positiveconsulting.sg/',
    company: 'Positive Performance Consulting',
    title: 'Technical Consultant',
    date: '2020-2020',
  },
  {
    href: 'http://www.prediction.guru',
    company: 'Prediction Guru',
    title: 'Founding Member',
    date: '2014-2020',
  },
  {
    href: 'http://www.polysports.org',
    company: 'Polysports',
    title: 'Technical Consultant',
    date: '2021-\u00a0\u00a0',
  },
]

const workHistory = [
  {
    href: 'https://www.autodesk.com',
    title: 'Autodesk',
    subtitle: 'Principal Software Engineer',
    date: '2014—\u00a0\u00a0',
  },
  {
    href: 'https://www.google.com',
    title: 'Google',
    subtitle: 'Web Developer',
    date: '2010—2014',
  },
  {
    href: 'https://www.linkedin.com/company/oxylabs-networks',
    title: 'Oxylabs',
    subtitle: 'Game Developer',
    date: '2009—2010',
  },
  {
    href: 'https://www.linkedin.com/company/patni/',
    title: 'Patni Computer Systems Ltd',
    subtitle: 'Software Developer',
    date: '2008—2009',
  },
]

export function Intro() {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef(null)

  return (
    <Detail.Container data-cy="home-intro" ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        title="Love Sharma"
      />

      {/* Keep this div to trigger the magic scroll */}
      <div className="p-4" ref={titleRef} />

      <Detail.ContentContainer>
        <div className="pb-24 space-y-8 md:space-y-16">
          <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <MarkdownRenderer
                className="prose"
                children={about}
                variant="longform"
              />
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Work</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {workHistory.map((job) => (
                  <TableRow
                    href={job.href}
                    title={job.title}
                    subtitle={job.subtitle}
                    date={job.date}
                    key={job.href}
                  />
                ))}
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Consultant</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {technicalAdvisor.map((job) => (
                  <TableRow
                    href={job.href}
                    title={job.company}
                    subtitle={job.title}
                    date={job.date}
                    key={job.href}
                  />
                ))}
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
