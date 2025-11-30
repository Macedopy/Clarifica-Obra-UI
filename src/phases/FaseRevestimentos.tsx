// src/phases/FaseRevestimentos.tsx
import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";
import { useUserType } from "../contexts/UserTypeContext";

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseRevestimentos = () => {
  const { customerId } = useUserType();

  const handleSave = async (dados: any) => {
    const payload = {
      equipe: dados.equipe || [],
      servicos: dados.servicos || [],
      maquinarios: dados.maquinarios || [],
      materiais: dados.materiais || [],
      ferramentas: dados.ferramentas || [],
      fotos: (dados.fotos || []).map((f: any) => ({
        id: "",
        filePath: f.url || "/fotos/default.jpg",
        caption: f.caption || "Foto dos revestimentos",
        category: "PROGRESS",
        uploadedAt: new Date().toISOString(),
      })),
    };

    try {
      const res = await fetch(`http://localhost:8080/coatings/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Relatório de Revestimentos enviado com sucesso!");
      } else {
        alert("Erro ao enviar o relatório. Tente novamente.");
      }
    } catch (err) {
      alert("Falha na conexão com o servidor.");
    }
  };

  return (
    <PhaseLayout
      phase={{ id: "revestimentos", nome: "Revestimentos", icon: Package, secoes }}
      onSave={handleSave}
    >
      <SecaoConteudo secaoId="equipe" faseId="revestimentos" />
      <SecaoConteudo secaoId="servicos" faseId="revestimentos" />
      <SecaoConteudo secaoId="maquinarios" faseId="revestimentos" />
      <SecaoConteudo secaoId="materiais" faseId="revestimentos" />
      <SecaoConteudo secaoId="ferramentas" faseId="revestimentos" />
      <SecaoConteudo secaoId="fotos" faseId="revestimentos" />
    </PhaseLayout>
  );
};
