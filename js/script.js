/* ====================================================
   KUNAL KUMAVAT — PORTFOLIO JAVASCRIPT
   File: js/main.js

   TABLE OF CONTENTS
   1.  EmailJS Configuration
   2.  Theme Toggle (Dark / Light)
   3.  Mobile Menu (Hamburger)
   4.  Modal — Open / Close / Keyboard
   5.  Contact Form — Send Email via EmailJS
   6.  Scroll Reveal (IntersectionObserver)
   7.  Navbar Shadow on Scroll
   ==================================================== */


/* ====================================================
   1. EMAILJS CONFIGURATION
   ====================================================
   To enable the contact form to actually send emails
   to your Gmail inbox, follow these steps once:

   STEP 1 → Go to https://www.emailjs.com
             Create a free account.

   STEP 2 → Dashboard → Email Services → Add New Service
             Choose Gmail → Connect kumavatkunal1@gmail.com
             Copy the "Service ID" shown after saving.

   STEP 3 → Dashboard → Email Templates → Create New Template
             In the template body use these variable names EXACTLY:
               {{from_name}}  — sender's name
               {{reply_to}}   — sender's email address
               {{subject}}    — message subject
               {{message}}    — message body
             Set "To Email" field to your Gmail address.
             Copy the "Template ID" after saving.

   STEP 4 → Dashboard → Account → API Keys
             Copy your "Public Key".

   STEP 5 → Paste the three values below, replacing the
             placeholder strings.

   Free tier: 200 emails / month — plenty for a portfolio.
   ==================================================== */

   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc1234'
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz5678'
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'AbCdEfGhIjKlMnO'
   
   // Initialise EmailJS with your public key
   emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
   
   
   /* ====================================================
      2. THEME TOGGLE (Dark / Light)
      ====================================================
      - Default theme on first visit: 'dark'
      - Change defaultTheme to 'light' to flip the default.
      - User preference is persisted in localStorage.
      ==================================================== */
   
   const defaultTheme = 'dark'; // Change to 'light' if preferred
   let curTheme = localStorage.getItem('kk-theme') || defaultTheme;
   
   /**
    * Apply a theme ('dark' or 'light') to the document root
    * and update the toggle button icon + label.
    * @param {string} t - 'dark' | 'light'
    */
   function applyTheme(t) {
     document.documentElement.setAttribute('data-theme', t);
     document.getElementById('themeIc').textContent  = t === 'dark' ? '🌙' : '☀️';
     document.getElementById('themeLbl').textContent = t === 'dark' ? 'Dark' : 'Light';
     localStorage.setItem('kk-theme', t);
     curTheme = t;
   }
   
   /** Toggle between dark and light themes. Called by the nav button onclick. */
   function toggleTheme() {
     applyTheme(curTheme === 'dark' ? 'light' : 'dark');
   }
   
   // Apply saved (or default) theme immediately on page load
   applyTheme(curTheme);
   
   
   /* ====================================================
      3. MOBILE MENU (Hamburger)
      ==================================================== */
   
   /** Toggle the mobile nav dropdown open/closed. */
   function toggleMenu() {
     document.getElementById('navLinks').classList.toggle('open');
   }
   
   // Close mobile menu when any nav link is clicked
   document.querySelectorAll('#navLinks a').forEach(link => {
     link.addEventListener('click', () => {
       document.getElementById('navLinks').classList.remove('open');
     });
   });
   
   
   /* ====================================================
      4. MODAL — OPEN / CLOSE / KEYBOARD
      ==================================================== */
   
   /** Open the contact form modal and lock body scroll. */
   function openModal() {
     document.getElementById('modalOverlay').classList.add('open');
     document.body.style.overflow = 'hidden';
   }
   
   /** Close the modal, restore scroll, and reset the form after the CSS animation. */
   function closeModal() {
     document.getElementById('modalOverlay').classList.remove('open');
     document.body.style.overflow = '';
   
     // Wait for close animation to finish before resetting content
     setTimeout(() => {
       document.getElementById('contactForm').reset();
       const status = document.getElementById('formStatus');
       status.className = 'form-status';
       status.textContent = '';
       document.getElementById('sendBtn').disabled = false;
       document.getElementById('sendBtnText').textContent = 'Send Message ✉️';
     }, 300);
   }
   
   /**
    * Handle clicks on the dark overlay behind the modal.
    * Clicking outside the modal box closes it.
    * @param {MouseEvent} e
    */
   function overlayClick(e) {
     if (e.target === document.getElementById('modalOverlay')) {
       closeModal();
     }
   }
   
   // Close modal when user presses the Escape key
   document.addEventListener('keydown', e => {
     if (e.key === 'Escape') closeModal();
   });
   
   
   /* ====================================================
      5. CONTACT FORM — SEND EMAIL VIA EMAILJS
      ====================================================
      On submit:
      - Shows a loading state on the button
      - Sends form data to EmailJS
      - On success: shows a green confirmation + auto-closes after 3 s
      - On failure: shows a red error + mailto fallback link
      ==================================================== */
   
   /**
    * Handle contact form submission.
    * @param {SubmitEvent} e
    */
   async function sendEmail(e) {
     e.preventDefault();
   
     const btn    = document.getElementById('sendBtn');
     const btnTxt = document.getElementById('sendBtnText');
     const status = document.getElementById('formStatus');
   
     // ── Loading state ──
     btn.disabled = true;
     btnTxt.textContent = 'Sending…';
     status.className = 'form-status';
     status.textContent = '';
   
     // ── Collect form values ──
     // Field names here MUST match the variable names in your EmailJS template:
     // {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
     const params = {
       from_name : document.getElementById('from_name').value.trim(),
       reply_to  : document.getElementById('reply_to').value.trim(),
       subject   : document.getElementById('subject').value.trim(),
       message   : document.getElementById('message').value.trim(),
     };
   
     try {
       // ── Send via EmailJS ──
       await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
   
       // ── Success ──
       status.className = 'form-status success';
       status.textContent = "✅ Message sent! I'll get back to you within 24 hours.";
       document.getElementById('contactForm').reset();
       btnTxt.textContent = 'Send Message ✉️';
       btn.disabled = false;
   
       // Auto-close the modal after 3 seconds on success
       setTimeout(closeModal, 3000);
   
     } catch (err) {
       // ── Error — provide mailto fallback ──
       console.error('EmailJS error:', err);
   
       // Build a pre-filled mailto link as a fallback
       // Update the email address below if yours changes
       const fallbackEmail = 'kumavatkunal1@gmail.com'; // ← update if needed
       const mailtoHref = `mailto:${fallbackEmail}`
         + `?subject=${encodeURIComponent(params.subject)}`
         + `&body=${encodeURIComponent(
             `From: ${params.from_name}\nEmail: ${params.reply_to}\n\n${params.message}`
           )}`;
   
       status.className = 'form-status error';
       status.innerHTML =
         `❌ Sending failed. `
         + `<a href="${mailtoHref}" style="color:inherit;text-decoration:underline;">`
         + `Click here to open your email client instead.</a>`;
   
       btnTxt.textContent = 'Send Message ✉️';
       btn.disabled = false;
     }
   }
   
   
   /* ====================================================
      6. SCROLL REVEAL (IntersectionObserver)
      ====================================================
      All elements with class "reveal" in index.html will
      fade + slide up into view when they enter the viewport.
   
      To adjust:
      - threshold: 0.11 → how much of the element must be
        visible before it animates (0 = as soon as 1px is
        visible, 1 = fully visible).
      - CSS transition speed is controlled in style.css
        under the .reveal / .reveal.visible rules.
      ==================================================== */
   
   const revealObserver = new IntersectionObserver(entries => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('visible');
       }
     });
   }, { threshold: 0.11 });
   
   // Attach observer to every element that should reveal on scroll
   document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
   
   
   /* ====================================================
      7. NAVBAR SHADOW ON SCROLL
      ====================================================
      Adds a subtle drop shadow to the nav once the user
      scrolls more than 20px from the top.
      ==================================================== */
   
   window.addEventListener('scroll', () => {
     const nav = document.getElementById('navbar');
     nav.style.boxShadow = window.scrollY > 20
       ? '0 4px 32px rgba(0, 0, 0, 0.18)'
       : 'none';
   });