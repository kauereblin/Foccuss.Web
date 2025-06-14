"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, AppWindowIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Platform, PlatformData, Schedule, AndroidPlatformData, AndroidAppType, AppType } from "@/types/platform"
import { mutate } from "swr"
import {
  saveAndroidBlockedApps,
  saveWindowsBlockedApps,
  saveLinuxBlockedApps,
  saveAndroidTimeSettings,
  saveWindowsTimeSettings,
  saveLinuxTimeSettings,
} from "@/lib/api-mutations"

interface PlatformConfigProps {
  platform: Platform
  data: PlatformData | AndroidPlatformData
}

const colorClasses = {
  android: {
    gradient: "from-green-600 to-green-800",
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
    text: "text-green-400",
    bullet: "bg-green-500",
    bulletInactive: "bg-red-500",
  },
  windows: {
    gradient: "from-blue-600 to-blue-800",
    text: "text-blue-400",
    bullet: "bg-green-500",
    bulletInactive: "bg-red-500",
  },
  linux: {
    gradient: "from-amber-500 to-amber-700",
    text: "text-amber-400",
    bullet: "bg-green-500",
    bulletInactive: "bg-red-500",
  },
  gray: {
    gradient: "from-gray-600 to-gray-800",
    text: "text-gray-400",
    bullet: "bg-green-500",
    bulletInactive: "bg-red-500",
  },
}

const daysOfWeek = [
  { key: "mon", label: "Seg" },
  { key: "tue", label: "Ter" },
  { key: "wed", label: "Qua" },
  { key: "thu", label: "Qui" },
  { key: "fri", label: "Sex" },
  { key: "sat", label: "Sáb" },
  { key: "sun", label: "Dom" },
]

function getHoverTextClass(platform: Platform) {
  switch (platform) {
    case "android":
      return "hover:text-green-400";
    case "windows":
      return "hover:text-blue-400";
    case "linux":
      return "hover:text-amber-400";
    default:
      return "hover:text-gray-400";
  }
}

export default function PlatformConfig({ platform, data }: PlatformConfigProps) {
  const [apps, setApps] = useState<AppType[] | AndroidAppType[]>(data.blockedApps)
  const [schedule, setSchedule] = useState(data.blockTimeSettings)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const colors = colorClasses[platform] || colorClasses.gray

  const dayMap: Record<string, keyof Schedule> = {
    mon: 'monday',
    tue: 'tuesday',
    wed: 'wednesday',
    thu: 'thursday',
    fri: 'friday',
    sat: 'saturday',
    sun: 'sunday'
  }

  const toggleAppBlocked = (identifier: string) => {
    if (platform === 'android') {
      setApps((currentApps) => 
        (currentApps as AndroidAppType[]).map((app) => 
          app.packageName === identifier 
            ? { ...app, isBlocked: !app.isBlocked } 
            : app
        )
      )
    } else {
      setApps((currentApps) => 
        (currentApps as AppType[]).map((app) => 
          app.appPath === identifier 
            ? { ...app, isBlocked: !app.isBlocked } 
            : app
        )
      )
    }
  }

  const toggleScheduleDay = (day: string) => {
    const dayKey = dayMap[day]
    if (dayKey) {
      setSchedule({
        ...schedule,
        [dayKey]: !schedule[dayKey]
      })
    }
  }

  const filteredApps = apps.filter((app) => app.appName.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSaveConfiguration = async () => {
    setIsSaving(true)

    try {
      switch (platform) {
        case "android":
          {
            const androidApps = apps.map((app) => ({
              packageName: (app as AndroidAppType).packageName,
              appName: app.appName,
              isBlocked: app.isBlocked,
            }))
            await saveAndroidBlockedApps(androidApps)
          } break
        case "windows":
          await saveWindowsBlockedApps(apps as AppType[])
          break
        case "linux":
          await saveLinuxBlockedApps(apps as AppType[])
          break
      }

      switch (platform) {
        case "android":
          await saveAndroidTimeSettings(schedule)
          break
        case "windows":
          await saveWindowsTimeSettings(schedule)
          break
        case "linux":
          await saveLinuxTimeSettings(schedule)
          break
      }

      await mutate(`/${platform}`)

      toast({
        title: "Configurações salvas com sucesso!",
        description: `As configurações de ${platform} foram atualizadas.`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar configurações",
        description: `Ocorreu um erro ao salvar as configurações de ${platform}.`,
        variant: "destructive",
      })

      console.error(`Erro ao salvar configurações para ${platform}:`, error)
    } finally {
      setIsSaving(false)
    }
  }

  // format schedule times to HH:MM format
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }
  const startTime = formatTime(schedule.startHour, schedule.startMinute)
  const endTime = formatTime(schedule.endHour, schedule.endMinute)

  return (
    <div className="space-y-6">
      {/* Apps Configuration */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <AppWindowIcon className={`w-5 h-5 mr-2 ${colors.text}`} />
            Aplicativos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Buscar aplicativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredApps.map((app, idx) => (
              <div
                key={
                  (platform === 'android' 
                  ? (app as AndroidAppType).packageName 
                  : (app as AppType).appPath) + idx
                }
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 bg-gray-500/10 border-gray-500/20`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${app.isBlocked ? colors.bulletInactive : colors.bullet}`}
                    ></div>
                    <div>
                      <h4 className="font-medium text-white">
                        {platform === 'android' 
                        ? (app as AndroidAppType).packageName 
                        : (app as AppType).appPath}</h4>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {app.isBlocked && (
                    <Badge variant="secondary" className={`${colors.text} bg-gray-500/10 border-0`}>
                      Bloqueado
                    </Badge>
                  )}
                  <Switch 
                    checked={app.isBlocked} 
                    onCheckedChange={() => toggleAppBlocked(
                      platform === 'android' 
                        ? (app as AndroidAppType).packageName 
                        : (app as AppType).appPath
                    )} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Configuration */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Calendar className={`w-5 h-5 mr-2 ${colors.text}`} />
            Agenda de Bloqueio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-white font-medium">Ativar agenda</Label>
            <Switch checked={schedule.isActive} onCheckedChange={(isActive) => setSchedule({ ...schedule, isActive })} />
          </div>

          {schedule.isActive && (
            <>
              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <Label className="text-white font-medium">Dias da semana</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day.key}
                      variant={schedule[dayMap[day.key]] ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleScheduleDay(day.key)}
                      className={
                        schedule[dayMap[day.key]]
                          ? `${colors.gradient} transition duration-500 bg-gradient-to-r text-white border-0 hover:bg-gradient-to-t`
                          : `bg-white/5 border-white/10 text-white hover:bg-white/20 ${getHoverTextClass(platform)}`
                      }
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-white" />
                    Horário de início
                  </Label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':')
                      setSchedule({
                        ...schedule,
                        startHour: parseInt(hours, 10),
                        startMinute: parseInt(minutes, 10)
                      })
                    }}
                    className="bg-white/5 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-white" />
                    Horário de fim
                  </Label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':')
                      setSchedule({
                        ...schedule,
                        endHour: parseInt(hours, 10),
                        endMinute: parseInt(minutes, 10)
                      })
                    }}
                    className="bg-white/5 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSaveConfiguration}
          disabled={isSaving}
          className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold px-8 py-2 transition-all duration-300 transform hover:scale-105`}
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Salvando...</span>
            </div>
          ) : (
            `Salvar Configurações ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
          )}
        </Button>
      </div>
    </div>
  )
}
