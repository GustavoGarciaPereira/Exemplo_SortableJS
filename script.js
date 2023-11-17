$(document).ready(function() {
    new Sortable(document.getElementById('sortable-list1'), {
        swap: true, // Enable swap plugin
        animation: 150,
        ghostClass: 'sortable-ghost'
    });
});

$(document).ready(function() {
    new Sortable(document.getElementById('sortable-list2'), {
        swap: true, // Enable swap plugin
        animation: 150,
        ghostClass: 'sortable-ghost'
    });
});
