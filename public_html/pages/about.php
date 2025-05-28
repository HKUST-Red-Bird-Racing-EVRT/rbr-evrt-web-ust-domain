<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Red Bird Racing</title>
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="/styles/pages/about/about.css">
    <link rel="stylesheet" href="/styles/pages/about/timeline.css">
    <link rel="stylesheet" href="/styles/pages/about/highlights.css">
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

    <!-- About Content -->
    <section class="about" id="about-section"></section>

    <!-- Timeline Section -->
    <section class="timeline" id="timeline-section"></section>

    <!-- Highlights Section -->
    <section class="highlights" id="highlights-section"></section>

    <!-- Footer -->
    <?php
    require_once __DIR__ . '/../footer.php';
    $footer = new FooterSection('footer-section');
    echo $footer->render();
    ?>

    <!-- Scripts -->
    <script src="/scripts/components/header.js"></script>
    <script src="/scripts/components/hero.js"></script>
    <script src="/scripts/pages/about/about.js"></script>
    <script src="/scripts/pages/about/timeline.js"></script>
    <script src="/scripts/pages/about/highlights.js"></script>
    <script src="/scripts/components/footer.js"></script>
    <script src="/scripts/pages/about/about-main.js"></script>
</body>
</html> 