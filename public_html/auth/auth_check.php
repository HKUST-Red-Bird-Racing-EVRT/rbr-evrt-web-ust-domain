<?php
// auth_check.php

// Display errors for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// autoload composer for CAS
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config.php';
} else {
    echo "No config file found, contact admin for assistance.";
}

phpCAS::client(CAS_VERSION_3_0, CAS_HOST, CAS_PORT, CAS_CONTEXT, CAS_SERVER_BASE_URI);
// echo "init client\n";

phpCAS::setCasServerCACert(CAS_CERT_PATH);
// echo "init cert";

// 设置服务器验证
if (DEBUG_MODE) {
    phpCAS::setNoCasServerValidation();
}

// 强制认证 - 如果用户未登录，会被重定向到 CAS 服务器
phpCAS::forceAuthentication();

// 认证通过后，获取用户信息
$username = phpCAS::getUser();
$attributes = phpCAS::getAttributes();

// 启动会话并存储用户信息
session_start();
$_SESSION['user'] = [
    'username' => $username,
    'attributes' => $attributes,
    'logged_in' => true
];

// 可选：把用户信息也存为全局变量，方便在页面中使用
$user = $_SESSION['user'];