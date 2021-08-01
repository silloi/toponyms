import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="mt-16 overflow-y-auto">
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
