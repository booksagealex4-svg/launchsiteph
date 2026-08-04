import { Route, Routes } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import Home from "@/pages/Home"
import Templates from "@/pages/Templates"
import TemplateDetail from "@/pages/TemplateDetail"
import Pricing from "@/pages/Pricing"
import Process from "@/pages/Process"
import Resources from "@/pages/Resources"
import ArticleDetail from "@/pages/ArticleDetail"
import About from "@/pages/About"
import Contact from "@/pages/Contact"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:slug" element={<TemplateDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ArticleDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
