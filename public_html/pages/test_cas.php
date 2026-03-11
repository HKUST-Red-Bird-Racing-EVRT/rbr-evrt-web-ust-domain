<?php
// Diaplay errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo"Start auth check\n";
require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_check.php';
echo"End auth check\n";
$username = $_SESSION['user']['username'];
$attributes = $_SESSION['user']['attributes'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Private test page -- CAS authentication</title>
</head>
<body>
    <p>Username:<?php echo htmlspecialchars($username); ?></p>
    
    <h2>CAS returned attributes:</h2>
    <pre>
<?php print_r($attributes); ?>
    </pre>
    
    <p><a href="/auth/logout.php">Logout</a></p>
</body>
</html>