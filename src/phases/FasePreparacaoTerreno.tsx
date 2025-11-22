// src/phases/FasePreparacaoTerreno.tsx
import { Calendar, Users, Wrench, Truck, Package, Camera } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";

const secoes = [
  { id: "geral", nome: "Informações Gerais", icon: Calendar },
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FasePreparacaoTerreno = () => {
  const handleSave = async (dados: any) => {
    const payload = {
      phaseName: "Preparação do Terreno",
      contractor: "Construtora Clarifica",
      ...dados
    };

    try {
      const res = await fetch("http://localhost:8080/terrain-preparation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert(res.ok ? "Relatório da Preparação do Terreno enviado com sucesso!" : "Erro ao enviar relatório");
    } catch {
      alert("Falha na conexão com o servidor");
    }
  };

  return (
    <PhaseLayout phase={{ id: "preparacao", nome: "Preparação do Terreno", icon: Calendar, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="geral" faseId="preparacao" />
      <SecaoConteudo secaoId="equipe" faseId="preparacao" />
      <SecaoConteudo secaoId="servicos" faseId="preparacao" />
      <SecaoConteudo secaoId="maquinarios" faseId="preparacao" />
      <SecaoConteudo secaoId="materiais" faseId="preparacao" />
      <SecaoConteudo secaoId="fotos" faseId="preparacao" />
    </PhaseLayout>
  );
};
