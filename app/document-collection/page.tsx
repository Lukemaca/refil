import { DocumentProvider } from "./DocumentContext"
import DocumentCollectionContent from "./DocumentCollectionContent"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function DocumentCollectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <DocumentProvider>
        <DocumentCollectionContent />
      </DocumentProvider>
      <Footer />
    </div>
  )
}
