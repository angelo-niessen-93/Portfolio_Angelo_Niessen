<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Set your destination mailbox here.
// Optional: provide CONTACT_RECIPIENT via server environment.
$siteEmail = getenv('CONTACT_RECIPIENT') ?: 'contact@angeloniessen.dev';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    respond(200, ['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!is_array($data)) {
    respond(400, ['success' => false, 'error' => 'Invalid JSON payload']);
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$userMessage = trim((string)($data['message'] ?? ''));

if ($name === '' || mb_strlen($name) < 2 || mb_strlen($name) > 120) {
    respond(400, ['success' => false, 'error' => 'Invalid name']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'error' => 'Invalid email']);
}

if ($userMessage === '' || mb_strlen($userMessage) < 3 || mb_strlen($userMessage) > 5000) {
    respond(400, ['success' => false, 'error' => 'Invalid message']);
}

if (!filter_var($siteEmail, FILTER_VALIDATE_EMAIL)) {
    respond(500, ['success' => false, 'error' => 'Server email is not configured']);
}

// Prevent header injection.
$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);

$subject = 'Portfolio Contact Form';
$mailBody = "Name: {$safeName}\n";
$mailBody .= "Email: {$safeEmail}\n\n";
$mailBody .= "Message:\n{$userMessage}\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = "From: Portfolio Contact <{$siteEmail}>";
$headers[] = "Reply-To: {$safeEmail}";
$headers[] = "Return-Path: {$siteEmail}";

$success = mail(
    $siteEmail,
    $subject,
    $mailBody,
    implode("\r\n", $headers),
    "-f {$siteEmail}"
);

if ($success) {
    respond(200, ['success' => true]);
}

$logFile = __DIR__ . '/mail-error.log';
$logMessage = sprintf(
    "[%s] mail() failed for sender=%s name=%s%s",
    date('Y-m-d H:i:s'),
    $safeEmail,
    $safeName,
    PHP_EOL
);
file_put_contents($logFile, $logMessage, FILE_APPEND);

respond(500, ['success' => false, 'error' => 'Mail delivery failed']);
