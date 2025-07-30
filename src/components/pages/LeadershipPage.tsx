import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

const LeadershipPage = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            Pastor em atividade na Igreja do Parque
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden">
              <img src="/igreja-do-parque-uploads/alfredo.jpg" alt="Rev. Alfredo Luiz Costa Filho" className="w-full h-full object-cover" />
            </div>
            <div className="text-primary font-bold text-lg mb-2">PASTOR TITULAR</div>
            <div className="text-xl font-semibold">Rev. Alfredo Luiz Costa Filho</div>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden">
              <img src="/igreja-do-parque-uploads/RevMiquéias.png" alt="Rev. Miquéias Eduardo Vieira Lima" className="w-full h-full object-cover" />
            </div>
            <div className="text-primary font-bold text-lg mb-2">PASTOR AUXILIAR</div>
            <div className="text-xl font-semibold">Rev. Miquéias Eduardo Vieira Lima</div>
          </Card>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Presbíteros em atividade</h2>
          <p className="text-lg font-semibold">A SERVIÇO DO SENHOR</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { name: "Pb. Alcindo Pacheco de Medeiros Junior", img: "/igreja-do-parque-uploads/pacheco.jpg" },
            { name: "Pb. Ivan Mota Lee", img: "/igreja-do-parque-uploads/ivan.jpg" }, 
            { name: "Pb. Henri Maeda", img: "/igreja-do-parque-uploads/maeda.jpg" },
            { name: "Pb. Wagner Roberto Saes", img: "/igreja-do-parque-uploads/wagner.jpg" }
          ].map((member, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold">{member.name}</div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Diácono</h2>
          <p className="text-lg font-semibold">A SERVIÇO DO SENHOR NO ZELO PELA IGREJA</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
              <img src="/igreja-do-parque-uploads/Hudson.jpg" alt="Diác. Hudson Lima Nascimento" className="w-full h-full object-cover" />
            </div>
            <div className="font-semibold">Diác. Hudson Lima Nascimento</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadershipPage;

