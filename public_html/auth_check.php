<?php
// auth_check.php

// 开启错误显示
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 加载 Composer 自动加载
require_once __DIR__ . '/vendor/autoload.php';

// 加载配置（如果创建了的话）
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} else {
    // 如果没有配置文件，直接在这里定义
    define('CAS_HOST', 'cas.ust.hk');
    define('CAS_CONTEXT', '/cas');
    define('CAS_PORT', 443);
    define('DEBUG_MODE', true);
    define('CAS_SERVER_BASE_URI', 'https://rbrevrt.hkust.edu.hk/');
}
phpCAS::client(CAS_VERSION_3_0, CAS_HOST, CAS_PORT, CAS_CONTEXT, CAS_SERVER_BASE_URI);
echo "init client\n";
$cert_path = __DIR__ . '/certs/cas_cert.pem';
phpCAS::setCasServerCACert($cert_path);
echo "init cert";

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