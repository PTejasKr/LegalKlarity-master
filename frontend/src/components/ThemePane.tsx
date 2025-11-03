"use client"

import ThemeToggle from "./ThemeToggle"

export default function ThemePane() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-background/5 border border-border backdrop-blur-lg p-2 rounded-full shadow-lg">
        <ThemeToggle />
      </div>
    </div>
  )
}
