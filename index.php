<?php
// 1
$a = 5;
$b = -3;

if ($a >= 0 && $b >= 0) {
    $result1 = $a - $b;
} elseif ($a < 0 && $b < 0) {
    $result1 = $a * $b;
} else {
    $result1 = $a + $b;
}

// 2
$a2 = 7;
$output = "";
switch ($a2) {
    case 0: $output .= "0 ";
    case 1: $output .= "1 ";
    case 2: $output .= "2 ";
    case 3: $output .= "3 ";
    case 4: $output .= "4 ";
    case 5: $output .= "5 ";
    case 6: $output .= "6 ";
    case 7: $output .= "7 ";
    case 8: $output .= "8 ";
    case 9: $output .= "9 ";
    case 10: $output .= "10 ";
    case 11: $output .= "11 ";
    case 12: $output .= "12 ";
    case 13: $output .= "13 ";
    case 14: $output .= "14 ";
    case 15: $output .= "15 ";
}

// 3
function add($x, $y) { 
    return $x + $y; 
}

function subtract($x, $y) { 
    return $x - $y; 
}

function multiply($x, $y) { 
    return $x * $y; 
}

function divide($x, $y) { 
    if ($y == 0) return 0;
    return $x / $y; 
}

// 4
function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case '+':
            return add($arg1, $arg2);
        case '-':
            return subtract($arg1, $arg2);
        case '*':
            return multiply($arg1, $arg2);
        case '/':
            return divide($arg1, $arg2);
        default:
            return 0;
    }
}

$sum = mathOperation(10, 5, '+');
$diff = mathOperation(10, 5, '-');
$mult = mathOperation(10, 5, '*');
$div = mathOperation(10, 5, '/');

// 5
$year1 = date('Y');
$year2 = date('y');
$year3 = date('Y', time());

// 6
function power($val, $pow) {
    if ($pow == 0) return 1;
    return $val * power($val, $pow - 1);
}

$powerResult = power(2, 5);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="src/assets/styles/style.css">
    <title>PHP</title>
</head>
<body>

<div class="result">
    <h2>Задание 1</h2>
    <p>a = 5, b = -3</p>
    <p>Результат: <?= $result1 ?></p>
</div>

<div class="result">
    <h2>Задание 2</h2>
    <p>Числа от <?= $a2 ?> до 15: <?= $output ?></p>
</div>

<div class="result">
    <h2>Задание 3</h2>
    <p>add(10, 5) = <?= add(10, 5) ?></p>
    <p>subtract(10, 5) = <?= subtract(10, 5) ?></p>
    <p>multiply(10, 5) = <?= multiply(10, 5) ?></p>
    <p>divide(10, 5) = <?= divide(10, 5) ?></p>
</div>

<div class="result">
    <h2>Задание 4</h2>
    <p>10 + 5 = <?= $sum ?></p>
    <p>10 - 5 = <?= $diff ?></p>
    <p>10 * 5 = <?= $mult ?></p>
    <p>10 / 5 = <?= $div ?></p>
</div>

<div class="result">
    <h2>Задание 5</h2>
    <p><?= $year1 ?> | <?= $year2 ?> | <?= $year3 ?></p>
</div>

<div class="result">
    <h2>Задание 6</h2>
    <p>2 в степени 5 = <?= $powerResult ?></p>
</div>
<script src="index.js"></script>
</body>
</html>
