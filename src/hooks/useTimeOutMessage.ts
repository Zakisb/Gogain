"use client";
import { useEffect, useState } from "react";

function useTimeOutMessage(
  interval: number = 4000
): [string, (message: string) => void] {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (message) {
      let timeout = setTimeout(() => setMessage(""), interval);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  return [message, setMessage];
}

export default useTimeOutMessage;
