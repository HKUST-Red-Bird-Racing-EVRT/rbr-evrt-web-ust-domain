<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery - Red Bird Racing</title>
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="/styles/pages/gallery/gallery.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <?php
    require_once __DIR__ . '/../header.php';
    $header = new HeaderSection('header-section');
    echo $header->render();
    ?>

    <!-- Hero Section -->
    <section class="hero" id="hero-section"></section>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery-section"></section>

    <!-- Footer -->
    <?php
    require_once __DIR__ . '/../footer.php';
    $footer = new FooterSection('footer-section');
    echo $footer->render();
    ?>

    <!-- Scripts -->
    <script src="/scripts/components/header.js"></script>
    <script src="/scripts/components/hero.js"></script>
    <script src="/scripts/pages/gallery/gallery.js"></script>
    <script src="/scripts/components/footer.js"></script>
    <script src="/scripts/pages/gallery/gallery-main.js"></script>
</body>
</html> 