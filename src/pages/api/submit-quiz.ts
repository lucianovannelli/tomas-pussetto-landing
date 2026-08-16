import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('New Quiz Lead Submitted:', body);

    return new Response(
      JSON.stringify({ success: true, message: 'Lead received successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid payload' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
