import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="mt-16 pt-4 overflow-y-auto">
        <main className="max-w-screen-md mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
