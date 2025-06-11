import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const buscar = url.searchParams.get("buscar");

    const response = await fetch(`${API_URL}jugadores${buscar ? `?buscar=${encodeURIComponent(buscar)}` : ""}`);

    if (!response.ok) {
      throw new Error(`Error al obtener jugadores: ${response.statusText}`);
    }

    const jugadores = await response.json();

    return new Response(JSON.stringify(jugadores), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error en API jugadores:", error);
    return new Response(JSON.stringify({ error: "Error al obtener jugadores" }), {
      status: 500,
    });
  }
};
