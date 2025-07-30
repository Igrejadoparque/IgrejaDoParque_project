import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DepartmentsPage = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            Departamentos Internos
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="text-center p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/igreja-do-parque-uploads/logoUMP1.png" 
                alt="Logo UMP" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-2xl font-bold text-primary">UMP</h3>
            </div>
            <p className="text-lg font-semibold mb-4">União de Mocidade Presbiteriana</p>
            <p className="text-muted-foreground mb-6">
              Grupo de jovens que se reúne para estudos bíblicos, comunhão e atividades sociais.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Saiba mais</Button>
          </Card>
          
          <Card className="text-center p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/igreja-do-parque-uploads/logoSAF01.jpeg" 
                alt="Logo SAF" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-2xl font-bold text-primary">SAF</h3>
            </div>
            <p className="text-lg font-semibold mb-4">Sociedade Auxiliadora Feminina</p>
            <p className="text-muted-foreground mb-6">
              Grupo de mulheres que desenvolve projetos sociais, estudos bíblicos e atividades comunitárias.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Saiba mais</Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsPage;