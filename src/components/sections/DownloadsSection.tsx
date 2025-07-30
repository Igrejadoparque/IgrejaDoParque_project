import { Button } from "@/components/ui/button";
import { ActivePage } from "@/types";

interface DownloadsSectionProps {
  setActivePage: (page: ActivePage) => void;
}

const DownloadsSection = ({ setActivePage }: DownloadsSectionProps) => {
  return (
    <section 
      className="py-20 text-white text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/igreja-do-parque-uploads/017da7d3-4d4b-4271-9374-f51088fcf454.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 relative inline-block text-white">
          FAÇA O DOWNLOAD DOS NOSSOS BOLETINS
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-300"></div>
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Pelos boletins você também acompanha o que acontece em nossa igreja. Acesse
        </p>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setActivePage("publicacoes")}
        >
          Baixar Boletins
        </Button>
      </div>
    </section>
  );
};

export default DownloadsSection;

