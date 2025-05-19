document.addEventListener('DOMContentLoaded', () => {
    fetch('/ajax/clientes')
        .then(res => res.json())
        .then(data => {
            new gridjs.Grid({
                columns: ['ID', 'Enlace al perfil'],
                data: data.map(p => [
                    p.id_cliente,
                    p.enlace_perfil
                ]),
                search: {
                    enabled: true,
                    placeholder: 'Buscar...'
                },
                sort: true,
                pagination: false,
                language: {
                    search: {
                        placeholder: 'Buscar...'
                    },
                    pagination: {
                        previous: '◀',
                        next: '▶',
                        showing: 'Mostrando',
                        of: 'de',
                        to: 'a',
                        results: 'resultados'
                    },
                    loading: 'Cargando...',
                    noRecordsFound: 'No se encontraron resultados',
                },
                className: {
                    table: 'table table-striped table-hover'
                }
            }).render(document.getElementById('tabla-clientes'));
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});