import { useEffect, useState } from "react";

interface LiveStreamTabProps {
  isActive: boolean;
  onClick: () => void;
}

const LiveStreamTab = ({ isActive, onClick }: LiveStreamTabProps) => {
  const [isLive, setIsLive] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Função para verificar se há transmissão ao vivo
  const checkLiveStream = async () => {
    try {
      // Verifica se há transmissão ao vivo através do script PHP
      const response = await fetch('/check-live.php', {
        method: 'HEAD', // Usa HEAD para verificar se há redirecionamento
        redirect: 'manual' // Não segue redirecionamentos automaticamente
      });
      
      // Se há redirecionamento (status 302), significa que há transmissão ao vivo
      const isLiveNow = response.status === 302;
      
      setIsLive(isLiveNow);
      setIsBlinking(isLiveNow);
    } catch (error) {
      console.error('Erro ao verificar transmissão ao vivo:', error);
      // Fallback: verifica horários específicos
      const now = new Date();
      const hour = now.getHours();
      const dayOfWeek = now.getDay();
      
      // Simula transmissão ao vivo nos domingos às 19h e quintas às 20h
      const isLiveTime = (dayOfWeek === 0 && hour === 19) || (dayOfWeek === 4 && hour === 20);
      
      setIsLive(isLiveTime);
      setIsBlinking(isLiveTime);
    }
  };

  useEffect(() => {
    // Verifica imediatamente
    checkLiveStream();
    
    // Verifica a cada 5 minutos
    const interval = setInterval(checkLiveStream, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isLive) {
      // Se há transmissão ao vivo, abre o script PHP que redirecionará para o embed
      window.open('/check-live.php', '_blank');
    } else {
      // Se não há transmissão, redireciona para o canal do YouTube
      window.open('https://www.youtube.com/@IgrejaDoParqueOficial/streams', '_blank');
    }
    onClick();
  };

  const buttonStyle = {
    backgroundColor: isLive && !isActive ? '#dc2626' : undefined,
    color: isLive && !isActive ? 'white' : undefined,
    animation: isLive ? 'blink 1s infinite' : undefined
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { background-color: #dc2626; }
          51%, 100% { background-color: #b91c1c; }
        }
      `}</style>
      <button
        onClick={handleClick}
        className={`px-3 py-2 rounded-md transition-all duration-300 whitespace-nowrap relative ${
          isActive
            ? "bg-green-600 text-white"
            : "text-gray-700 hover:text-green-600 hover:bg-green-50"
        } ${
          isBlinking ? 'animate-pulse' : ''
        }`}
        style={buttonStyle}
      >
        Culto Ao Vivo
        {isLive && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>
    </>
  );
};

export default LiveStreamTab;

