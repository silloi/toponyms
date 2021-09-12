import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-full shadow fixed">
      <div className="max-w-screen-md mx-auto flex px-5 h-16 items-center ">
        <Link href="/">
          <a className="text-xl">日本の地名.com</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
