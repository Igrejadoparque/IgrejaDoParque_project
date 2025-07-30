import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivePage } from "@/types";
import { useState, useEffect, useRef } from "react"; // Importar useRef
import VideoPlayer from "@/components/VideoPlayer"; // Importar o VideoPlayer

interface PublicationsPageProps {
  setActivePage?: (page: ActivePage) => void;
}

const PublicationsPage = ({ setActivePage }: PublicationsPageProps) => {
  const [devocionais, setDevocionais] = useState([]);
  const [estudos, setEstudos] = useState([]);
  const [boletins, setBoletins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isWebTVOpen, setIsWebTVOpen] = useState(false);

  const videoSectionRef = useRef<HTMLDivElement>(null); // Criar uma ref para a seção do vídeo

  // Carregar dados do backend
  useEffect(() => {
    fetchPublications();
    fetchBulletins();
  }, []);

  const fetchPublications = async () => {
    try {
      const backendUrl = window.REALTIME_CONFIG?.backendUrl || "";
      const [devResponse, estudoResponse] = await Promise.all([
        fetch(`${backendUrl}/api/public/publications/devocional`),
        fetch(`${backendUrl}/api/public/publications/estudo`)
      ]);
      
      if (devResponse.ok) {
        const devData = await devResponse.json();
        setDevocionais(devData);
      }
      
      if (estudoResponse.ok) {
        const estudoData = await estudoResponse.json();
        setEstudos(estudoData);
      }
    } catch (error) {
      console.error("Erro ao carregar publicações:", error);
    }
  };

  const fetchBulletins = async () => {
    try {
      const backendUrl = window.REALTIME_CONFIG?.backendUrl || "";
      const response = await fetch(`${backendUrl}/api/public/bulletins`);
      if (response.ok) {
        const data = await response.json();
        setBoletins(data);
      }
    } catch (error) {
      console.error("Erro ao carregar boletins:", error);
    }
  };

  const openWebTV = () => {
    // setActivePage?.("webtv"); // Não é mais necessário mudar de página, apenas rolar
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openYouTubeChannel = () => {
    window.open("https://www.youtube.com/@igrejapresbiterianparqueindustrial", "_blank");
  };

  const filteredBoletins = boletins.filter(boletim => {
    const matchesSearch = searchTerm === "" || 
      boletim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boletim.theme?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = selectedDate === "" || 
      boletim.date_published.startsWith(selectedDate);
    
    return matchesSearch && matchesDate;
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            Publicações e Recursos
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* WebTV Card */}
          <Card 
            className="h-80 cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/igreja-do-parque-uploads/webtv1.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <CardContent className="h-full flex flex-col justify-center items-center text-center text-white p-6">
              <h3 className="text-3xl font-bold mb-4">WebTV</h3>
              <p className="mb-6">Assista nossas transmissões ao vivo e mensagens gravadas</p>
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={openWebTV}
              >
                Acessar WebTV
              </Button>
            </CardContent>
          </Card>
          
          {/* Boletins Card */}
          <Card 
            className="h-80 cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/igreja-do-parque-uploads/boletim1.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <CardContent className="h-full flex flex-col justify-center items-center text-center text-white p-6">
              <h3 className="text-3xl font-bold mb-4">Boletins</h3>
              <p className="mb-6">Acompanhe as atividades e informações da igreja</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Baixar Boletins
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Boletins da Igreja</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Input
                        placeholder="Buscar por tema..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="month"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-40"
                      />
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {filteredBoletins.map((boletim) => (
                        <div key={boletim.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{boletim.title}</h4>
                            <p className="text-sm text-gray-600">{boletim.theme}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(boletim.date_published).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => window.open(boletim.file_url, "_blank")}
                          >
                            Baixar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          {/* Momento Missionário Card */}
          <Card 
            className="h-80 cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <CardContent className="h-full flex flex-col justify-center items-center text-center text-white p-6">
              <h3 className="text-3xl font-bold mb-4">Momento Missionário</h3>
              <p className="mb-6">Compartilhando experiências missionárias</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Saiba Mais
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Momento Missionário</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Compartilhando Experiências Missionárias</h3>
                        <p className="text-gray-600 mb-6">
                          Acompanhe os testemunhos e experiências dos nossos missionários ao redor do mundo.
                        </p>
                      </div>
                      
                      {/* Aqui seriam carregados os conteúdos dinâmicos do backend */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Missão África</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            Relatos da missão evangelística na África, compartilhando o amor de Cristo.
                          </p>
                          <Button size="sm" variant="outline">Ver Mais</Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Projeto Amazônia</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            Trabalho missionário nas comunidades ribeirinhas da Amazônia.
                          </p>
                          <Button size="sm" variant="outline">Ver Mais</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
        
        {/* Seção de Transmissão 24h - Agora abaixo dos cards */}
        <div ref={videoSectionRef} className="mb-16"> {/* Adicionar a ref aqui */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-primary mb-4">Assista às nossas transmissões 24h</h3>
            <p className="text-lg text-gray-600">Programação contínua com mensagens inspiradoras dos nossos pastores.</p>
          </div>
          
          {/* VideoPlayer diretamente na página */}
          <div className="max-w-4xl mx-auto">
            <VideoPlayer youtubeVideoId="6duRqGoNHdo" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsPage;

