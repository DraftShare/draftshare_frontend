import { createFileRoute } from '@tanstack/react-router'
import { Layout } from 'src/01_pages/layout'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})
