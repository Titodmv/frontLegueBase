import type { APIRoute } from "astro";
import { API_URL } from "astro:env/server";
import { API_KEY } from "astro:env/server"
import { USER } from "astro:env/server"

export const GET: APIRoute = async ({ request }) => {

    if (new URL(request.url).searchParams.get("buscar") !== null) {
        try {
            const buscar = new URL(request.url).searchParams.get("buscar");

            const response = await fetch(`${API_URL}equipos/buscar_nombre/${buscar}`, {
                headers: {
                "Authorization": "Basic " + btoa(`${USER}:${API_KEY}`),
                }
            });

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
            const tipoDeporte = new URL(request.url).searchParams.get("tipoDeporte");

            const response = await fetch(`${API_URL}equipos/filtrar/${ordenarPor}/${tipoDeporte}`, {
                headers: {
                "Authorization": "Basic " + btoa(`${USER}:${API_KEY}`),
                }
            });


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
            const response = await fetch(`${API_URL}equipos`, {
                headers: {
                "Authorization": "Basic " + btoa(`${USER}:${API_KEY}`),
                }
            });

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