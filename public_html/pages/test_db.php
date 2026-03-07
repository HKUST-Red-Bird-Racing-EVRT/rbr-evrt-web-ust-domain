<?php
// Diaplay errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_check.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/db/database.php';

$username = $_SESSION['user']['username'];
$attributes = $_SESSION['user']['attributes'];

echo "<h2>1. DB connection info</h2>";
echo "<pre>";
echo "DB_HOST: " . DB_HOST . "\n";
echo "DB_PORT: " . DB_PORT . "\n";
echo "DB_USER: " . DB_USER . "\n";
echo "DB_NAME: " . DB_NAME . "\n";
echo "DB_USE_SSL: " . (DB_USE_SSL ? 'true' : 'false') . "\n";
echo "</pre>";

echo "<h2>2. iHost platform environment check</h2>";

echo "MySQLi extension: ";
if (extension_loaded('mysqli')) {
    echo "✅ Loaded<br>";
} else {
    echo "❌ Not loaded<br>";
}

echo "PDO extension: ";
if (extension_loaded('pdo_mysql')) {
    echo "✅ Loaded<br>";
} else {
    echo "❌ Not loaded<br>";
}

echo "<h2>3. Network connectivity test</h2>";

$host = DB_HOST;
echo "Get IP for '$host': ";
$ip = gethostbyname($host);
if ($ip !== $host) {
    echo "✅ Resolved to IP: $ip<br>";
} else {
    echo "⚠️ Might be a direct IP or resolution failed<br>";
}

echo "Test port " . DB_PORT . " connectivity: ";
$connection = @fsockopen($host, DB_PORT, $errno, $errstr, 5);
if (is_resource($connection)) {
    echo "✅ Port is open<br>";
    fclose($connection);
} else {
    echo "❌ Unable to connect - Error: $errstr ($errno)<br>";
}

echo "<h2>4. MySQL connection test</h2>";

$methods = [];

echo "<h3>Method 1: Standard connection</h3>";
try {
    $start = microtime(true);
    $conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    $time = round((microtime(true) - $start) * 1000, 2);
    
    if ($conn->connect_error) {
        echo "❌ Connection failed: " . $conn->connect_error . "<br>";
        $methods['standard'] = ['success' => false, 'error' => $conn->connect_error];
    } else {
        echo "✅ Connection successful (time: {$time}ms)<br>";
        $conn->close();
        $methods['standard'] = ['success' => true];
    }
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "<br>";
    $methods['standard'] = ['success' => false, 'error' => $e->getMessage()];
}

echo "<h3>Method 2: PDO connection</h3>";
try {
    if (extension_loaded('pdo_mysql')) {
        $start = microtime(true);
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8";
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $time = round((microtime(true) - $start) * 1000, 2);
        echo "✅ PDO connection successful (time: {$time}ms)<br>";
    } else {
        echo "❌ PDO extension not loaded<br>";
    }
} catch (PDOException $e) {
    echo "❌ PDO connection failed: " . $e->getMessage() . "<br>";
}

echo "<h2>5. Common issue diagnosis</h2>";

$diagnosis = [];

foreach ($methods as $method => $result) {
    if (!$result['success']) {
        $error = $result['error'] ?? '';
        
        if (strpos($error, 'Connection refused') !== false) {
            $diagnosis[] = "🔴 Connection refused - Possible reasons:";
            $diagnosis[] = "   - MySQL service is not running";
            $diagnosis[] = "   - Firewall is blocking port " . DB_PORT;
            $diagnosis[] = "   - MySQL is only listening to local connections (127.0.0.1)";
        } elseif (strpos($error, 'Access denied') !== false) {
            $diagnosis[] = "🔴 Access denied - Incorrect username/password";
            $diagnosis[] = "   - Check username and password";
            $diagnosis[] = "   - Confirm user '" . DB_USER . "' can connect from your IP address";
        } elseif (strpos($error, 'timed out') !== false) {
            $diagnosis[] = "🔴 Connection timed out - Network issue";
            $diagnosis[] = "   - Database server might be offline";
            $diagnosis[] = "   - Network firewall is blocking the connection";
        } elseif (strpos($error, 'Unknown database') !== false) {
            $diagnosis[] = "🔴 Database '" . DB_NAME . "' does not exist";
        }
    }
}

if (empty($diagnosis)) {
    echo "<p style='color:green'>✅ No obvious issues found, but connection failed. Please check the specific error messages above.</p>";
} else {
    echo "<ul>";
    foreach ($diagnosis as $line) {
        echo "<li>" . htmlspecialchars($line) . "</li>";
    }
    echo "</ul>";
}

echo "<h2>6. Solution Suggestions</h2>";
echo "<ul>";
echo "<li><strong>If it's a permissions issue</strong>：Execute in phpMyAdmin: GRANT ALL PRIVILEGES ON " . DB_NAME . ".* TO '" . DB_USER . "'@'%' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;</li>";
echo "<li><strong>If remote connection is disabled</strong>：Contact your host provider to enable remote MySQL access, or confirm if the database is on the same server</li>";
echo "<li><strong>If it's an IP whitelist issue</strong>：Add your server's IP to the database's whitelist</li>";
echo "<li><strong>Test using localhost</strong>：If the database is on the same server, try changing DB_HOST to 'localhost'</li>";
echo "</ul>";

echo "<hr>";
echo "<p>Testing run at: " . date('Y-m-d H:i:s') . "</p>";

// 数据库连接
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed");
    }
    
    // 查询test表
    $result = $conn->query("SELECT * FROM test");
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Database Data Display</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1000px; margin: 0 auto; }
        .user-info { background: #f0f0f0; padding: 10px; margin-bottom: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .error { color: red; background: #ffeeee; padding: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="user-info">
            <strong>Current User:</strong> <?php echo htmlspecialchars($username); ?>
            <p><a href="/auth/logout.php">Logout</a></p>
        </div>
        
        <h1>Database connectivity test</h1>
        
        <?php if (isset($error)): ?>
            <div class="error">
                <h3>Database Error</h3>
                <p><?php echo htmlspecialchars($error); ?></p>
            </div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <?php 
                        $fields = $result->fetch_fields();
                        foreach ($fields as $field): 
                        ?>
                            <th><?php echo htmlspecialchars($field->name); ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <?php foreach ($row as $value): ?>
                                <td><?php echo htmlspecialchars($value ?? ''); ?></td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
            <p><strong><?php echo $result->num_rows; ?></strong> records in total</p>
        <?php endif; ?>
    </div>
</body>
</html>