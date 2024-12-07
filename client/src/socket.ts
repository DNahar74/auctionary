"use client";

import { io } from "socket.io-client";

const backend_url = process.env.BACKEND_URI || "http://localhost:8080";

export const socket = io(backend_url);