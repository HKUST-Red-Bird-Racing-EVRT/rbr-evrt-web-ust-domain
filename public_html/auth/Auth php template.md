## Add the following at the start of the .php file if page requires authentication:
<?php
// Diaplay errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_check.php';

$username = $_SESSION['user']['username'];
$attributes = $_SESSION['user']['attributes'];
?>