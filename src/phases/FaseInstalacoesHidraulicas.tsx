import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

// src/phases/FaseInstalacoesHidraulicas.tsx

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseInstalacoesHidraulicas = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Instalações Hidráulicas", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/plumbing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório Hidráulico enviado!" : "Erro");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "instalacoes-hidraulicas", nome: "Inst. Hidráulicas", icon: Wrench, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="instalacoes-hidraulicas" />
      <SecaoConteudo secaoId="servicos" faseId="instalacoes-hidraulicas" />
      <SecaoConteudo secaoId="maquinarios" faseId="instalacoes-hidraulicas" />
      <SecaoConteudo secaoId="materiais" faseId="instalacoes-hidraulicas" />
      <SecaoConteudo secaoId="ferramentas" faseId="instalacoes-hidraulicas" />
      <SecaoConteudo secaoId="fotos" faseId="instalacoes-hidraulicas" />
    </PhaseLayout>
  );
};
