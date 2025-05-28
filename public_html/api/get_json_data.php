<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$BASE_DIR = __DIR__ . '/../data';


$ALLOWED_FILES = [
    'hero' => $BASE_DIR.'/hero.json',
    'posts'=> $BASE_DIR.'/blog-posts.json',
    'highlights' => $BASE_DIR.'/highlights.json',
    'timeline' => $BASE_DIR.'/timeline.json',
    'teams' => $BASE_DIR.'/teams.json',
    'news' => $BASE_DIR.'/blog-posts.json',
    'blog-posts' => $BASE_DIR.'/blog-posts.json',
    'partners' => $BASE_DIR.'/partners.json',
    'gallery' => $BASE_DIR.'/gallery.json',
];


try {
    $page = $_GET['page'] ?? null;
    $context = $_GET['context'] ?? 'home';
    
    if (!$page || !isset($ALLOWED_FILES[$page])) {
        throw new Exception("Invalid request");
    }
    
    $jsonData = json_decode(file_get_contents($ALLOWED_FILES[$page]), true);
    echo json_encode($jsonData[$context] ?? $jsonData);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}?>