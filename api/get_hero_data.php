<?php
header('Content-Type: application/json');

// For now, just read and return the JSON file
$pageContext = isset($_GET['pageContext']) ? $_GET['pageContext'] : 'home';
$jsonFile = __DIR__ . '/../scripts/data/hero.json';

if (file_exists($jsonFile)) {
    $jsonData = json_decode(file_get_contents($jsonFile), true);
    
    // Return the requested portion of the data
    if (isset($jsonData[$pageContext])) {
        echo json_encode($jsonData[$pageContext]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Page context not found']);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Data file not found']);
}
?>