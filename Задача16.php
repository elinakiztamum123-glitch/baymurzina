<?php
$title = "Страница для php";
$h1 = "Делаем дальше";
$current_year = date("Y");

function getCurrentTime() {
    $hours = date("H");
    $minutes = date("i");
  
    if ($hours % 10 == 1 && $hours % 100 != 11) {
        $hours_word = "час";
    } elseif (($hours % 10 >= 2 && $hours % 10 <= 4) && ($hours % 100 < 10 || $hours % 100 >= 20)) {
        $hours_word = "часа";
    } else {
        $hours_word = "часов";
    }
    if ($minutes % 10 == 1 && $minutes % 100 != 11) {
        $minutes_word = "минута";
    } elseif (($minutes % 10 >= 2 && $minutes % 10 <= 4) && ($minutes % 100 < 10 || $minutes % 100 >= 20)) {
        $minutes_word = "минуты";
    } else {
        $minutes_word = "минут";
    }
    
    return $hours . " " . $hours_word . " " . $minutes . " " . $minutes_word;
}

$current_time = getCurrentTime();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title; ?></title>
</head>
<body>
    <h1><?php echo $h1; ?></h1>
    
    <p>Текущий год: <?php echo $current_year; ?></p>
    <p>Текущее время: <?php echo $current_time; ?></p>
    <main>
        <h1 class="h1">Контакты</h1>
        <h2 class="h2">Contact Us</h2>
        <p class="p">Не пишите...</p>
    </main>
</body>
</html>