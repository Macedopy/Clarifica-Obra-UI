import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

// src/phases/FaseRevestimentos.tsx

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseRevestimentos = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Revestimentos", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/coatings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório de Revestimentos enviado!" : "Erro");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "revestimentos", nome: "Revestimentos", icon: Package, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="revestimentos" />
      <SecaoConteudo secaoId="servicos" faseId="revestimentos" />
      <SecaoConteudo secaoId="maquinarios" faseId="revestimentos" />
      <SecaoConteudo secaoId="materiais" faseId="revestimentos" />
      <SecaoConteudo secaoId="ferramentas" faseId="revestimentos" />
      <SecaoConteudo secaoId="fotos" faseId="revestimentos" />
    </PhaseLayout>
  );
};
