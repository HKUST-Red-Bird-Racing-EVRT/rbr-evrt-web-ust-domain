<?php
// auth_config.php

$cas_debug_mode = getenv('CAS_DEBUG_MODE') == 'true';

if ($cas_debug_mode) {
    define('CAS_DEBUG_MODE', true);

    define('CAS_HOST', getenv('CAS_HOST'));
    define('CAS_CONTEXT', getenv('CAS_CONTEXT'));
    define('CAS_PORT', intval(getenv('CAS_PORT')));

    define('CAS_SERVER_BASE_URI', getenv('CAS_SERVER_BASE_URI'));

    define('CAS_CERT_PATH', getenv('CAS_CERT_PATH'));
}
elseif (file_exists($_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config_prod.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/auth/auth_config_prod.php';
}
else {
    http_response_code(500);
    die("Fatal Error: Authentication configuration is missing or could not be loaded.");
}


?>