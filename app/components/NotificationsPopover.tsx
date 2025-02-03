"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotifications } from "../context/notifications-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import type { Notification } from "../context/notifications-context"

export function NotificationsPopover() {
  const { state, dispatch } = useNotifications()
  const router = useRouter()
  const unreadCount = state.notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification: Notification) => {
    dispatch({ type: "MARK_AS_READ", payload: notification.id })
    router.push(`/referrals?id=${notification.referralId}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">View notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {state.notifications.length > 0 && (
            <Button
              variant="ghost"
              className="text-xs text-muted-foreground"
              onClick={() => dispatch({ type: "MARK_ALL_AS_READ" })}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px] px-1">
          {state.notifications.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              {state.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex cursor-pointer items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-muted ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(notification.timestamp), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

