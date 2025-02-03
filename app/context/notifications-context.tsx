"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

export interface Notification {
  id: string
  message: string
  timestamp: string
  read: boolean
  type: "status_update" | "new_referral"
  referralId: string
}

interface NotificationsState {
  notifications: Notification[]
}

type NotificationsAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }

const NotificationsContext = createContext<{
  state: NotificationsState
  dispatch: React.Dispatch<NotificationsAction>
} | null>(null)

const notificationsReducer = (state: NotificationsState, action: NotificationsAction): NotificationsState => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      const notifications = [action.payload, ...state.notifications]
      localStorage.setItem("notifications", JSON.stringify(notifications))
      return { notifications }
    case "MARK_AS_READ":
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === action.payload ? { ...notification, read: true } : notification,
      )
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
      return { notifications: updatedNotifications }
    case "MARK_ALL_AS_READ":
      const allReadNotifications = state.notifications.map((notification) => ({ ...notification, read: true }))
      localStorage.setItem("notifications", JSON.stringify(allReadNotifications))
      return { notifications: allReadNotifications }
    case "REMOVE_NOTIFICATION":
      const filteredNotifications = state.notifications.filter((notification) => notification.id !== action.payload)
      localStorage.setItem("notifications", JSON.stringify(filteredNotifications))
      return { notifications: filteredNotifications }
    default:
      return state
  }
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationsReducer, {
    notifications: [],
  })

  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications)
      parsedNotifications.forEach((notification: Notification) => {
        dispatch({ type: "ADD_NOTIFICATION", payload: notification })
      })
    }
  }, [])

  return <NotificationsContext.Provider value={{ state, dispatch }}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

