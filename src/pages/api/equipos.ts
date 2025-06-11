import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const buscar = url.searchParams.get("buscar");
    const ordenarPor = url.searchParams.get("ordenarPor");
    const tipoDeporte = url.searchParams.get("tipoDeporte");

    const queryParams = new URLSearchParams();
    if (buscar) queryParams.append("buscar", buscar);
    if (ordenarPor) queryParams.append("ordenarPor", ordenarPor);
    if (tipoDeporte) queryParams.append("tipoDeporte", tipoDeporte);

    const fullUrl = `${API_URL}equipos?${queryParams.toString()}`;

    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(`[API] Error del backend: ${response.status}`);
      return new Response(JSON.stringify({ error: "Error al consultar el backend" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[API] Error interno:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
