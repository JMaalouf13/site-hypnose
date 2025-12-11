export async function onRequestGet({ env }) {
  try {
    // Liste toutes les clés commençant par "contact:"
    const list = await env.CONTACTS.list({ prefix: "contact:" });

    const messages = [];

    for (const key of list.keys) {
      const value = await env.CONTACTS.get(key.name);
      try {
        messages.push(JSON.parse(value));
      } catch {
        messages.push({ key: key.name, error: "JSON invalide" });
      }
    }

    return new Response(JSON.stringify(messages, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Erreur API list", err);
    return new Response("Erreur lors de la récupération des messages", {
      status: 500
    });
  }
}
