"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Shield, Smartphone, Monitor, Laptop } from "lucide-react"
import PlatformConfig from "@/components/platform-config"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import useSWR from "swr"
import { getFetcher } from "@/lib/axios"
import { PlatformData } from "@/types/platform"
import PlatformSkeleton from "@/components/platform-skeleton"

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("android")
  const { toast } = useToast()
  
  const { data: androidData, error: androidError, isLoading: androidIsLoading, mutate: mutateAndroid } = useSWR<PlatformData>(
    "/android",
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError() {
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados do android",
          variant: "destructive",
        })
        console.error("SWR error:", androidError);
      },
    }
  )

  const { data: linuxData, error: linuxError, isLoading: linuxIsLoading, mutate: mutateLinux } = useSWR<PlatformData>(
    "/linux",
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError() {
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados do linux",
          variant: "destructive",
        })
        console.error("SWR error:", linuxError);
      },
    }
  )
  
  const { data: windowsData, error: windowsError, isLoading: windowsIsLoading, mutate: mutateWindows } = useSWR<PlatformData>(
    "/windows",
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError() {
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados do windows",
          variant: "destructive",
        })
        console.error("SWR error:", windowsError);
      },
    }
  )

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                FOCCUSS
              </h1>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <Smartphone className="w-5 h-5 mr-2 text-green-400" />
                Android
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {androidData?.blockedApps.filter((app) => app.isBlocked).length ?? 0}
              </div>
              <p className="text-gray-400 text-sm">Apps bloqueados</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <Laptop className="w-5 h-5 mr-2 text-amber-400" />
                Linux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {linuxData?.blockedApps.filter((app) => app.isBlocked).length}
              </div>
              <p className="text-gray-400 text-sm">Apps bloqueados</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <Monitor className="w-5 h-5 mr-2 text-blue-400" />
                Windows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {windowsData?.blockedApps.filter((app) => app.isBlocked).length}
              </div>
              <p className="text-gray-400 text-sm">Apps bloqueados</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Configuration */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger
                  value="android"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-800 data-[state=active]:text-white"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Android
                </TabsTrigger>
                <TabsTrigger
                  value="linux"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-700 data-[state=active]:text-white"
                >
                  <Laptop className="w-4 h-4 mr-2" />
                  Linux
                </TabsTrigger>
                <TabsTrigger
                  value="windows"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-800 data-[state=active]:text-white"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Windows
                </TabsTrigger>
              </TabsList>

              <TabsContent value="android" className="mt-6">
                { androidIsLoading || !androidData ? (
                  <PlatformSkeleton />
                ) : (
                  <PlatformConfig platform="android" data={androidData} />
                )}
              </TabsContent>

              <TabsContent value="linux" className="mt-6">
                { linuxIsLoading || !linuxData ? (
                  <PlatformSkeleton />
                ) : (
                  <PlatformConfig platform="linux" data={linuxData} />
                )}
              </TabsContent>

              <TabsContent value="windows" className="mt-6">
                { windowsIsLoading || !windowsData ? (
                  <PlatformSkeleton />
                ) : (
                  <PlatformConfig platform="windows" data={windowsData} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
