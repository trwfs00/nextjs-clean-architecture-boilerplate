import { atom } from "nanostores"

export const userStore = atom<string | null>(null)

export function setUser(user: string) {
  userStore.set(user)
}
