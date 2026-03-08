<?php
// Get database connection info from environment variables
$db_host_env = getenv('DB_HOST');

if ($db_host_env !== false) {
    // Environment variables are set, so we are in the dev/Docker environment.
    // Define constants from the environment variables.
    define('DB_HOST', getenv('DB_HOST'));  // Host IP or hostname
    define('DB_USER', getenv('DB_USER'));  // Username
    define('DB_PASS', getenv('DB_PASS'));  // Password
    define('DB_NAME', getenv('DB_NAME'));  // Database name
    define('DB_PORT', getenv('DB_PORT'));  // Port number
    define('DB_CHARSET', getenv('DB_CHARSET') ?: 'utf8mb4'); // Character set, default is utf8mb4

    // SSL options (if needed)
    define('DB_USE_SSL', getenv('DB_USE_SSL') === 'true'); // SSL enabled flag
    define('DB_SSL_CA', getenv('DB_SSL_CA')); // SSL certificate authority file path

} 
elseif (file_exists( $_SERVER['DOCUMENT_ROOT'] . '/db/database_prod.php')) {
    require_once($_SERVER['DOCUMENT_ROOT'] . '/db/database_prod.php');

} 
else {
    // If neither environment variables nor the prod file are found, we can't continue.
    // Die with a generic error to avoid leaking path information.
    http_response_code(500);
    die("Fatal Error: Database configuration is missing or could not be loaded.");
}