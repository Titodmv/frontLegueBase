import type { APIRoute } from 'astro';
import { API_URL, API_KEY } from 'astro:env/server';

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('token')?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token no disponible' }), {
      status: 401,
    });
  }

  try {
    const response = await fetch(`${API_URL}/usuario`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify(error), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error de red' }), {
      status: 500,
    });
  }
};
