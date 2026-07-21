# Knaller Webseite

Offizielle **Knaller Soundsystem**-Website (Marketing, Shows, Musik, Links).

Getrennt von der [Knaller Sound App](https://github.com/davidzaddach/Knaller-Sound-App) (Soundboard-PWA unter [knallersound.netlify.app](https://knallersound.netlify.app/)).

## Struktur

| Ordner | Inhalt |
|--------|--------|
| `public/` | Statische Site für Netlify |
| `knaller_website_netlify_url.txt` | Production-URL (eine Zeile) |

## Entwicklung

Dateien in `public/` bearbeiten und lokal mit einem beliebigen Static-Server öffnen, z. B.:

```bash
cd public && python3 -m http.server 8080
```

## Netlify

- **Publish directory:** `public` (siehe `netlify.toml`)
- **Git-Deploy:** Repo als privates Remote verbinden, Branch `main` → Production
- **Manuell:** Ordner `public/` per [Netlify Drop](https://app.netlify.com/drop) hochladen

Öffentliche URL in `knaller_website_netlify_url.txt` pflegen.
