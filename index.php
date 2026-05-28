<?php
$pdo = new PDO('mysql:host=localhost;dbname=catalog_menu;charset=utf8', 'root', '');

$stmt = $pdo->query("SELECT * FROM menu_items ORDER BY sort_order");
$allItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

function buildTree($items, $parentId = null) {
    $tree = [];
    foreach ($items as $item) {
        if ($item['parent_id'] == $parentId) {
            $children = buildTree($items, $item['id']);
            if ($children) $item['children'] = $children;
            $tree[] = $item;
        }
    }
    return $tree;
}

function renderMenu($items, $isRoot = false) {
    $html = '';
    foreach ($items as $item) {
        $hasChildren = isset($item['children']);
        $openClass = $isRoot ? ' list-item_open' : '';
        
        $html .= '<div class="list-item' . $openClass . '" data-parent>';
        $html .= '<div class="list-item__inner">';
        if ($hasChildren) {
            $html .= '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>';
        }
        $html .= '<img class="list-item__folder" src="img/folder.png" alt="folder">';
        $html .= '<span>' . htmlspecialchars($item['name']) . '</span>';
        $html .= '</div>';
        if ($hasChildren) {
            $html .= '<div class="list-item__items">';
            $html .= renderMenu($item['children']);
            $html .= '</div>';
        }
        $html .= '</div>';
    }
    return $html;
}

$menuTree = buildTree($allItems);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>List Item</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
<div class="list-items" id="list-items">
    <?php echo renderMenu($menuTree, true); ?>
</div>

<script>
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const container = document.getElementById('list-items');
    
    const savedStates = JSON.parse(localStorage.getItem('menuStates') || '{}');
    document.querySelectorAll('[data-parent]').forEach(el => {
        const name = el.querySelector('span').innerText;
        if (savedStates[name]) {
            el.classList.add('list-item_open');
        }
    });
    
    container.addEventListener('click', (e) => {
        const arrow = e.target.closest('[data-open]');
        if (!arrow) return;
        
        const parent = arrow.closest('[data-parent]');
        if (parent) {
            parent.classList.toggle('list-item_open');
            
            const name = parent.querySelector('span').innerText;
            const states = JSON.parse(localStorage.getItem('menuStates') || '{}');
            states[name] = parent.classList.contains('list-item_open');
            localStorage.setItem('menuStates', JSON.stringify(states));
        }
    });
}
</script>
</body>
</html>
