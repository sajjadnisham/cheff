# Chef portfolio — Sajjad Nisham

A one-page portfolio website for a chef. Plain HTML, CSS and JavaScript, so there is no build step.

- `index.html`: all content and sections
- `styles.css`: design (black, white and red; Plus Jakarta Sans)
- `main.js`: menu, scroll effects, service tabs, carousel, rolling numbers, FAQ
- `assets/img/`: photos (WebP)

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish with GitHub Pages

Repository **Settings → Pages → Build and deployment**: Source **Deploy from a branch**,
branch **main**, folder **/ (root)**. The site appears at `https://sajjadnisham.github.io/cheff/`.

## Things to edit before going live

Search `index.html` for these placeholders:

- `hello@example.com`: your email (appears 3 times)
- `+960 000 0000`: your phone number
- Social links (`instagram.com/`, `youtube.com/`, `linkedin.com/`, `wa.me/`): your profile URLs
- The numbers in "A closer look at the numbers" (10+ years, 5 chefs, 12h) and the "10yrs" / "6am" tiles:
  check they are true for you
- The quote in "What I believe", and the newsletter form (it only shows a thank-you message;
  connect it to a service such as Mailchimp or Formspree to collect emails)
