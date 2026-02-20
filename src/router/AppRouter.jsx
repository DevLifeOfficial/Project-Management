import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import Project from '../pages/Project'
import ProjectDetails from '../pages/ProjectDetails'

export default function AppRouter() {
  return (
   <MainLayout>
    <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
    </MainLayout>
  )
}
