import type { APIRoute } from "astro";
import { API_KEY } from "astro:env/server";

export const GET: APIRoute = async ({ request }) => {

    try {
        const response = await fetch("http://localhost:8080/api/equipos", {
            headers: {
                "X-Auth-Token": API_KEY,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return new Response(JSON.stringify(data),
        {
            status: 200,
            headers: {"Content-Type": "application/json",}
        });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch teams" }),
        {
            status: 500,
            headers: {"Content-Type": "application/json",}
        });
    }
};