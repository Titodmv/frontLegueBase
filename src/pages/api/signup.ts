import type { APIRoute } from 'astro';
import { API_URL, API_KEY } from 'astro:env/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const resp = await fetch(`${API_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY 
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const setCookie = resp.headers.get('set-cookie');
    if (setCookie) {
      headers.set('Set-Cookie', setCookie);
    }

    if (!resp.ok) {
      return new Response(JSON.stringify({
        message: data.message || 'Error del backend'
      }), {
        status: resp.status,
        headers
      });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers
    });
  } catch (err) {
    console.error('Error en /api/signup:', err);
    return new Response(JSON.stringify({
      message: 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
