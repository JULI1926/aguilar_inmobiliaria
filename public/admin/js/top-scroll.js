document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.table-responsive');
    const scrollTop = document.querySelector('.scroll-top');
    const scrollContent = document.querySelector('.scroll-content');
    const table = document.querySelector('#dataTable');

    // Función para ajustar el ancho del contenido del scroll superior al ancho de la tabla
    function adjustScrollWidth() {
        const tableWidth = table.scrollWidth;
        scrollContent.style.width = `${tableWidth}px`;
    }

    // Ajusta el ancho inicialmente
    adjustScrollWidth();

    // Observa cambios en el DOM para ajustar el ancho dinámicamente
    const observer = new MutationObserver(adjustScrollWidth);
    observer.observe(table, { childList: true, subtree: true });

    // Ajusta el ancho cuando la ventana cambia de tamaño
    window.addEventListener('resize', adjustScrollWidth);

    scrollTop.addEventListener('scroll', function() {
        scrollContainer.scrollLeft = scrollTop.scrollLeft;
    });

    scrollContainer.addEventListener('scroll', function() {
        scrollTop.scrollLeft = scrollContainer.scrollLeft;
    });
});