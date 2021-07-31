import PREFECTURE from '../db/prefecture'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex w-full px-5 h-16 items-center shadow fixed">
        <p className="text-xl">怖い地名・難読地名</p>
      </header>
      <div className="mt-16 overflow-y-auto">
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
