import { Button } from "@/components/ui/button";
import DevotionalReader from "@/components/DevotionalReader";

const YoutubeSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-100 relative overflow-hidden">
      {/* Vídeo de fundo esticado para cima e sem transparência */}
      <div className="absolute inset-0 z-0" style={{ top: "-100px" }}>
        <video
          src="/JaleuaBíblia.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          style={{
            height: "calc(100% + 100px)",
            opacity: 1,
          }}
        />
        {/* Overlay escuro apenas sobre o conteúdo, não sobre o vídeo */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          style={{ top: "100px" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 relative inline-block drop-shadow-lg">
            Devocional Diário
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 bg-white"></div>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white drop-shadow-lg">
            "Busquem primeiro o Reino de Deus e a sua justiça, e todas essas
            coisas serão acrescentadas a vocês." - Mateus 6:33
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <DevotionalReader />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
