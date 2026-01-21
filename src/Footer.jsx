import React from 'react'

export default function Footer() {
  return (
     <footer className="w-full bg-black/40 text-white text-center py-3 backdrop-blur-md">
      <p className="text-sm">
        © 2026 Weather App • Built with React & Tailwind CSS
      </p>
      <p className="text-xs mt-1">
        Powered by OpenWeather API
      </p>
    </footer>
  )
}
