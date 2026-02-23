<?php
// logout.php - 放在根目录

require_once __DIR__ . '/vendor/autoload.php';

// CAS 配置（和上面保持一致）
define('CAS_HOST', 'cas.ust.hk');
define('CAS_CONTEXT', '/cas');
define('CAS_PORT', 443);

phpCAS::client(CAS_VERSION_3_0, CAS_HOST, CAS_PORT, CAS_CONTEXT);
phpCAS::setNoCasServerValidation();

// 结束本地会话
session_start();
session_destroy();

// 重定向到 CAS 登出，然后返回网站首页
// 请将下面的 URL 改为你的网站首页
phpCAS::logout(['url' => 'https://yourdomain.com/index.html']);