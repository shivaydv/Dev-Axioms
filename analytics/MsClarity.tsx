"use client";
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function MSClarity() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID!);
        }
      }, []);

      return null;
}