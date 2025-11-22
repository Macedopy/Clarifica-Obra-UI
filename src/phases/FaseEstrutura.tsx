// src/phases/FaseEstrutura.tsx
import { Package, Users, Wrench, Truck, Hammer, Camera } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseEstrutura = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Estrutura - Pilares e Lajes", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/structure", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório da Estrutura enviado!" : "Erro ao enviar");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "estrutura", nome: "Estrutura", icon: Package, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="estrutura" />
      <SecaoConteudo secaoId="servicos" faseId="estrutura" />
      <SecaoConteudo secaoId="maquinarios" faseId="estrutura" />
      <SecaoConteudo secaoId="materiais" faseId="estrutura" />
      <SecaoConteudo secaoId="ferramentas" faseId="estrutura" />
      <SecaoConteudo secaoId="fotos" faseId="estrutura" />
    </PhaseLayout>
  );
};
