import type { APIRoute } from "astro";

export const POST: APIRoute = async (req) => {
    return new Response('Aprobado');
}