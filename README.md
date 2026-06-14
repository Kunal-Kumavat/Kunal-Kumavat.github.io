# Kunal Kumavat — Portfolio
Personal portfolio site deployed on GitHub Pages.
Live URL: **https://kunal-kumavat.github.io**

---

## 📁 Folder Structure

```
kunal-kumavat.github.io/
├── index.html                    ← Main HTML (all sections)
├── css/
│   └── style.css                 ← All styles + theme variables
├── js/
│   └── main.js                   ← Theme toggle, modal, EmailJS, scroll reveal
├── assets/
│   ├── Kunal_Kumavat_Resume.pdf  ← Your downloadable resume (replace this file)
│   ├── cert.jpg                  ← Award certificate image (replace placeholder)
│   └── og-preview.png            ← Social media preview image (optional)
└── README.md                     ← This file
```

---

## 🚀 Deploy to GitHub Pages (one-time setup)

1. **Create the repository**
   - Name it exactly: `kunal-kumavat.github.io`
   - Make it **Public**

2. **Push all files** keeping the folder structure above:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deploy"
   git branch -M main
   git remote add origin https://github.com/kunal-kumavat/kunal-kumavat.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Repository → Settings → Pages
   - Source: **Deploy from a branch** → Branch: `main` / `/ (root)`
   - Save. Your site goes live at `https://kunal-kumavat.github.io` within ~60 seconds.

---

## ✉️ Activate the Contact Form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com) (free, 200 emails/month).

1. Sign up at https://www.emailjs.com
2. **Add Email Service** → choose Gmail → connect `kumavatkunal1@gmail.com` → copy **Service ID**
3. **Create Email Template** using these exact variable names:
   ```
   {{from_name}}   ← sender's name
   {{reply_to}}    ← sender's email
   {{subject}}     ← message subject
   {{message}}     ← message body
   ```
   Set "To Email" to your Gmail. Copy **Template ID**.
4. **Account → API Keys** → copy **Public Key**
5. Open `js/main.js` and replace the three placeholders at the top:
   ```js
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   ```
6. Commit and push. The form is now live.

---

## 🖼️ Replace Placeholder Assets

### Resume PDF
- Place your PDF at: `assets/Kunal_Kumavat_Resume.pdf`
- All three download buttons in the site point to this path automatically.

### Certificate / Award Image
1. Add your image to: `assets/cert.jpg` (or `.png`)
2. In `index.html`, find the Award section and replace:
   ```html
   <!-- DELETE this placeholder block: -->
   <div class="cert-placeholder"> … </div>

   <!-- ADD this instead: -->
   <img src="assets/cert.jpg"
        alt="Rising Tech Star Certificate — Magna Technology Day 2025"
        class="cert-img" />
   ```

### Social Preview Image (optional)
- Add a 1200×630 px image as `assets/og-preview.png`
- It appears when your portfolio link is shared on LinkedIn, WhatsApp, etc.

---

## 🎨 Customisation Cheat Sheet

|
 What to change 
|
 Where 
|
|
---
|
---
|
|
 Name, role, summary 
|
`index.html`
 → Hero section 
|
|
 Stats numbers 
|
`index.html`
 → 
`.hero-stats`
|
|
 Skill tags 
|
`index.html`
 → Skills section 
|
|
 Job bullets 
|
`index.html`
 → Experience section 
|
|
 Project cards 
|
`index.html`
 → Projects section 
|
|
 Contact links 
|
`index.html`
 → Contact section 
|
|
 Accent colour 
|
`css/style.css`
 → 
`--accent`
 in both themes 
|
|
 Default theme 
|
`js/main.js`
 → 
`const defaultTheme = 'dark'`
|
|
 Scroll-reveal speed 
|
`css/style.css`
 → 
`.reveal`
 transition 
|
|
 Fallback email address 
|
`js/main.js`
 → 
`const fallbackEmail`
|

> **Tip:** Every editable section has a comment directly above it in `index.html` and `js/main.js`.

---

## 🛠️ Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — no build step, no frameworks
- Google Fonts (Inter + Space Grotesk)
- [EmailJS](https://www.emailjs.com) for contact form email delivery
- Hosted on GitHub Pages (free)