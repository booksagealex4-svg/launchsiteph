import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { VisitorCounter } from '@/components/VisitorCounter'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ContactPage } from '@/pages/ContactPage'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="flex flex-col p-4 lg:ml-[352px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <VisitorCounter />
    </div>
  )
}

export default App
