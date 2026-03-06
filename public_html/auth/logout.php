<?php
// logout.php

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

phpCAS::setNoCasServerValidation();

// End session and clear all session data
session_start();
session_destroy();

phpCAS::logout(['url' => 'https://rbrevrt.hkust.edu.hk/']);