# Knaller Webseite

Einfache **One-Page-Website** für Knaller Sound / Knaller Soundsystem — premium, visuell, auf Deutsch.

**Live:** [https://knallersoundsystem.netlify.app/](https://knallersoundsystem.netlify.app/)

Getrennt von der [Knaller Sound App](https://github.com/davidzaddach/Knaller-Sound-App) (PWA: [knallersound.netlify.app](https://knallersound.netlify.app/)).

## Sektionen

1. **Video-Header** — YouTube-Rotation (Shit ist Knaller, City Surfer)
2. **Über uns** — Presse-Text + Foto
3. **Spotify** — eingebetteter Artist-Player
4. **Kontakt** — Netlify-Formular → `creativeconsulting@gmx.de`

Rechtliches: `impressum.html`, `datenschutz.html`

## Assets

Brand-Dateien liegen unter `public/assets/` (Logo, Foto, Pantone Violet C als Referenz).

## Lokal testen

```bash
cd public && python3 -m http.server 8080
```

Öffnen: http://localhost:8080

## Netlify

- **Publish directory:** `public`
- **Site:** `knallersoundsystem.netlify.app` (siehe `knaller_website_netlify_url.txt`)
- **Formular:** *Site configuration → Forms → Form notifications* → E-Mail **creativeconsulting@gmx.de**

## GitHub

Privates Repo: https://github.com/davidzaddach/Knaller-Website
