import { Button } from "@/components/ui/button";
import { ActivePage } from "@/types";

interface AboutSectionProps {
  setActivePage: (page: ActivePage) => void;
}

const AboutSection = ({ setActivePage }: AboutSectionProps) => {
  return (
    <section 
      className="py-20 text-white text-center relative"
      style={{
        backgroundImage: `url('/igreja-do-parque-uploads/5824c562-529c-4079-a0ca-eed105599cfa.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay verde escuro transparente */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-8 relative inline-block text-white">
          Mais que uma Igreja
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-300"></div>
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl font-bold mb-6">JUNTOS PARA LOUVAR A DEUS</p>
          <p className="text-lg mb-6">
            Na Igreja do Parque nossa missão é conectar pessoas ao coração de Deus desde 1992. 
            Nosso objetivo é inspirar você através da santidade do nosso Senhor Jesus Cristo.
          </p>
          <p className="text-lg mb-8">
            Torne-se parte de nossa Igreja Presbiteriana no Parque Industrial, em Campinas.
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            onClick={() => setActivePage("sobre")}
          >
            Conheça nossa história
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

