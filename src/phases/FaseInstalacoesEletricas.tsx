// src/phases/FaseInstalacoesEletricas.tsx
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

export const FaseInstalacoesEletricas = () => {
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
        caption: f.caption || "Foto das instalações elétricas",
        category: "PROGRESS",
        uploadedAt: new Date().toISOString(),
      })),
    };

    try {
      const res = await fetch(`http://localhost:8080/eletric/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Relatório Elétrico enviado com sucesso!");
      } else {
        alert("Erro ao enviar o relatório. Tente novamente.");
      }
    } catch (err) {
      alert("Falha na conexão com o servidor.");
    }
  };

  return (
    <PhaseLayout
      phase={{ id: "instalacoes-eletricas", nome: "Inst. Elétricas", icon: Wrench, secoes }}
      onSave={handleSave}
    >
      <SecaoConteudo secaoId="equipe" faseId="instalacoes-eletricas" />
      <SecaoConteudo secaoId="servicos" faseId="instalacoes-eletricas" />
      <SecaoConteudo secaoId="maquinarios" faseId="instalacoes-eletricas" />
      <SecaoConteudo secaoId="materiais" faseId="instalacoes-eletricas" />
      <SecaoConteudo secaoId="ferramentas" faseId="instalacoes-eletricas" />
      <SecaoConteudo secaoId="fotos" faseId="instalacoes-eletricas" />
    </PhaseLayout>
  );
};
