// src/phases/FasePreparacaoTerreno.tsx
import { Calendar, Users, Wrench, Truck, Package, Camera } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";
import { useUserType } from "../contexts/UserTypeContext";

const secoes = [
  { id: "geral", nome: "Informações Gerais", icon: Calendar },
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FasePreparacaoTerreno = () => {
  const { customerId } = useUserType();

  const handleSave = async (dados: any) => {
    const payload = {
      geral: dados.geral || {},
      equipe: dados.equipe || [],
      servicos: dados.servicos || [],
      maquinarios: dados.maquinarios || [],
      materiais: dados.materiais || [],
      fotos: (dados.fotos || []).map((f: any) => ({
        id: "",
        filePath: f.url || "/fotos/default.jpg",
        caption: f.caption || "Foto da preparação do terreno",
        category: "PROGRESS",
        uploadedAt: new Date().toISOString(),
      })),
    };

    try {
      const res = await fetch(`http://localhost:8080/terrain-preparation/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Relatório da Preparação do Terreno enviado com sucesso!");
      } else {
        alert("Erro ao enviar o relatório. Tente novamente.");
      }
    } catch (err) {
      alert("Falha na conexão com o servidor.");
    }
  };

  return (
    <PhaseLayout
      phase={{ id: "preparacao", nome: "Preparação do Terreno", icon: Calendar, secoes }}
      onSave={handleSave}
    >
      <SecaoConteudo secaoId="geral" faseId="preparacao" />
      <SecaoConteudo secaoId="equipe" faseId="preparacao" />
      <SecaoConteudo secaoId="servicos" faseId="preparacao" />
      <SecaoConteudo secaoId="maquinarios" faseId="preparacao" />
      <SecaoConteudo secaoId="materiais" faseId="preparacao" />
      <SecaoConteudo secaoId="fotos" faseId="preparacao" />
    </PhaseLayout>
  );
};
