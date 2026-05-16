"use client";

import { useEffect } from "react";

export function AppwriteHealthCheck() {
  useEffect(() => {
    const checkAppwriteHealth = async () => {
      try {
        const response = await fetch("/api/health");
        const data = await response.json();
        
        if (!data.ok) {
          console.error("❌ Appwrite health check failed:", data.error);
          console.error("The application cannot start without a working Appwrite connection.");
          // Quit the application
          window.location.href = "/error?reason=appwrite-unavailable";
        } else {
          console.log("✅ Appwrite connection verified");
        }
      } catch (error) {
        console.error("❌ Failed to check Appwrite health:", error);
        console.error("The application cannot start without a working Appwrite connection.");
        // Quit the application
        window.location.href = "/error?reason=appwrite-unavailable";
      }
    };

    checkAppwriteHealth();
  }, []);

  return null;
}
