import React from 'react';

export interface LiveStreamInfo {
  isLive: boolean;
  videoId?: string;
  title?: string;
  embedUrl?: string;
}

export class YouTubeService {
  private static readonly CHANNEL_URL = 'https://www.youtube.com/@IgrejaDoParqueOficial';
  private static readonly STREAMS_URL = 'https://www.youtube.com/@IgrejaDoParqueOficial/streams';

  // Método principal para verificar transmissão ao vivo
  static async checkLiveStreamSimple(): Promise<LiveStreamInfo> {
    try {
      // Tentar verificar através de proxy CORS
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(this.STREAMS_URL)}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao acessar proxy');
      }

      const data = await response.json();
      
      if (data.contents) {
        // Procurar por indicadores de transmissão ao vivo
        const content = data.contents.toLowerCase();
        
        // Verificar se há transmissão ao vivo ativa
        const hasLiveIndicator = content.includes('live now') || 
                                content.includes('ao vivo') || 
                                content.includes('streaming') ||
                                content.includes('"isLiveContent":true') ||
                                content.includes('live-badge');

        if (hasLiveIndicator) {
          // Tentar extrair ID do vídeo
          const videoIdMatch = data.contents.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
          const videoId = videoIdMatch ? videoIdMatch[1] : null;
          
          // Tentar extrair título da transmissão
          let title = 'Transmissão Ao Vivo';
          
          // Procurar por padrões de título específicos
          const titlePatterns = [
            /estudo bíblico/i,
            /culto dominical/i,
            /culto/i,
            /pregação/i,
            /louvor/i
          ];
          
          for (const pattern of titlePatterns) {
            if (pattern.test(content)) {
              if (pattern.source.includes('estudo')) {
                const today = new Date();
                title = `Estudo Bíblico - ${today.toLocaleDateString('pt-BR')}`;
              } else if (pattern.source.includes('culto dominical')) {
                title = 'Culto Dominical Ao Vivo';
              } else if (pattern.source.includes('culto')) {
                title = 'Culto Ao Vivo';
              }
              break;
            }
          }
          
          return {
            isLive: true,
            videoId: videoId || undefined,
            title: title,
            embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1` : 
                     `https://www.youtube.com/embed/live_stream?channel=UCyourChannelId&autoplay=1&mute=1`
          };
        }
      }
      
      // Se não encontrou indicadores de live, retornar false
      return { isLive: false };

    } catch (error) {
      console.error('Erro ao verificar transmissão ao vivo:', error);
      
      // Fallback: verificar baseado em horários típicos de transmissão
      return this.checkScheduledLive();
    }
  }

  // Método de fallback baseado em horários programados
  private static checkScheduledLive(): LiveStreamInfo {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domingo, 4 = Quinta-feira
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Verificar horários típicos de transmissão
    // Domingos às 19h (culto dominical)
    if (dayOfWeek === 0 && hour === 19 && minute < 120) { // 2 horas de duração
      return {
        isLive: true,
        title: 'Culto Dominical Ao Vivo',
        videoId: 'live_domingo',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCyourChannelId&autoplay=1&mute=1'
      };
    }
    
    // Quintas-feiras às 20h (estudo bíblico)
    if (dayOfWeek === 4 && hour === 20 && minute < 90) { // 1.5 horas de duração
      return {
        isLive: true,
        title: `Estudo Bíblico - ${now.toLocaleDateString('pt-BR')}`,
        videoId: 'live_quinta',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCyourChannelId&autoplay=1&mute=1'
      };
    }

    return { isLive: false };
  }

  // Método alternativo usando YouTube oEmbed API (mais confiável)
  static async checkLiveStreamOEmbed(): Promise<LiveStreamInfo> {
    try {
      // Tentar acessar a URL de live stream diretamente
      const liveUrl = `${this.CHANNEL_URL}/live`;
      const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(liveUrl)}&format=json`;
      
      const response = await fetch(oEmbedUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // Se conseguiu obter dados do oEmbed, há uma transmissão ativa
        if (data.title && data.html) {
          // Extrair ID do vídeo do HTML retornado
          const videoIdMatch = data.html.match(/embed\/([a-zA-Z0-9_-]{11})/);
          const videoId = videoIdMatch ? videoIdMatch[1] : null;
          
          return {
            isLive: true,
            videoId: videoId || undefined,
            title: data.title,
            embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1` : undefined
          };
        }
      }
      
      return { isLive: false };
    } catch (error) {
      console.error('Erro no método oEmbed:', error);
      return { isLive: false };
    }
  }
}

// Hook personalizado para verificar transmissão ao vivo
export const useLiveStream = (checkInterval: number = 30000) => {
  const [liveInfo, setLiveInfo] = React.useState<LiveStreamInfo>({ isLive: false });
  const [isChecking, setIsChecking] = React.useState(false);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkLive = async () => {
      setIsChecking(true);
      try {
        // Tentar primeiro o método principal, depois o oEmbed como fallback
        let info = await YouTubeService.checkLiveStreamSimple();
        
        if (!info.isLive) {
          info = await YouTubeService.checkLiveStreamOEmbed();
        }
        
        setLiveInfo(info);
      } catch (error) {
        console.error('Erro ao verificar transmissão:', error);
        setLiveInfo({ isLive: false });
      } finally {
        setIsChecking(false);
      }
    };

    // Verificação inicial
    checkLive();

    // Verificação periódica
    intervalId = setInterval(checkLive, checkInterval);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [checkInterval]);

  return { liveInfo, isChecking };
};

