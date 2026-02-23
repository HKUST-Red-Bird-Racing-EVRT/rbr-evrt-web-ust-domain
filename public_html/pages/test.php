<?php
// Diaplay errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_check.php';

$username = $_SESSION['user']['username'];
$attributes = $_SESSION['user']['attributes'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>私密页面 - 调试</title>
</head>
<body>
    <h1>私密页面 (调试模式)</h1>
    <p>用户名：<?php echo htmlspecialchars($username); ?></p>
    
    <h2>CAS 返回的所有属性：</h2>
    <pre>
<?php print_r($attributes); ?>
    </pre>
    
    <p><a href="/logout.php">登出</a></p>
</body>
</html>