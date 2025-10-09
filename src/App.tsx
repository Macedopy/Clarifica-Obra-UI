import { Calendar, Users, Wrench, Package, AlertTriangle, Camera, TrendingUp } from "lucide-react";
import { useState } from "react";
import { ServicosExecutados } from "./components/executed-services/executed-services";
import { InformacoesGerais } from "./components/general/general-information";
import { EquipePresente } from "./components/team-present/team-present";
import { MateriaisUtilizados } from "./components/used-materials/used-materials";
import { ResumoDashboard } from "./components/dashboard/dashboard";
import { ObservacoesPendencias } from "./components/observation/observation";
import { FotosRegistros } from "./components/photos/photos";

export const App = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('geral');

  const secoes = [
    { id: 'geral', nome: 'Informações Gerais', icon: Calendar },
    { id: 'equipe', nome: 'Equipe', icon: Users },
    { id: 'servicos', nome: 'Serviços', icon: Wrench },
    { id: 'materiais', nome: 'Materiais', icon: Package },
    { id: 'observacoes', nome: 'Observações', icon: AlertTriangle },
    { id: 'fotos', nome: 'Fotos', icon: Camera },
    { id: 'resumo', nome: 'Resumo', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Sistema de Gerenciamento de Obra</h1>
      </div>
      
      <div className="flex flex-wrap gap-2 p-4 bg-white shadow">
        {secoes.map((secao) => {
          const Icon = secao.icon;
          return (
            <button
              key={secao.id}
              onClick={() => setSecaoAtiva(secao.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                secaoAtiva === secao.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <Icon size={20} />
              {secao.nome}
            </button>
          );
        })}
      </div>
      
      <div className="container mx-auto p-4">
        {secaoAtiva === 'geral' && <InformacoesGerais />}
        {secaoAtiva === 'equipe' && <EquipePresente />}
        {secaoAtiva === 'servicos' && <ServicosExecutados />}
        {secaoAtiva === 'materiais' && <MateriaisUtilizados />}
        {secaoAtiva === 'observacoes' && <ObservacoesPendencias />}
        {secaoAtiva === 'fotos' && <FotosRegistros />}
        {secaoAtiva === 'resumo' && <ResumoDashboard />}
        
        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
            Salvar Rascunho
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Enviar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};