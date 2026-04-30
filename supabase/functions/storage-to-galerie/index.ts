/// <reference lib="deno.window" />
// @ts-nocheck
// supabase/functions/storage-to-galerie/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const payload = await req.json().catch(() => null);
  if (!payload) return new Response("Invalid JSON", { status: 400 });

  const bucket =
    payload?.event?.data?.bucket_id ??
    payload?.bucket_id ??
    payload?.event?.bucket_id ??
    null;

  const objectName =
    payload?.event?.data?.object_name ??
    payload?.object_name ??
    payload?.event?.object_name ??
    null;

  if (!bucket || !objectName) {
    return new Response("Missing bucket/object_name in payload", { status: 400 });
  }

  if (bucket !== "galerie") return new Response("Ignored bucket", { status: 200 });

  const [folder, ...rest] = String(objectName).split("/");
  const filename = rest.join("/") || objectName;

  const ext = filename.toLowerCase().split(".").pop() || "";
  const isImage =
    folder === "images" || ["jpg", "jpeg", "png", "webp", "gif"].includes(ext);

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectName}`;
  const fileUrl = publicUrl;
  const thumbnailUrl = isImage ? publicUrl : null;

  const title = filename.replace(/\.[^.]+$/, "");

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // UPDATE si existe (clé: file_url)
  const { data: existing, error: fetchErr } = await supabase
    .from("galerie_medias")
    .select("id")
    .eq("file_url", fileUrl)
    .maybeSingle();

  if (fetchErr) {
    return new Response(`DB fetch error: ${fetchErr.message}`, { status: 500 });
  }

  if (existing?.id) {
    const { error: updErr } = await supabase
      .from("galerie_medias")
      .update({
        title,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
        // => on ne touche pas category, description, type
      })
      .eq("file_url", fileUrl);

    if (updErr) return new Response(`DB update error: ${updErr.message}`, { status: 500 });
  } else {
    const { error: insErr } = await supabase
      .from("galerie_medias")
      .insert({
        title,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
        // category / description / type: NULL -> tu les saisis manuellement ensuite
        category: null,
        description: null,
        type: null,
      });

    if (insErr) return new Response(`DB insert error: ${insErr.message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
});