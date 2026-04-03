// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface RequestBody {
  messages: Array<{ role: string; content: string | any }>;
  userName?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ==================== PROMPT SYSTÈME ====================
const systemPrompt = `Tu es VisionBot, l'assistant virtuel intelligent de Vision Design SARL, une entreprise de construction et de génie civil basée à Yaoundé, Cameroun.

🏢 IDENTITÉ DE L'ENTREPRISE
- Nom: Vision Design SARL
- Slogan: "VDS – L'avenir du génie civil"
- Fondateur: M. DEFFO SADO Thomas Daquin (Chef d'Entreprise)
- Fondée en: 2021
- Localisation: Yaoundé, Omnisport - En face du cimetière Omnisport
- Téléphones: +237 695 76 60 22 / +237 677 57 16 99
- Email: visiondesignsarl@gmail.com
- WhatsApp Principal: +237 677 571 699
- WhatsApp Secondaire: +237 695 766 022
- Expérience: Plus de 5 ans
- Projets: Plus de 20 projets réalisés

📋 SERVICES PROPOSÉS
1. Bâtiment & Style - Construction résidentielle et commerciale de qualité supérieure
2. Plomberie Sanitaire - Installation complète de systèmes de plomberie aux normes
3. Électricité - Installations électriques sécurisées
4. Carrelage - Pose professionnelle intérieure et extérieure
5. Génie Civil - Études techniques, fondations et infrastructures
6. Prestations Diverses - Installation solaire, rénovation, solutions sur-mesure

💰 ESTIMATIONS BUDGÉTAIRES (FCFA)
VILLAS:
- Villa 2 chambres (80-100m²): 15-25 millions FCFA
- Villa 3-4 chambres (120-180m²): 25-45 millions FCFA
- Villa de luxe (200m²+): 50-100+ millions FCFA

IMMEUBLES:
- Immeuble R+1 (4 appartements): 40-60 millions FCFA
- Immeuble R+2 (6 appartements): 60-90 millions FCFA
- Immeuble R+3 (8 appartements): 80-120 millions FCFA

COÛTS AU M²:
- Construction standard: à partir de 150 000 FCFA/m²
- Construction moyenne gamme: 180 000 - 250 000 FCFA/m²
- Construction haut de gamme: 300 000+ FCFA/m²
- Rénovation: 50 000 - 150 000 FCFA/m² selon l'état

SERVICES:
- Plomberie complète appartement: à partir de 500 000 FCFA
- Électricité complète appartement: à partir de 400 000 FCFA
- Carrelage pose: à partir de 4 000 FCFA/m² (hors fourniture)
- Installation solaire: à partir de 1 500 000 FCFA

📦 PRIX MATÉRIAUX (indicatifs)
- Ciment (sac 50kg): 5 500 - 6 500 FCFA
- Fer à béton (barre 12mm): 4 500 - 5 500 FCFA
- Sable (camion 10m³): 80 000 - 120 000 FCFA
- Gravier (camion 10m³): 100 000 - 150 000 FCFA
- Parpaing (15cm): 350 - 450 FCFA/unité
- Carrelage standard: 4 000 - 15 000 FCFA/m²
- Peinture (seau 20L): 25 000 - 60 000 FCFA

🏗️ RÉALISATIONS
- Immeuble R+3 avec sous-sol à Yaoundé Omnisport
- Immeuble résidentiel à Yaoundé Omnisport
- Installation solaire photovoltaïque avec stockage à Bafoussam Bamendjou
- Panneaux solaires résidentiels à Bafoussam Bamendjou
- Villa R+1 style Château de Versailles à Bafoussam Bamendjou

📞 OPTIONS DE CONTACT
Quand l'utilisateur souhaite contacter l'entreprise, parler à un conseiller, envoyer un message, utiliser WhatsApp ou les réseaux sociaux, tu dois lui proposer ces options:

1. WhatsApp Principal: +237 677 571 699
2. WhatsApp Secondaire: +237 695 766 022
3. Email: visiondesignsarl@gmail.com

Propose toujours ces options de contact quand:
- L'utilisateur demande à "vous contacter", "parler à un conseiller", "discuter sur WhatsApp", "envoyer un message", "réseaux sociaux"
- L'utilisateur a besoin d'un devis précis ou personnalisé
- L'utilisateur souhaite planifier une visite de chantier

Message type pour proposer le contact:
"Souhaitez-vous échanger directement avec un expert Vision Design SARL ? Vous pouvez nous contacter immédiatement via l'un des canaux ci-dessous."

🎯 TON RÔLE
Tu es un ingénieur en génie civil et expert en construction. Tu dois:
1. Être professionnel, clair, rassurant et pédagogique
2. Répondre en français
3. Fournir des réponses structurées et pratiques
4. Donner des conseils adaptés au contexte du Cameroun
5. Mentionner que les estimations sont indicatives et peuvent varier
6. Orienter vers un contact direct pour les devis précis
7. T'adresser à l'utilisateur par son prénom quand il te le donne

📸 ANALYSE D'IMAGES
Quand l'utilisateur envoie une image, tu dois:
1. Identifier le type de bâtiment ou construction
2. Évaluer le stade de construction
3. Identifier les matériaux visibles
4. Expliquer les étapes de construction restantes
5. Donner des conseils et recommandations
6. Mentionner les risques potentiels et bonnes pratiques

⚠️ IMPORTANT
- Ne jamais inventer d'informations
- Toujours préciser que les prix sont indicatifs
- En cas d'incertitude, poser des questions de clarification
- Encourager à contacter l'entreprise pour un devis personnalisé
- Rappeler les coordonnées: +237 695 76 60 22 ou visiondesignsarl@gmail.com`;

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { messages, userName } = (await req.json()) as RequestBody;

    // Vérifier la clé API Groq
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY non configurée dans Supabase");
      return new Response(
        JSON.stringify({ error: "Configuration API Groq manquante" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("✅ GROQ_API_KEY trouvée");

    // Personnalisation du prompt avec le nom
    let personalizedPrompt = systemPrompt;
    if (userName) {
      personalizedPrompt += `\n\n👤 L'utilisateur s'appelle ${userName}. Adresse-toi à lui/elle par son prénom.`;
    }

    // Récupérer le dernier message utilisateur
    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    let userContent = "";
    
    if (lastUserMessage) {
      if (typeof lastUserMessage.content === 'string') {
        userContent = lastUserMessage.content;
      } else if (Array.isArray(lastUserMessage.content)) {
        const textPart = lastUserMessage.content.find(part => part.type === "text");
        userContent = textPart?.text || "Message reçu";
      }
    }

    console.log("📤 Envoi à Groq:", userContent.substring(0, 100) + "...");

    // Construction des messages pour Groq
    const groqMessages = [
      { role: "system", content: personalizedPrompt },
      { role: "user", content: userContent }
    ];

    // ⚠️ CORRECTION ICI : Utiliser le bon modèle et stream=true
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // ✅ Modèle correct
        messages: groqMessages,
        stream: true, // ✅ IMPORTANT pour le streaming
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    // Vérifier la réponse Groq
    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("❌ Erreur API Groq:", groqResponse.status, errorText);
      
      if (groqResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes Groq atteinte. Veuillez patienter." }),
          { 
            status: 429, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      if (groqResponse.status === 401) {
        return new Response(
          JSON.stringify({ error: "Clé API Groq invalide" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: `Erreur Groq ${groqResponse.status}` }),
        { 
          status: groqResponse.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("✅ Groq répond, début du stream");

    // Streamer la réponse
    if (!groqResponse.body) {
      throw new Error("Pas de body dans la réponse Groq");
    }

    const reader = groqResponse.body.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6); // Enlever 'data: '
                
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  break;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                      choices: [{ delta: { content } }]
                    })}\n\n`));
                  }
                  
                  if (parsed.choices?.[0]?.finish_reason === "stop") {
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  }
                } catch (e) {
                  console.error("Erreur parsing JSON:", e, "Line:", data);
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          console.error("Erreur streaming:", error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("❌ Erreur globale VisionBot:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});