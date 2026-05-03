import type { ReactNode } from "react"

interface ContactFormButtonProps {
  className?: string
  children?: ReactNode
}

export default function ContactFormButton({ className = "", children }: ContactFormButtonProps) {
  return (
    <a href="#contact" className={className || "btn-primary"}>
      {children || "Записаться на консультацию"}
    </a>
  )
}
