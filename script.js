// Small client-side helpers for navigation and the contact form
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();

function handleContact(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const result = document.getElementById('form-result');

  if(!email || !message){
    result.textContent = 'Prosím vyplňte email a zprávu.';
    return;
  }

  // Compose mailto to send to info@vonitkay.cz with prefilled subject and body.
  // This opens the visitor's default mail client so they can send the message.
  const subject = `Kontakt z webu Vonitkay — od ${email}`;
  const bodyLines = [
    message,
    '',
    `Kontaktní email: ${email}`,
    '',
    'Odesláno z webového formuláře: https://github.com/sqlaylinka/vonitkay'
  ];
  const mailto = `mailto:info@vonitkay.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  // Try to open the user's mail client. Browsers will hand this off to the configured mail app.
  // Note: Some browsers/users might block or not have a mail client configured; we give UI feedback as well.
  window.location.href = mailto;

  result.textContent = 'Otevírám e-mailového klienta. Po odeslání se formulář vymaže.';

  // Reset the form after a short delay to allow mail client to open
  setTimeout(()=>{
    const form = document.getElementById('contact-form');
    if(form) form.reset();
  }, 800);
}
