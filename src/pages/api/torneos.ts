import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";

export const GET: APIRoute = async ({ url }) => {
  try {
    const params = new URL(url).searchParams;

    const buscar = params.get("buscar");
    const ordenarPor = params.get("ordenarPor");
    const tipoDeporte = params.get("tipoDeporte");

    const queryParams = new URLSearchParams();

    if (buscar) queryParams.append("buscar", buscar);
    if (ordenarPor) queryParams.append("ordenarPor", ordenarPor);
    if (tipoDeporte) queryParams.append("tipoDeporte", tipoDeporte);

    const response = await fetch(`${API_URL}torneos?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error al obtener torneos: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error en /api/torneos:", error);
    return new Response(JSON.stringify({ error: "No se pudieron obtener los torneos." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
