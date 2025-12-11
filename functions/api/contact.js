export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    let data;
    const contentType = request.headers.get('content-type') || '';
    
    console.log('Content-Type:', contentType);

    // Gérer les deux formats : JSON et form-urlencoded
    if (contentType.includes('application/json')) {
      // Format JSON (depuis ton JavaScript)
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Format form classique HTML
      const formData = await request.formData();
      data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        message: formData.get('message'),
        page: formData.get('page') || request.url
      };
    } else {
      // Essayer de parser comme du texte puis JSON
      const text = await request.text();
      console.log('Raw request body:', text);
      
      if (text.includes('=') && text.includes('&')) {
        // C'est du form-urlencoded déguisé
        const params = new URLSearchParams(text);
        data = {
          name: params.get('name'),
          email: params.get('email'),
          phone: params.get('phone') || '',
          message: params.get('message'),
          page: request.url
        };
      } else {
        data = JSON.parse(text);
      }
    }

    console.log('Parsed data:', data);

    // Validation
    if (!data.name || !data.email || !data.message) {
      return new Response('Champs manquants', { status: 400 });
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;

    const stored = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      page: data.page || '',
      receivedAt: new Date().toISOString(),
    };

    await env.CONTACTS.put(`contact:${id}`, JSON.stringify(stored));

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    });
  } catch (err) {
    console.error('contact function error', err);

    return new Response(`Erreur serveur : ${err.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}