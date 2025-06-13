import { AndroidAppType, AppType, Schedule } from "@/types/platform"
import { postFetcher } from "./axios"

// Save blocked apps for Android
export async function saveAndroidBlockedApps(apps: AndroidAppType[]) {
  return postFetcher<AndroidAppType[], void>("/blocked-apps/android", { arg: apps })
}

// Save blocked apps for Windows
export async function saveWindowsBlockedApps(apps: AppType[]) {
  return postFetcher<AppType[], void>("/blocked-apps/windows", { arg: apps })
}

// Save blocked apps for Linux
export async function saveLinuxBlockedApps(apps: AppType[]) {
  return postFetcher<AppType[], void>("/blocked-apps/linux", { arg: apps })
}

// Save time settings for Android
export async function saveAndroidTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/android", { arg: schedule })
}

// Save time settings for Windows
export async function saveWindowsTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/windows", { arg: schedule })
}

// Save time settings for Linux
export async function saveLinuxTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/linux", { arg: schedule })
} 