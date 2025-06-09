import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";

export const GET: APIRoute = async ({ request }) => {

    if (new URL(request.url).searchParams.get("buscar") !== null) {
        try {
            const buscar = new URL(request.url).searchParams.get("buscar");

            const response = await fetch(`${API_URL}equipo/buscar_nombre/${buscar}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return new Response(JSON.stringify(data));

        } catch (error) {
            return new Response(JSON.stringify({ error: "Error en la consulta" }),
            {
                status: 500,
                headers: {"Content-Type": "application/json",}
            });
        }
    }
    else if (new URL(request.url).searchParams.get("ordenarPor") !== null && new URL(request.url).searchParams.get("tipoDeporte") !== null) {
        try {
            const ordenarPor = new URL(request.url).searchParams.get("ordenarPor");
            const juegoID = new URL(request.url).searchParams.get("tipoDeporte");

            const response = await fetch(`${API_URL}equipos/filtrar/${ordenarPor}/${juegoID}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return new Response(JSON.stringify(data));

        } catch (error) {
            console.error("Error fetching teams:", error);
            return new Response(JSON.stringify({ error: "Error en la consulta" }),
            {
                status: 500,
                headers: {"Content-Type": "application/json",}
            });
        }
    }
    else {
        try {
            const response = await fetch(`${API_URL}equipos`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return new Response(JSON.stringify(data));

        } catch (error) {
            console.error("Error fetching teams:", error);
            return new Response(JSON.stringify({ error: "Error en la consulta" }),
            {
                status: 500,
                headers: {"Content-Type": "application/json",}
            });
        }
    }
};