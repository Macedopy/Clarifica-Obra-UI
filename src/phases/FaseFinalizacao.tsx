// src/phases/FaseFinalizacao.tsx
import { CheckCircle, Users, Wrench, Package, AlertTriangle, Camera, TrendingUp } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { ResumoDashboard } from "../components/ResumoDashboard";
import { SecaoConteudo } from "../components/SecaoConteudo";

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "observacoes", nome: "Observações", icon: AlertTriangle },
  { id: "fotos", nome: "Fotos", icon: Camera },
  { id: "resumo", nome: "Resumo Final", icon: TrendingUp },
];

export const FaseFinalizacao = () => {
  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Finalização e Entrega da Obra", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch("http://localhost:8080/completion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Obra finalizada e relatório enviado com sucesso!" : "Erro ao finalizar obra");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "finalizacao", nome: "Finalização", icon: CheckCircle, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="finalizacao" />
      <SecaoConteudo secaoId="servicos" faseId="finalizacao" />
      <SecaoConteudo secaoId="materiais" faseId="finalizacao" />
      <SecaoConteudo secaoId="observacoes" faseId="finalizacao" />
      <SecaoConteudo secaoId="fotos" faseId="finalizacao" />
      <ResumoDashboard />
    </PhaseLayout>
  );
};
