document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-collapsed');
        mainContent.classList.toggle('main-expanded');
        
        const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
        sidebarToggle.innerHTML = `<i class="ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line ri-lg"></i>`;
    });
});