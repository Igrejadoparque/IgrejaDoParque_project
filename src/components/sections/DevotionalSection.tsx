import React from 'react';
import DevotionalReader from '@/components/DevotionalReader';

const DevotionalSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Video de Fundo */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      >
        <source src="/videos/background_video.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Conteúdo da Seção */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-800 mb-4 relative inline-block">
            Devocional Diário
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 bg-green-600"></div>
          </h2>
          <p className="text-lg text-gray-700">
            Alimente sua alma com a Palavra de Deus através do Presente Diário da RTM Brasil
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <DevotionalReader />
        </div>
      </div>
    </section>
  );
};

export default DevotionalSection;


