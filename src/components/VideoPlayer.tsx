import React, { useEffect, useRef, useState } from 'react';
import { YouTubeService, LiveStreamInfo } from '@/services/youtubeService';

interface VideoPlayerProps {
  className?: string;
  youtubeVideoId?: string; // Novo prop para ID de vídeo do YouTube
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className = '', youtubeVideoId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [liveInfo, setLiveInfo] = useState<LiveStreamInfo>({ isLive: false });
  const [showMuteOverlay, setShowMuteOverlay] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Playlist com os vídeos fornecidos
  const playlist = [
    { url: 'https://archive.org/download/rev.-alfredo-costa-mordomia-crista-superando-medos/Rev.%20Alfredo%20Costa%20%20MORDOMIA%20CRIST%C3%83%20-%20SUPERANDO%20MEDOS.mp4', duration: 2964 },
    { url: 'https://archive.org/download/rev.-miqueias-vieira-deus-ou-a-cultura-o-chamado-para-permanecer-firme/Rev.%20Miqu%C3%A9ias%20Vieira%20%20DEUS%20OU%20A%20CULTURA%20O%20CHAMADO%20PARA%20PERMANECER%20FIRME.mp4', duration: 2304 },
    { url: 'https://archive.org/download/rev_alfredo_costa_jesus_o_melhor_pastor/Rev%20Alfredo%20Costa%20%20JESUS%20O%20MELHOR%20PASTOR.mp4', duration: 1889 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/1%20Samuel%201.%201-18%20-%20Pr.%20Carlos%20Magno%20-%20A%20casa%20do%20Pai.mp4', duration: 4604 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/2%20Cr%C3%B4nicas%2015.%201-15%20-%20Pr.%20Valter%20Matheus.mp4', duration: 6393 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Atos%201.1-11%20-%20Pr.%20Alex%20Augusto%20da%20Silva%20-%20Foco%20e%20motiva%C3%A7%C3%A3o%20em%20tempos%20de%20espera%20%5B1%5D.mp4', duration: 4803 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Culto%2027092020.mp4', duration: 5787 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/II%20Samuel%209%20-%20Pr.%20Carlos%20Magno%20-%20Deus%20nos%20conduz%20%C3%A0%20verdadeira%20Gra%C3%A7a%20%5B1%5D.mp4', duration: 4580 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Isa%C3%ADas%206%20-%20Pr.%20Carlos%20Magno.mp4', duration: 6111 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Jo%C3%A3o%206.22-69%20-%20Asp.%20Yago%20Ferrari%20-%20O%20Deus%20constrangedor.mp4', duration: 6111 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Jo%C3%A3o%206.22-69%20-%20Asp.%20Yago%20Ferrari%20-%20O%20Deus%20constrangedor.mp4', duration: 6416 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Mt.%208.%2023-27%20-%20Rev.%20Alfredo%20Luiz%20-%20Como%20est%C3%A1%20sua%20f%C3%A9%20hoje.mp4', duration: 6065 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Neemias%201%20-%20Rev.%20Valter%20Matheus%20-%20Deus%20nos%20chama%20a%20reconstruir%20sua%20igreja.mp4', duration: 5044 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/Prov%C3%A9rbios%2022.%2024-25%20-%20Pr.%20Carlos%20Magno%20-%20Transformados%20para%20transformar.mp4', duration: 7429 },
    { url: 'https://archive.org/download/culto-de-louvor-01112020-rev.-carlos-magno/%C3%8Axodo%2012.%201-14%20%2024-27%20-%20Pr.%20Carlos%20Magno.mp4', duration: 6003 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2005%20de%20maio%20de%202019.mp4', duration: 2728 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2007%20de%20julho%20de%202019.mp4', duration: 6192 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2008%20de%20setembro%20de%202019.mp4', duration: 4716 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2011%20de%20agosto%20de%202019.mp4', duration: 5536 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2014%20de%20julho%20de%202019.mp4', duration: 6148 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2018%20de%20agosto%20de%202019.mp4', duration: 5351 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2025%20de%20agosto%20de%202019.mp4', duration: 5098 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Culto%20noturno%20de%2030%20de%20junho%20de%202019.mp4', duration: 5632 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Lucas%2018.35-43%20-%20Pr%20Carlos%20Magno.mp4', duration: 2204 },
    { url: 'https://archive.org/download/culto-noturno-de-05-de-maio-de-2019/Salmo%20126%20-%20Pr.%20Valter%20Matheus.mp4', duration: 6228 }
  ];

  const totalPlaylistDuration = playlist.reduce((sum, video) => sum + video.duration, 0);
  const broadcastEpoch = new Date('2025-01-01T00:00:00Z').getTime() / 1000;

  // Função para verificar se há transmissão ao vivo
  const checkLiveStream = async () => {
    try {
      const info = await YouTubeService.checkLiveStreamSimple();
      setLiveInfo(info);
      
      if (info.isLive && info.embedUrl) {
        // Pausar vídeo atual se estiver reproduzindo
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else if (!info.isLive && liveInfo.isLive) {
        // Voltar para playlist se não estiver mais ao vivo
        startPlayback();
      }
    } catch (error) {
      console.log('Erro ao verificar transmissão ao vivo:', error);
      setLiveInfo({ isLive: false });
    }
  };

  // Função para iniciar reprodução da playlist
  const startPlayback = () => {
    if (!videoRef.current || liveInfo.isLive) return;

    const now = new Date().getTime() / 1000;
    const elapsedSinceEpoch = now - broadcastEpoch;

    let currentPlaylistTime = elapsedSinceEpoch % totalPlaylistDuration;
    let videoIndex = 0;
    let timeIntoVideo = 0;

    for (let i = 0; i < playlist.length; i++) {
      if (currentPlaylistTime < playlist[i].duration) {
        videoIndex = i;
        timeIntoVideo = currentPlaylistTime;
        break;
      }
      currentPlaylistTime -= playlist[i].duration;
    }

    setCurrentVideoIndex(videoIndex);
    videoRef.current.src = playlist[videoIndex].url;
    videoRef.current.currentTime = timeIntoVideo;
    videoRef.current.muted = isMuted;
    
    videoRef.current.play().catch(error => {
      console.log("A reprodução automática foi bloqueada pelo navegador.");
    });
  };

  // Função para lidar com o fim do vídeo
  const handleVideoEnded = () => {
    if (!videoRef.current || liveInfo.isLive) return;

    const nextIndex = (currentVideoIndex + 1) % playlist.length;
    setCurrentVideoIndex(nextIndex);
    videoRef.current.src = playlist[nextIndex].url;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  // Função para lidar com cliques no vídeo
  const handleVideoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    
    if (isMuted) {
      // Primeiro clique: ativar som
      setIsMuted(false);
      setShowMuteOverlay(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
    }
  };

  // Função para lidar com duplo clique (tela cheia)
  const handleDoubleClick = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    } else if (iframeRef.current) {
      // Para iframes do YouTube, é mais complexo controlar fullscreen diretamente
      // A API do YouTube Player pode ser usada para isso, mas requer mais setup
      // Por enquanto, o fullscreen é controlado pelo próprio player do YouTube
      // quando o usuário clica no botão de fullscreen do player.
      // Podemos tentar simular um clique no botão de fullscreen do iframe se necessário.
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        // Tentar entrar em fullscreen no iframe
        try {
          if (iframeRef.current.requestFullscreen) {
            iframeRef.current.requestFullscreen();
          } else if ((iframeRef.current as any).mozRequestFullScreen) { /* Firefox */
            (iframeRef.current as any).mozRequestFullScreen();
          } else if ((iframeRef.current as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            (iframeRef.current as any).webkitRequestFullscreen();
          } else if ((iframeRef.current as any).msRequestFullscreen) { /* IE/Edge */
            (iframeRef.current as any).msRequestFullscreen();
          }
        } catch (e) {
          console.error("Erro ao tentar fullscreen no iframe:", e);
        }
      }
    }
  };

  useEffect(() => {
    // Se um youtubeVideoId for fornecido, não verificar live stream nem playlist
    if (youtubeVideoId) {
      setLiveInfo({ isLive: false }); // Garante que não está em modo live stream
      return; // Não executa o restante do useEffect
    }

    // Verificar transmissão ao vivo a cada 30 segundos
    const liveCheckInterval = setInterval(checkLiveStream, 30000);
    
    // Verificação inicial
    checkLiveStream();

    // Iniciar reprodução se não estiver ao vivo
    if (!liveInfo.isLive) {
      startPlayback();
    }

    return () => {
      clearInterval(liveCheckInterval);
    };
  }, [liveInfo.isLive, youtubeVideoId]); // Adicionar youtubeVideoId como dependência

  useEffect(() => {
    const video = videoRef.current;
    if (video && !youtubeVideoId) { // Apenas para playlist
      video.addEventListener('ended', handleVideoEnded);
      return () => {
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [youtubeVideoId]);

  const youtubeEmbedUrl = youtubeVideoId 
    ? `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=1&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`
    : liveInfo.embedUrl;

  return (
    <div className={`relative w-full aspect-video bg-black ${className}`}>
      {/* Vídeo da playlist (apenas se não for YouTube direto e não for live) */}
      {!youtubeVideoId && !liveInfo.isLive && (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          muted={isMuted}
          playsInline
          onClick={handleVideoClick}
          onDoubleClick={handleDoubleClick}
        />
      )}
      
      {/* Iframe para transmissão ao vivo ou vídeo do YouTube direto */}
      {(youtubeVideoId || (liveInfo.isLive && liveInfo.embedUrl)) && (
        <iframe
          ref={iframeRef}
          src={youtubeEmbedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onClick={handleVideoClick} // Click para mute/unmute
          onDoubleClick={handleDoubleClick} // Double click para tela cheia
        />
      )}
      
      {/* Overlay de mute */}
      {showMuteOverlay && isMuted && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-10"
          onClick={handleVideoClick}
        >
          <div className="text-center">
            <img 
              src="/mute-icon.png" 
              alt="Clique para ouvir" 
              className="w-24 h-24 mx-auto mb-4 opacity-90"
            />
          </div>
        </div>
      )}

      {/* Indicador de transmissão ao vivo e título */}
      {liveInfo.isLive && (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-20 flex items-center space-x-2">
          🔴 AO VIVO
          {liveInfo.title && <span className="ml-2">{liveInfo.title}</span>}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;


