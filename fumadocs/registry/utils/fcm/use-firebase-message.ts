// @ts-nocheck
import { useEffect } from "react"
import { onMessage as onMessageFirebase } from "firebase/messaging"
import { messaging } from "@/lib/fcm-helper"


export const useFirebaseMessage = (onMessage: (payload: any) => void) => {
  useEffect(() => {
    const unsubscribe = onMessageFirebase(messaging(), onMessage)
    return () => unsubscribe()
  }, [onMessage])
}