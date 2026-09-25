document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".sidebar__toggle");
    const sidebar = document.querySelector(".sidebar");
    const links = document.querySelectorAll(".nav-link");

    // Abre e fecha o menu
    menuButton.addEventListener("click", () => {
        const menuAberto = sidebar.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            menuAberto
        );
    });

    // Fecha o menu ao clicar em uma opção
    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                sidebar.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Fecha o menu pressionando ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && window.innerWidth < 992) {
            sidebar.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});