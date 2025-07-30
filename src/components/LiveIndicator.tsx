import { useEffect, useState } from "react";

const LiveIndicator = () => {
  const [isLive, setIsLive] = useState(false);

  // Função para verificar se há transmissão ao vivo
  const checkLiveStream = async () => {
    try {
      // Por enquanto, vamos simular que há transmissão ao vivo em horários específicos
      const now = new Date();
      const hour = now.getHours();
      const dayOfWeek = now.getDay();
      
      // Simula transmissão ao vivo nos domingos às 19h e quintas às 20h
      const isLiveTime = (dayOfWeek === 0 && hour === 19) || (dayOfWeek === 4 && hour === 20);
      
      setIsLive(isLiveTime);
    } catch (error) {
      console.error('Erro ao verificar transmissão ao vivo:', error);
    }
  };

  useEffect(() => {
    // Verifica imediatamente
    checkLiveStream();
    
    // Verifica a cada 5 minutos
    const interval = setInterval(checkLiveStream, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <>
      <style>{`
        @keyframes liveBlink {
          0%, 50% { 
            background-color: #dc2626; 
            color: white;
          }
          51%, 100% { 
            background-color: #b91c1c; 
            color: white;
          }
        }
      `}</style>
      <div 
        className="ml-2 px-2 py-1 text-xs font-bold rounded animate-pulse"
        style={{
          animation: 'liveBlink 1s infinite',
          backgroundColor: '#dc2626',
          color: 'white'
        }}
      >
        AO VIVO
      </div>
    </>
  );
};

export default LiveIndicator;

