<?php
// Start with session handling
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Red Bird Racing - Formula Student Team</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <?php
    require_once 'header.php'; 
    $header = new HeaderSection('header-section');
    echo $header->render();
    ?>
    <!-- <main>
        <section class="hero" id="hero-section"></section>
        <section class="features" id="features-section"></section>
        <section class="posts" id="posts-section"></section>
    </main> -->
    <?php
    require_once 'footer.php'; 
    $footer = new FooterSection('footer-section');
    echo $footer->render();
    ?>

    <!-- JavaScript files -->
    <script src="scripts/components/header.js"></script>
    <!-- <script src="scripts/components/hero.js"></script> -->
    <!-- <script src="scripts/pages/home/posts.js"></script> -->
    <script src="scripts/components/footer.js"></script>
    <!-- <script src="scripts/pages/home/home-main.js"></script> -->
</body>
</html>
