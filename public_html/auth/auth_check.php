<?php
// auth_check.php

// Display errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config.php';
} else {
    http_response_code(500);
    die("No CAS config file found, contact admin for assistance.");
}

$cas_debug_mode = getenv('CAS_DEBUG_MODE') == 'true';

if ($cas_debug_mode) {
    // echo "CAS in debug mode";
    $username = getenv('test_username');
    $attributes = [
        'email' => getenv('test_email'),
        'displayName' => getenv('test_display_name')
    ];
    $_SESSION['user'] = [
        'username' => $username,
        'attributes' => $attributes,
        'logged_in' => true
    ];
    return;
}
else {
    // echo "CAS in production mode";

    // autoload composer for CAS
    require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

    phpCAS::client(CAS_VERSION_3_0, CAS_HOST, CAS_PORT, CAS_CONTEXT, CAS_SERVER_BASE_URI);
    // echo "init client\n";

    phpCAS::setCasServerCACert(CAS_CERT_PATH);
    // echo "init cert";

    // Force authentication. This will redirect to the CAS server if the user is not authenticated.
    phpCAS::forceAuthentication();
    // echo "forced auth";

    // 认证通过后，获取用户信息
    $username = phpCAS::getUser();
    $attributes = phpCAS::getAttributes();

    // 启动会话并存储用户信息
    $_SESSION['user'] = [
        'username' => $username,
        'attributes' => $attributes,
        'logged_in' => true
    ];
}