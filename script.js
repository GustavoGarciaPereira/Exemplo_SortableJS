



// Exemplo de dados (pode ser substituído pela leitura de um arquivo CSV)
// function lerECriarTabela(event) {
//     const file = event.target.files[0];

//     const reader = new FileReader();
//     reader.onload = function(event) {
//         const texto = event.target.result;
//         const dados = processarCSV(texto);
//         const tabelaHTML = criarTabelaHTML(dados);
//         document.getElementById('tabelaContainer').innerHTML = tabelaHTML;
//     };

//     reader.readAsText(file);
// }

// function processarCSV(textoCSV) {
//     const linhas = textoCSV.split('\n');
//     return linhas.map(linha => linha.split(','));
// }

// function criarTabelaHTML(dados) {
//     let html = '<table>';
//     dados.forEach((linha, idx) => {
//         html += '<tr>';
//         linha.forEach((celula, colIdx) => {
//             let divId = `sortable-list${idx}-${colIdx}`;
//             if (idx === 0) {
//                 // Considera a primeira linha como cabeçalho
//                 html += `<th><div id="${divId}">${celula}</div></th>`;
//             } else {
//                 html += `<td><div id="${divId}">${celula}</div></td>`;
//             }
//         });
//         html += '</tr>';
//     });
//     html += '</table>';
//     return html;
// }

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
