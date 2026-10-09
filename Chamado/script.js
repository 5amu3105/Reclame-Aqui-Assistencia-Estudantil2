/**
 * Design System SUAP / IFRN
 * Script de comportamentos e interatividade da interface
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initSidebar();
    initBoxItems();
});

/**
 * 1. Inicializa os componentes de Collapsible / Accordion
 * Responsável por abrir/fechar as seções de "Options"
 */
function initAccordion() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

    collapseButtons.forEach(button => {
        const targetSelector = button.getAttribute('data-bs-target');
        const targetEl = document.querySelector(targetSelector);

        if (!targetEl) return;

        // Configuração inicial de estilo de transição
        targetEl.style.overflow = 'hidden';
        targetEl.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease';

        // Verifica se inicia recolhido
        const isCollapsed = button.classList.contains('collapsed') || !targetEl.classList.contains('show');
        
        if (isCollapsed) {
            button.classList.add('collapsed');
            targetEl.classList.remove('show');
            targetEl.style.maxHeight = '0px';
            targetEl.style.opacity = '0';
        } else {
            button.classList.remove('collapsed');
            targetEl.classList.add('show');
            targetEl.style.maxHeight = targetEl.scrollHeight + 'px';
            targetEl.style.opacity = '1';
        }

        // Evento de clique
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const collapsed = button.classList.contains('collapsed');

            if (collapsed) {
                // Abrir
                button.classList.remove('collapsed');
                targetEl.classList.add('show');
                targetEl.style.maxHeight = targetEl.scrollHeight + 'px';
                targetEl.style.opacity = '1';
            } else {
                // Fechar
                button.classList.add('collapsed');
                targetEl.style.maxHeight = '0px';
                targetEl.style.opacity = '0';
                
                // Aguarda o fim da animação para remover a classe 'show'
                setTimeout(() => {
                    if (button.classList.contains('collapsed')) {
                        targetEl.classList.remove('show');
                    }
                }, 300);
            }
        });
    });
}

/**
 * 2. Gerencia a barra lateral (Sidebar)
 * Altera o item ativo e controla submenus (se houver)
 */
function initSidebar() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Remove a classe 'is-active' de todos os itens
            navItems.forEach(nav => nav.classList.remove('is-active'));
            
            // Adiciona ao item clicado
            this.classList.add('is-active');

            // Animação no ícone caret (seta) caso exista
            const caret = this.querySelector('.nav-caret');
            if (caret) {
                caret.style.transition = 'transform 0.2s ease';
                if (this.classList.contains('open')) {
                    this.classList.remove('open');
                    caret.style.transform = 'rotate(0deg)';
                } else {
                    this.classList.add('open');
                    caret.style.transform = 'rotate(90deg)';
                }
            }
        });
    });
}

/**
 * 3. Efeitos nos Cards dos Setores (Boxes Links)
 */
function initBoxItems() {
    const boxes = document.querySelectorAll('.boxes.links .box-item');

    boxes.forEach(box => {
        // Transição suave ao passar o mouse
        box.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease';

        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-3px)';
            box.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            box.style.borderColor = 'var(--primary-500)';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0)';
            box.style.boxShadow = 'none';
            box.style.borderColor = 'var(--grey-100)';
        });
    });
}