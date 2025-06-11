import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";

export const GET: APIRoute = async ({ url }) => {
  try {
    const buscar = url.searchParams.get("buscar") || "";
    const ordenarPor = url.searchParams.get("ordenarPor") || "";
    const tipoDeporte = url.searchParams.get("tipoDeporte") || "";

    const params = new URLSearchParams();
    if (buscar) params.append("buscar", buscar);
    if (ordenarPor) params.append("ordenarPor", ordenarPor);
    if (tipoDeporte) params.append("tipoDeporte", tipoDeporte);

    const response = await fetch(`${API_URL}ligas?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error al obtener ligas: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error en /api/ligas:", error);
    return new Response(JSON.stringify({ error: "No se pudieron obtener las ligas." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
