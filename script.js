document.getElementById('csvFileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var text = e.target.result;
        createTableFromCSV(text);
    };

    reader.readAsText(file);
});

function createTableFromCSV(csvText) {
    var rows = csvText.split('\n');
    var columns = [];
    var headers = rows[0].split(',');

    // Inicializa arrays para cada coluna
    for (var j = 0; j < headers.length; j++) {
        columns[j] = '<div id="sortable-list' + (j + 1) + '">';
    }

    // Processa cada linha
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(',');
        for (var k = 0; k < cells.length; k++) {
            columns[k] += '<div class="list-item">' + cells[k].trim() + '</div>';
        }
    }

    // Fecha as tags div de cada coluna
    for (var l = 0; l < columns.length; l++) {
        columns[l] += '</div>';
    }

    // Constrói o cabeçalho da tabela
    var tableHTML = '<table><tr>';
    for (var m = 0; m < headers.length; m++) {
        tableHTML += '<th class="list-item">' + headers[m].trim() + '</th>';
    }
    tableHTML += '</tr><tr>';

    // Adiciona as colunas à tabela
    for (var n = 0; n < columns.length; n++) {
        tableHTML += '<td>' + columns[n] + '</td>';
    }

    tableHTML += '</tr></table>';

    document.getElementById('table-container').innerHTML = tableHTML;

    initializeSortable();
}

function initializeSortable() {
    var i = 1;
    while (document.getElementById('sortable-list' + i)) {
        new Sortable(document.getElementById('sortable-list' + i), {
            swap: true,
            animation: 150,
            ghostClass: 'sortable-ghost'
        });
        i++;
    }
}
