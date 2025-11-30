import { Camera, Hammer, Package, Truck, Users, Wrench } from "lucide-react";
import { PhaseLayout } from "../components/PhaseLayout";
import { SecaoConteudo } from "../components/SecaoConteudo";
import { useUserType } from "../contexts/UserTypeContext";

// src/phases/FaseAcabamentos.tsx

const secoes = [
  { id: "equipe", nome: "Equipe", icon: Users },
  { id: "servicos", nome: "Serviços", icon: Wrench },
  { id: "maquinarios", nome: "Maquinários", icon: Truck },
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "ferramentas", nome: "Ferramentas", icon: Hammer },
  { id: "fotos", nome: "Fotos", icon: Camera },
];

export const FaseAcabamentos = () => {
  const { customerId } = useUserType();

  const handleSave = async (dados: any) => {
    const payload = { phaseName: "Acabamentos Finais", contractor: "Construtora Clarifica", ...dados };
    try {
      const res = await fetch(`http://localhost:8080/finishing/${customerId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      alert(res.ok ? "Relatório de Acabamentos enviado!" : "Erro");
    } catch { alert("Falha na conexão"); }
  };

  return (
    <PhaseLayout phase={{ id: "acabamentos", nome: "Acabamentos", icon: Package, secoes }} onSave={handleSave}>
      <SecaoConteudo secaoId="equipe" faseId="acabamentos" />
      <SecaoConteudo secaoId="servicos" faseId="acabamentos" />
      <SecaoConteudo secaoId="maquinarios" faseId="acabamentos" />
      <SecaoConteudo secaoId="materiais" faseId="acabamentos" />
      <SecaoConteudo secaoId="ferramentas" faseId="acabamentos" />
      <SecaoConteudo secaoId="fotos" faseId="acabamentos" />
    </PhaseLayout>
  );
};
