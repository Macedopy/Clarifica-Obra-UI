import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

// src/phases/FaseAlvenaria.tsx

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseAlvenaria = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Alvenaria - Paredes e Divisórias", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/masonry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório da Alvenaria enviado!" : "Erro");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "alvenaria", nome: "Alvenaria", icon: Wrench, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="alvenaria" />
      <SecaoConteudo secaoId="servicos" faseId="alvenaria" />
      <SecaoConteudo secaoId="maquinarios" faseId="alvenaria" />
      <SecaoConteudo secaoId="materiais" faseId="alvenaria" />
      <SecaoConteudo secaoId="ferramentas" faseId="alvenaria" />
      <SecaoConteudo secaoId="fotos" faseId="alvenaria" />
    </PhaseLayout>
  );
};
