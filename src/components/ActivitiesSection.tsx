import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

const ActivitiesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-4 relative inline-block">
            Nossas Atividades
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 bg-green-600"></div>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300 h-full">
                <div 
                  className="text-white text-center py-6 md:py-8 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url("/igreja-do-parque-uploads/b5f5b272-f9f0-4178-8f50-db12a747e117.png")`
                  }}
                >
                  <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
                  <img src="/igreja-do-parque-uploads/book_icon.png" alt="Book Icon" className="mx-auto h-10 w-10 md:h-12 md:w-12 relative z-10" />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-green-600 mb-2">Escola Dominical</h3>
                  <p className="font-semibold mb-2 text-sm md:text-base">Domingos a partir das 10:00</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Escola dominical no período matutino. Todos os domingos, sempre presentes aprendendo aos pés do Senhor.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300 h-full">
                <div 
                  className="text-white text-center py-6 md:py-8 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url("/igreja-do-parque-uploads/340e2ae9-9548-4d7f-ae77-013285e73049.png")`
                  }}
                >
                  <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
                  <img src="/igreja-do-parque-uploads/praying_hands_icon.png" alt="Praying Hands Icon" className="mx-auto h-10 w-10 md:h-12 md:w-12 relative z-10" />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-green-600 mb-2">Cultos Dominicais</h3>
                  <p className="font-semibold mb-2 text-sm md:text-base">DOMINGOS A PARTIR DAS 19H</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Culto Dominical vespertino. Todos os domingos, sempre presentes aos pés do Senhor.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300 h-full">
                <div 
                  className="text-white text-center py-6 md:py-8 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url("/igreja-do-parque-uploads/Estudobiblicoquinta.jpg")`
                  }}
                >
                  <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
                  <img src="/igreja-do-parque-uploads/Celularnamãobranco.png" alt="Celular na mão branco" className="mx-auto h-10 w-10 md:h-12 md:w-12 relative z-10" />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-green-600 mb-2">Durante a semana</h3>
                  <p className="font-semibold mb-2 text-sm md:text-base">QUINTAS-FEIRAS A PARTIR DAS 20H (Encontro virtual)</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Use este momento para estudo da Bíblia e orações em pequenos grupos.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300 h-full">
                <div 
                  className="text-white text-center py-6 md:py-8 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url("/igreja-do-parque-uploads/a18ef474-6885-4e09-9673-7081d3e3cc1c.png")`
                  }}
                >
                  <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
                  <img src="/igreja-do-parque-uploads/clock_icon.png" alt="Clock Icon" className="mx-auto h-10 w-10 md:h-12 md:w-12 relative z-10" />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-green-600 mb-2">Quando orar?</h3>
                  <p className="font-semibold mb-2 text-sm md:text-base">EM TODO TEMPO - 24 HORAS POR DIA</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Enfermidade, luto, desemprego, alegria, agradecimento entre outros. Entre em contato.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white hidden md:flex" />
          <CarouselNext className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ActivitiesSection;

