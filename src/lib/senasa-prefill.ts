/// SENASA prefill helpers for the PoC fragment handoff.
///
/// The Flutter app opens this site via `launchUrl` (GET-only) and the FastAPI
/// endpoint is a pure text-URL formatter with zero image persistence. The
/// detected photo therefore travels as a small data URL inside the location
/// fragment (`#imagen=data:image/jpeg;base64,...`), which is never sent over
/// HTTP and survives any server restart. Everything here is client-side: no
/// Server Function, no fetch, no storage.

export const SENASA_IMAGE_MAX_CHARS = 150000;

export function parseSenasaImageFragment(hash: string): string | null {
  if (!hash) return null;
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw.startsWith("imagen=")) return null;
  try {
    const dataUrl = decodeURIComponent(raw.slice("imagen=".length));
    if (!dataUrl.startsWith("data:image/")) return null;
    if (!dataUrl.includes(";base64,")) return null;
    if (dataUrl.length > SENASA_IMAGE_MAX_CHARS) return null;
    return dataUrl;
  } catch {
    return null;
  }
}

export async function senasaDataUrlToFile(
  dataUrl: string,
  name = "senasa-avistamiento.jpg",
): Promise<File | null> {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) return null;
    if (blob.size === 0 || blob.size > 8 * 1024 * 1024) return null;
    return new File([blob], name, { type: blob.type || "image/jpeg" });
  } catch {
    return null;
  }
}

export function consumeSenasaImageFragment(): void {
  try {
    if (typeof window === "undefined") return;
    if (!window.location.hash.includes("imagen=")) return;
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState(null, "", url.toString());
  } catch {
    // Non-fatal: fragment simply stays in the address bar.
  }
}
