<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post - Red Bird Racing</title>
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="/styles/pages/blog/blog-detail.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <?php
    require_once __DIR__ . '/../header.php';
    $header = new HeaderSection('header-section');
    echo $header->render();
    ?>
    <section class="blog-detail" id="blog-detail-section"></section>
    <?php
    require_once __DIR__ . '/../footer.php';
    $footer = new FooterSection('footer-section');
    echo $footer->render();
    ?>

    <script src="/scripts/components/header.js"></script>
    <script src="/scripts/pages/blog/blog-detail.js"></script>
    <script src="/scripts/components/footer.js"></script>
    <script src="/scripts/pages/blog/blog-detail-main.js"></script>
</body>
</html> 