// src/phases/FaseFundacao.tsx
import { Wrench, Users, Truck, Package, Hammer, Camera } from "lucide-react";
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

export const FaseFundacao = () => {
  const handleSave = async (dados: any) => {
    const payload = {
      phaseName: "Fundação - Bloco Principal",
      contractor: "Construtora Bruno",
      equipe: dados.equipe || [],
      servicos: dados.servicos || [],
      maquinarios: dados.maquinarios || [],
      materiais: dados.materiais || [],
      ferramentas: dados.ferramentas || [],
      fotos: (dados.fotos || []).map((f: any) => ({
        id: "",
        filePath: f.url || "/fotos/default.jpg",
        caption: f.caption || "Foto da fundação",
        category: "PROGRESS",
        uploadedAt: new Date().toISOString(),
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/foundation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Relatório da Fundação enviado com sucesso!");
      } else {
        alert("Erro ao enviar o relatório. Tente novamente.");
      }
    } catch (err) {
      alert("Falha na conexão com o servidor.");
    }
  };

  return (
    <PhaseLayout
      phase={{ id: "fundacao", nome: "Fundação", icon: Wrench, secoes }}
      onSave={handleSave}
    >
      <SecaoConteudo secaoId="equipe" faseId="fundacao" />
      <SecaoConteudo secaoId="servicos" faseId="fundacao" />
      <SecaoConteudo secaoId="maquinarios" faseId="fundacao" />
      <SecaoConteudo secaoId="materiais" faseId="fundacao" />
      <SecaoConteudo secaoId="ferramentas" faseId="fundacao" />
      <SecaoConteudo secaoId="fotos" faseId="fundacao" />
    </PhaseLayout>
  );
};
