// src/lib/db.js
const REDIS_KEY = "portfolio_projects";

async function fetchRedis(command, ...args) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.error("Redis credentials missing");
    return null;
  }

  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstash Error: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error);

  return data.result;
}

// Read all projects from Upstash Redis
export async function readProjects() {
  try {
    const data = await fetchRedis("GET", REDIS_KEY);
    if (!data) return [];
    
    // Upstash returns strings for JSON when using SET/GET.
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch (error) {
    console.error("Error reading from Redis:", error);
    return [];
  }
}

// Write projects to Upstash Redis
export async function writeProjects(projects) {
  await fetchRedis("SET", REDIS_KEY, JSON.stringify(projects));
}

// Generate a unique ID (mimics MongoDB ObjectId format)
export function generateId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return timestamp + random;
}
