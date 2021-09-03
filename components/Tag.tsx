import Link from 'next/link'

type Props = {
  name?: string
  checked?: boolean
  replace?: boolean
}

const ALL = 'すべて'

const Tag = ({ name, checked, replace}: Props) => {

  return (
    <li key={name || ALL} className={"px-1.5 mb-1 border-2 rounded-md " + (checked ? 'bg-blue-100' : '')}>
      <Link href={name ? `/#${name}` : '/'} replace={replace}>
        <a>#{name || ALL}</a>
      </Link>
    </li>
  )
}

export default Tag
