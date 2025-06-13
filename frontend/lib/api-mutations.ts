import { AndroidAppType, AppType, Schedule } from "@/types/platform"
import { postFetcher } from "./axios"

export async function saveAndroidBlockedApps(apps: AndroidAppType[]) {
  return postFetcher<AndroidAppType[], void>("/blocked-apps/android", { arg: apps })
}

export async function saveWindowsBlockedApps(apps: AppType[]) {
  return postFetcher<AppType[], void>("/blocked-apps/windows", { arg: apps })
}

export async function saveLinuxBlockedApps(apps: AppType[]) {
  return postFetcher<AppType[], void>("/blocked-apps/linux", { arg: apps })
}

export async function saveAndroidTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/android", { arg: schedule })
}

export async function saveWindowsTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/windows", { arg: schedule })
}

export async function saveLinuxTimeSettings(schedule: Schedule) {
  return postFetcher<Schedule, void>("/block-time-settings/linux", { arg: schedule })
} 