import type { ComponentType } from "react"

export interface ProjectType {
  id: number
  name: string
  image: string
  color: string
  description: string
  longDescription: string
  technologies: string[]
  link: string
}

export interface ServiceType {
  id: number
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  color: string
}

export interface FaqType {
  id: number
  question: string
  answer: string
}

export interface LandingPageProps {
  showHeader?: boolean
  showFooter?: boolean
}

export interface SubNavItem {
  title: string
  description?: string
  href: string
  icon?: ComponentType<{ className?: string }> | string
  color?: string
  external?: boolean
}
