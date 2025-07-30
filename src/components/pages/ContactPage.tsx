import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MapSection from "@/components/sections/MapSection";

const ContactPage = () => {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: `Obrigado ${data.name}, sua mensagem foi enviada para pr.alfredoluiz@gmail.com`,
    });
    
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-600 mb-4 relative inline-block">
            Entre em Contato
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600"></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input name="name" id="name" required />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone (Opcional)</Label>
                <Input name="phone" id="phone" type="tel" />
              </div>
              
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Select name="subject" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duvida">Dúvida</SelectItem>
                    <SelectItem value="oracao">Pedido de Oração</SelectItem>
                    <SelectItem value="sugestao">Sugestão</SelectItem>
                    <SelectItem value="elogio">Elogio</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea name="message" id="message" className="min-h-32" required />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Enviar mensagem
              </Button>
            </form>
          </Card>
          
          <MapSection />
        </div>
        
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-green-600 mb-8">Doações via PIX</h2>
          <p className="text-lg mb-6">Ajude a manter nosso trabalho através de doações</p>
          <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-lg flex items-center justify-center">
            <QrCode size={80} className="text-green-600" />
          </div>
          <p className="text-lg font-semibold">Chave PIX: contato@igrejadoparque.org.br</p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

