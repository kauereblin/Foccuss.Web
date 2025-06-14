export interface AppType {
  appPath: string
  appName: string
  isBlocked: boolean
}

export interface Schedule {
  platform: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  isActive: boolean
}

export interface PlatformData {
  blockedApps: AppType[]
  blockTimeSettings: Schedule
}

export type Platform = "android" | "linux" | "windows" 

export interface AndroidAppType {
  packageName: string
  appName: string
  isBlocked: boolean
}

export interface AndroidPlatformData {
  blockedApps: AndroidAppType[]
  blockTimeSettings: Schedule
}