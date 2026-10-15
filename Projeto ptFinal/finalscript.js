document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");
    const footer = document.querySelector(".footer");

    if (!sidebar) return;

    // 1. Cria e configura o botão de alternância da sidebar (Acessibilidade)
    const toggleButton = document.createElement("button");
    toggleButton.className = "sidebar-toggle";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-label", "Abrir menu");
    toggleButton.setAttribute("aria-expanded", "false");

    toggleButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    sidebar.appendChild(toggleButton);

    // Controla abertura / fechamento do menu lateral
    function setSidebar(open) {
        sidebar.classList.toggle("is-open", open);

        toggleButton.setAttribute("aria-expanded", open ? "true" : "false");
        toggleButton.setAttribute(
            "aria-label",
            open ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );

        toggleButton.innerHTML = open
            ? `
                <span class="close-line line-1"><i class="fa-solid fa-xmark"></i></span>
              `
            : `
                <i class="fa-solid fa-bars"></i>
              `;

        if (mainContent) {
            mainContent.classList.toggle("sidebar-open", open);
        }

        if (footer) {
            footer.classList.toggle("sidebar-open", open);
        }
    }

    toggleButton.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("is-open");
        setSidebar(!isOpen);
    });

    // Fechar ao redimensionar se for tela pequena
    window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
            setSidebar(false);
        }
    });

    // 2. Tratamento do Formulário e Feedbacks (Diretriz do Design System SUAP)
    const supportForm = document.getElementById("supportForm");
    const feedbackAlert = document.getElementById("feedbackAlert");
    const btnSubmit = document.getElementById("btnSubmit");

    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Reseta alertas e estados prévios de erro
            clearErrors();

            const assunto = document.getElementById("assunto");
            const mensagem = document.getElementById("mensagem");

            let isValid = true;

            // Validação do campo Assunto
            if (!assunto.value.trim()) {
                showFieldError("assunto", "Por favor, selecione um assunto para a solicitação.");
                isValid = false;
            }

            // Validação do campo Mensagem (Comprimento mínimo)
            if (!mensagem.value.trim()) {
                showFieldError("mensagem", "O campo mensagem não pode ficar vazio.");
                isValid = false;
            } else if (mensagem.value.trim().length < 10) {
                showFieldError("mensagem", "A mensagem deve conter pelo menos 10 caracteres.");
                isValid = false;
            }

            if (!isValid) {
                showAlert("Por favor, corrija os erros destacadas no formulário abaixo.", "danger");
                return;
            }

            // Simulação de Envio Assíncrono com Indicador de Carregamento (Spinner)
            setButtonLoading(true);

            setTimeout(() => {
                setButtonLoading(false);
                showAlert("Sua solicitação foi enviada com sucesso! Código de acompanhamento: #SOE-" + Math.floor(100000 + Math.random() * 900000), "success");
                supportForm.reset();
            }, 1200);
        });
    }

    // Exibe mensagem de erro inline em campo específico
    function showFieldError(fieldId, message) {
        const group = document.getElementById(`group-${fieldId}`);
        const errorSpan = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);

        if (group && errorSpan) {
            group.classList.add("has-error");
            errorSpan.textContent = message;
        }

        if (field) {
            field.setAttribute("aria-invalid", "true");
        }
    }

    // Limpa todas as mensagens de erro do formulário
    function clearErrors() {
        if (feedbackAlert) feedbackAlert.innerHTML = "";

        const errorGroups = document.querySelectorAll(".form-group.has-error");
        errorGroups.forEach((group) => group.classList.remove("has-error"));

        const errorSpans = document.querySelectorAll(".field-error-message");
        errorSpans.forEach((span) => (span.textContent = ""));

        const fields = document.querySelectorAll("[aria-invalid='true']");
        fields.forEach((field) => field.removeAttribute("aria-invalid"));
    }

    // Exibe Alerta Global no topo do Formulário (Padrão SUAP)
    function showAlert(message, type = "info") {
        if (!feedbackAlert) return;

        const iconClass = type === "success" 
            ? "fa-circle-check" 
            : type === "danger" 
            ? "fa-triangle-exclamation" 
            : "fa-circle-info";

        feedbackAlert.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                <i class="fa-solid ${iconClass}" aria-hidden="true"></i>
                <div>${message}</div>
            </div>
        `;
    }

    // Altera o estado do botão para modo de carregamento
    function setButtonLoading(loading) {
        if (!btnSubmit) return;

        const buttonText = btnSubmit.querySelector(".button-text");
        const buttonIcon = btnSubmit.querySelector(".button-icon");

        if (loading) {
            btnSubmit.disabled = true;
            if (buttonIcon) buttonIcon.style.display = "none";
            buttonText.textContent = "Enviando...";
            
            const spinner = document.createElement("span");
            spinner.className = "spinner";
            btnSubmit.prepend(spinner);
        } else {
            btnSubmit.disabled = false;
            const spinner = btnSubmit.querySelector(".spinner");
            if (spinner) spinner.remove();
            
            if (buttonIcon) buttonIcon.style.display = "inline-block";
            buttonText.textContent = "Enviar Solicitação";
        }
    }
});