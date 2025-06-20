import type { APIRoute } from 'astro';
import { API_URL, API_KEY } from 'astro:env/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const resp = await fetch(`${API_URL}login`, {
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

    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers,
    });
  } catch (err) {
    console.error('Error en /api/login:', err);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
