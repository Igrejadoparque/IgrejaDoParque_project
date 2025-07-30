import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EventsPage = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            Próximos Eventos
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
            <div 
              className="h-48 flex items-center justify-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/igreja-do-parque-uploads/Viagem.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3 className="text-3xl font-bold text-white text-center">Viagem Missionária</h3>
            </div>
            <CardContent className="p-6">
              <p className="text-lg mb-6">
                Participe da nossa próxima viagem missionária. Uma oportunidade de servir e compartilhar o amor de Cristo.
              </p>
              <Button className="bg-primary hover:bg-primary/90">Saiba mais</Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
            <div 
              className="h-48 flex items-center justify-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/igreja-do-parque-uploads/Comunidade.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3 className="text-3xl font-bold text-white text-center">Dia da Comunidade</h3>
            </div>
            <CardContent className="p-6">
              <p className="text-lg mb-6">
                Um dia especial de integração e serviço à nossa comunidade local. Traga sua família e participe!
              </p>
              <Button className="bg-primary hover:bg-primary/90">Saiba mais</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventsPage;