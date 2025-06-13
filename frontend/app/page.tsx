"use client"

import { useState, useEffect } from "react"
import LoginScreen from "@/components/login-screen"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("foccuss-auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem("foccuss-auth", "authenticated")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("foccuss-auth")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {!isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
    </div>
  )
}
