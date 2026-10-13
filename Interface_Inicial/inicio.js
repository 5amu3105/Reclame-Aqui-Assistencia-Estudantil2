"use strict"; // modo rigoroso: o navegador avisa erros bobos em vez de ignorá-los


/* =========================================================
   1) MENU DO CELULAR (botão ☰)
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

// Função pequena que só fecha o menu. Vamos reaproveitá-la em vários lugares.
function fecharMenuMobile() {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    // classList.toggle liga a classe se não tem, desliga se tem,
    // e devolve true/false dizendo como ficou.
    const aberto = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(aberto));
});

// Clicou FORA do menu? Fecha. (event.target = o que foi clicado)
document.addEventListener("click", (event) => {
    const clicouNoMenu = sidebar.contains(event.target);
    const clicouNoBotao = menuToggle.contains(event.target);
    if (!clicouNoMenu && !clicouNoBotao) {
        fecharMenuMobile();
    }
});

// Girou o celular / aumentou a janela para "desktop"? Fecha o menu do celular.
window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches) {
        fecharMenuMobile();
    }
});

// Apertou a tecla ESC? Fecha também.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
        fecharMenuMobile();
        menuToggle.focus(); // devolve o foco ao botão ☰ (teclado/leitor de tela)
    }
});


/* =========================================================
   2) RECOLHER / EXPANDIR A BARRA LATERAL (desktop)
   ========================================================= */

const collapseBtn = document.getElementById("sidebarCollapseBtn");

collapseBtn.addEventListener("click", () => {
    const recolhida = document.body.classList.toggle("sidebar-collapsed");

    // aria-* são "etiquetas" para leitores de tela (pessoas cegas, por exemplo).
    collapseBtn.setAttribute("aria-expanded", String(!recolhida));
    collapseBtn.setAttribute(
        "aria-label",
        recolhida ? "Expandir menu" : "Recolher menu"
    );
});


/* =========================================================
   3)ITEM ATIVO NO MENU LATERAL
   ========================================================= */

const navItems = document.querySelectorAll(".sidebar-nav .nav-item");

navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        // Os links ainda são "#" (de mentirinha). Sem isto a página
        // pularia para o topo. Quando você colocar links de verdade
        // (ex.: rotas do Django), pode APAGAR esta linha.
        if (item.getAttribute("href") === "#") {
            event.preventDefault();
        }

        navItems.forEach((outro) => outro.classList.remove("is-active"));
        item.classList.add("is-active");
    });
});

// Deixa "Início" marcado quando a página abre.
if (navItems.length > 0) {
    navItems[0].classList.add("is-active");
}


/* =========================================================
   4) SETORES
   ========================================================= */

const sectorButtons = document.querySelectorAll("[data-sector]");
const sectorPanels = document.querySelectorAll("[data-sector-panel]");

// Esconde todos os painéis e "desmarca" todos os botões.
function fecharTodosOsSetores() {
    sectorButtons.forEach((botao) => botao.setAttribute("aria-expanded", "false"));
    sectorPanels.forEach((painel) => {
        painel.hidden = true;
    });
}

sectorButtons.forEach((botao) => {
    botao.addEventListener("click", () => {
        // Guardamos ANTES se ele já estava aberto (para permitir fechar clicando de novo).
        const jaEstavaAberto = botao.getAttribute("aria-expanded") === "true";

        fecharTodosOsSetores();

        if (!jaEstavaAberto) {
            botao.setAttribute("aria-expanded", "true");

            // botao.dataset.sector lê o valor de data-sector="..."
            const painel = document.querySelector(
                `[data-sector-panel="${botao.dataset.sector}"]`
            );
            if (painel) {
                painel.hidden = false;
            }
        }
    });
});
