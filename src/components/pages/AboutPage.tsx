import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            Um pouco de nossa história
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg">
              Os trabalhos da Igreja Presbiteriana no Parque Industrial de Campinas começaram no início do ano de 1992, com reuniões de oração na casa de Irene Ávila de Figueiredo, à Av. João Batista Morato do Canto, n° 2239, as quais aconteceram até maio de 1998.
            </p>
            <p className="text-lg">
              Sob orientação do Rev. Ricardo Soares Mattos, o grupo que fazia reuniões de oração, passou a se reunir na Rua Benedito Ferreira Marques, n° 286, agora como Ponto de Pregação do Parque Industrial.
            </p>
            <p className="text-lg">
              A equipe que esteve auxiliando no início dos trabalhos do Ponto de Pregação foi composta por vários pastores e oficiais da igreja. No início de 1999, o Conselho da Igreja Presbiteriana de Campinas, através do Rev. Jônatas Alves de Oliveira, organizou, o que era Ponto de Pregação, em Congregação do Parque Industrial.
            </p>
            <p className="text-lg mb-6">
              Cinco meses depois, no dia 18 de junho de 1999, aconteceu o primeiro culto da Congregação no imóvel alugado na Rua José Pinto de Camargo, n° 90, onde as atividades acontecem até os dias atuais.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Quer saber mais sobre nós?
            </Button>
          </div>
          
          <div className="h-96 rounded-lg overflow-hidden">
            <img src="/igreja-do-parque-uploads/Igrejadoparquefrente.jpg" alt="Igreja do Parque - Fachada" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="bg-muted p-12 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Igreja do Parque: Uma Missão - Uma Visão</h2>
            <p className="text-lg font-semibold">FÉ AUTÊNTICA</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Missão</h3>
              <p className="text-lg">
                "A Igreja Presbiteriana do Parque Industrial é uma comunidade de pessoas que o amor de Deus, em Cristo, alcança e transforma. Sua Missão é adorar a Deus, testemunhando o Evangelho, fazendo discípulos de Jesus, vivendo em amor, comunhão e oração, ensinando as escrituras bíblicas, acolhendo e servindo ao próximo."
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Visão</h3>
              <p className="text-lg">
                "A Visão da Igreja Presbiteriana do Parque Industrial é ser uma comunidade relevante, vibrante, acolhedora, transformadora, missionária, unida e participativa, na vida e na missão da Igreja, contribuindo assim para o crescimento do Reino de Deus sobre a Terra."
              </p>
            </Card>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Venha nos visitar</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl font-semibold text-primary leading-relaxed">
              Somente a Escritura, Somente Cristo, Somente a Graça, Somente a Fé, Somente a Deus toda a glória.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;


