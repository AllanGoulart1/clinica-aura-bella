// Smooth reveal on scroll and form validation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

const form = document.getElementById("lead-form");
const formMessage = document.querySelector(".form-message");

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const nome = form.nome.value.trim();
  const telefone = form.telefone.value.trim();
  const email = form.email.value.trim();
  const servico = form.servico.value.trim();

  if (!nome || !telefone || !email || !servico) {
    formMessage.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  if (!isValidEmail(email)) {
    formMessage.textContent = "Digite um email v\u00e1lido.";
    return;
  }

  if (telefone.replace(/\D/g, "").length < 10) {
    formMessage.textContent = "Informe um telefone v\u00e1lido.";
    return;
  }

  formMessage.textContent =
    "Obrigado! Sua solicita\u00e7\u00e3o foi enviada. Em breve entraremos em contato.";
  form.reset();
});
