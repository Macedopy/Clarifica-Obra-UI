import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

// src/phases/FaseCobertura.tsx

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseCobertura = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Cobertura - Telhado", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/roofing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório da Cobertura enviado!" : "Erro");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "cobertura", nome: "Cobertura", icon: Package, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="cobertura" />
      <SecaoConteudo secaoId="servicos" faseId="cobertura" />
      <SecaoConteudo secaoId="maquinarios" faseId="cobertura" />
      <SecaoConteudo secaoId="materiais" faseId="cobertura" />
      <SecaoConteudo secaoId="ferramentas" faseId="cobertura" />
      <SecaoConteudo secaoId="fotos" faseId="cobertura" />
    </PhaseLayout>
  );
};
