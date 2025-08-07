import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

interface TableData {
  headers: string[]
  rows: string[][]
}

function Table({ data }: { data: TableData }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

function CustomLink(props: CustomLinkProps) {
  const { href, ...rest } = props

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

interface RoundedImageProps extends React.ComponentProps<typeof Image> {
  alt: string
}

function RoundedImage(props: RoundedImageProps) {
  const { alt, ...rest } = props
  return <Image className="rounded-lg" alt={alt || ''} {...rest} />
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string
}

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children as string)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

// Custom table components for markdown tables
function MarkdownTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return <table className="prose-table" {...props} />
}

function MarkdownThead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />
}

function MarkdownTbody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

function MarkdownTr(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />
}

function MarkdownTh(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} />
}

function MarkdownTd(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} />
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  // Markdown table components
  table: MarkdownTable,
  thead: MarkdownThead,
  tbody: MarkdownTbody,
  tr: MarkdownTr,
  th: MarkdownTh,
  td: MarkdownTd,
}

interface CustomMDXProps {
  source: string
  components?: Record<string, React.ComponentType<unknown>>
}

export async function CustomMDX(props: CustomMDXProps) {
  return await MDXRemote({
    ...props,
    components: { ...components, ...(props.components || {}) },
  })
}
