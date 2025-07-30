import React, { useEffect, useState, useRef } from 'react';

interface YouTubeLivePlayerProps {
  className?: string;
}

const YouTubeLivePlayer: React.FC<YouTubeLivePlayerProps> = ({ className = "" }) => {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Função para verificar se há transmissão ao vivo
  const checkLiveStream = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/check-live.php', {
        method: 'HEAD',
        redirect: 'manual'
      });
      
      // Se há redirecionamento (status 302), significa que há transmissão ao vivo
      const isLiveNow = response.status === 302;
      setIsLive(isLiveNow);
      
      // Se há transmissão ao vivo, atualiza o iframe
      if (isLiveNow && iframeRef.current) {
        iframeRef.current.src = '/check-live.php';
      }
    } catch (error) {
      console.error('Erro ao verificar transmissão ao vivo:', error);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Verifica imediatamente
    checkLiveStream();
    
    // Verifica a cada 1 minuto
    const interval = setInterval(checkLiveStream, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando transmissão...</p>
        </div>
      </div>
    );
  }

  if (isLive) {
    return (
      <div className={`relative ${className}`}>
        <iframe
          ref={iframeRef}
          src="/check-live.php"
          className="w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Transmissão ao Vivo - Igreja do Parque"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          AO VIVO
        </div>
        <button
          onClick={checkLiveStream}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm hover:bg-opacity-70 transition-all"
        >
          Atualizar
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">Sem transmissão ao vivo</h3>
        <p className="text-gray-500 mb-4">
          Cultos ao vivo: Domingos às 19:00 e Quartas às 20:00
        </p>
        <div className="space-y-2">
          <button
            onClick={checkLiveStream}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mr-2 transition-all"
          >
            Verificar novamente
          </button>
          <button
            onClick={() => window.open('https://www.youtube.com/@IgrejaDoParqueOficial/streams', '_blank')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-all"
          >
            Ver no YouTube
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeLivePlayer;

