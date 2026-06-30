// ── Marca o link ativo no menu conforme a página atual ──
function marcarLinkAtivo() {
  const paginaAtual = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === paginaAtual || (paginaAtual === '' && href === 'sobre.html')) {
      link.classList.add('ativo');
    }
  });
}

// ── Menu hambúrguer ──
function iniciarMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('aberto');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('aberto'));
  });
}

// ── Alternância de tema claro / escuro ──
function iniciarTema() {
  const btn = document.getElementById('btn-tema');
  if (!btn) return;

  // Recupera preferência salva
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
    btn.textContent = '🌙 Escuro';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('tema-claro');
    const claro = document.body.classList.contains('tema-claro');
    btn.textContent = claro ? '🌙 Escuro' : 'Claro';
    localStorage.setItem('tema', claro ? 'claro' : 'escuro');
  });
}

// ── Validação e envio do form de contato ──
function iniciarFormulario() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede envio real da página
    let valido = true;

    // Valida campo Nome
    const nome = document.getElementById('nome');
    const grupoNome = nome.closest('.form-grupo');
    if (nome.value.trim().length < 2) {
      grupoNome.classList.add('erro');
      valido = false;
    } else {
      grupoNome.classList.remove('erro');
    }

    // Valida campo E-mail com regex
    const email = document.getElementById('email');
    const grupoEmail = email.closest('.form-grupo');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      grupoEmail.classList.add('erro');
      valido = false;
    } else {
      grupoEmail.classList.remove('erro');
    }

    // Valida campo Mensagem
    const mensagem = document.getElementById('mensagem');
    const grupoMsg = mensagem.closest('.form-grupo');
    if (mensagem.value.trim().length < 10) {
      grupoMsg.classList.add('erro');
      valido = false;
    } else {
      grupoMsg.classList.remove('erro');
    }

    // Se tudo válido: limpa o formulário e exibe o modal
    if (valido) {
      form.reset();
      document.getElementById('modal-sucesso').classList.add('aberto');
    }
  });

  // Fecha modal ao clicar no botão OK
  const btnFechar = document.getElementById('btn-fechar-modal');
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      document.getElementById('modal-sucesso').classList.remove('aberto');
    });
  }
}

// ── Inicializa tudo quando a página carrega ──
document.addEventListener('DOMContentLoaded', () => {
  marcarLinkAtivo();
  iniciarMenuMobile();
  iniciarTema();
  iniciarFormulario();
});