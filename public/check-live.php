<?php
// Configuração do canal do YouTube
$channelId = "UCIl7LKqVML5ox9rem94CeTA"; // ID do canal da Igreja do Parque
$rssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=$channelId";

// Headers para permitir CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Buscar o conteúdo do RSS
$xml = @simplexml_load_file($rssUrl);
$liveVideoId = null;

if ($xml !== false) {
    // Analisar cada item do feed
    foreach ($xml->entry as $entry) {
        $ns = $entry->children('http://www.youtube.com/xml/schemas/2015');
        if (isset($ns->liveBroadcastContent) && $ns->liveBroadcastContent == 'live') {
            $liveVideoId = (string)$entry->children('yt', true)->videoId;
            break;
        }
    }
}

// Se encontrou uma live, redirecione para o embed
if ($liveVideoId) {
    header("Location: https://www.youtube.com/embed/$liveVideoId?autoplay=1&mute=1");
    exit;
} else {
    // Exiba uma mensagem ou conteúdo alternativo
    echo '<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transmissão ao Vivo - Igreja do Parque</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 {
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .refresh-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .refresh-btn:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔴 Transmissão ao Vivo</h1>
        <p>Nenhuma transmissão ao vivo no momento.</p>
        <p>Aguarde o início do culto ou verifique novamente em alguns minutos.</p>
        <button class="refresh-btn" onclick="window.location.reload()">Atualizar</button>
    </div>
    
    <script>
        // Atualiza automaticamente a cada 30 segundos
        setTimeout(() => {
            window.location.reload();
        }, 30000);
    </script>
</body>
</html>';
}
?>

