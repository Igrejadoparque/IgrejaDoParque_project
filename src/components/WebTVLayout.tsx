import React, { useState, useEffect } from 'react';
import YouTubeLivePlayer from './YouTubeLivePlayer';
import { Button } from '@/components/ui/button';
import { ActivePage } from '@/types';

interface WebTVLayoutProps {
  setActivePage?: (page: ActivePage) => void;
}

const WebTVLayout: React.FC<WebTVLayoutProps> = ({ setActivePage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLiveTime, setIsLiveTime] = useState(false);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      // Obtém o horário atual de Brasília
      const now = new Date();
      const brasiliaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
      setCurrentTime(brasiliaTime);
      
      // Verifica se é horário de culto ao vivo
      const dayOfWeek = brasiliaTime.getDay(); // 0 = domingo, 3 = quarta
      const hour = brasiliaTime.getHours();
      
      // Domingo às 19:00 ou Quarta às 20:00
      const isSundayService = dayOfWeek === 0 && hour === 19;
      const isWednesdayService = dayOfWeek === 3 && hour === 20;
      
      setIsLiveTime(isSundayService || isWednesdayService);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLiveClick = () => {
    if (isLiveTime) {
      window.open('https://www.youtube.com/@IgrejaDoParqueOficial/streams', '_blank');
    } else {
      // Redireciona para a aba publicações
      setActivePage?.('publicacoes');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-green-800 text-white p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">WebTvIPP</h1>
          <p className="text-sm">Igreja Presbiteriana Parque Industrial</p>
        </div>

        {/* Áudio & Música */}
        <div className="bg-green-700 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎵 Áudio & Música</h2>
          <p className="text-sm mb-4">Ouça hinos e músicas cristãs</p>
          <Button
            onClick={() => window.open("https://open.spotify.com/", "_blank")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            <img src="/Spotify_icon.png" alt="Spotify" className="w-5 h-5 mr-2" />Abrir Spotify
          </Button>
        </div>

        {/* Devocionais */}
        <div className="bg-green-700 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎥 Devocionais</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block text-white hover:text-gray-300">
                Devocional Matinal <span className="text-xs opacity-75">(Em breve)</span>
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-gray-300">
                Estudos Bíblicos <span className="text-xs opacity-75">Aprofunde sua fé</span>
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-gray-300">
                Sermões <span className="text-xs opacity-75">Mensagens inspiradoras</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Fale Conosco */}
        <div className="bg-green-700 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">💬 Fale Conosco</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-2 rounded bg-green-600 border border-green-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full p-2 rounded bg-green-600 border border-green-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              className="w-full p-2 rounded bg-green-600 border border-green-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              {isLiveTime ? (
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                  onClick={handleLiveClick}
                >
                  <span className="text-red-500 text-xl animate-pulse">●</span>
                  <span className="font-bold text-red-600 animate-pulse">AO VIVO</span>
                  <span className="text-gray-600">Clique para assistir</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-xl">●</span>
                  <span className="font-bold text-gray-600">OFFLINE</span>
                  <Button 
                    onClick={handleLiveClick}
                    className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Nos acompanhe pela WebTV
                  </Button>
                </div>
              )}
            </div>
            <div className="text-right text-gray-600">
              <p className="font-bold text-xl">{formatTime(currentTime)} (Brasília)</p>
              <p className="text-sm capitalize">{formatDate(currentTime)}</p>
            </div>
          </div>
          
          {isLiveTime ? (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <YouTubeLivePlayer className="w-full h-full" />
            </div>
          ) : (
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <YouTubeLivePlayer className="w-full h-full" />
            </div>
          )}
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800">
            <h3 className="font-bold mb-2">ⓘ Informações:</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Cultos ao vivo: Domingos às 19:00 e Quartas às 20:00 (Horário de Brasília)</li>
              <li>Fora dos horários de culto, acesse nossa programação 24h</li>
              <li>Transmissão ao vivo disponível no YouTube</li>
            </ul>
          </div>
        </div>

        {/* Seções de Próximo Culto, Estudo Bíblico, Escola Dominical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-lg mb-2">Próximo Culto</h3>
            <p className="text-gray-700">Domingo às 19:00</p>
            <p className="text-gray-500 text-sm">Culto de Celebração</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-lg mb-2">Estudo Bíblico</h3>
            <p className="text-gray-700">Quintas às 20:00</p>
            <p className="text-gray-500 text-sm">Online</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-lg mb-2">Escola Dominical</h3>
            <p className="text-gray-700">Domingos às 10:00</p>
            <p className="text-gray-500 text-sm">Todas as idades</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WebTVLayout;

