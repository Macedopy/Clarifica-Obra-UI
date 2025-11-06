import { Calendar, Users, Wrench, Package, AlertTriangle, Camera, TrendingUp, CheckCircle, ChevronRight, Hammer, Truck } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { MateriaisUtilizados } from "./components/used-materials/used-materials";
import { FerramentasUtilizadas } from "./components/tools/tools";
import { MaquinariosUtilizados } from "./components/machinery/machinery";
import { EquipeUtilizada } from "./components/team-present/team-present";
import { ServicosExecutados } from "./components/executed-services/executed-services";
import { InformacoesGerais } from "./components/general/general-information";

const UserTypeContext = createContext({ isCustomer: false, loading: false });
const useUserType = () => useContext(UserTypeContext);
const UserTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const value = { isCustomer: false, loading: false };
  return <UserTypeContext.Provider value={value}>{children}</UserTypeContext.Provider>;
};

interface Phase {
  id: string;
  nome: string;
  icon: any;
  progresso: number;
  secoes: Array<{
    id: string;
    nome: string;
    icon: any;
    campos: string[];
  }>;
}

const PhasesContext = createContext<{
  phases: Phase[];
  updatePhaseProgress: (phaseId: string, progress: number) => void;
  currentPhase: string;
  setCurrentPhase: (id: string) => void;
}>({
  phases: [],
  updatePhaseProgress: () => { },
  currentPhase: '',
  setCurrentPhase: () => { }
});

const PhasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPhase, setCurrentPhase] = useState('preparacao');
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: 'preparacao',
      nome: 'Preparação do Terreno',
      icon: Calendar,
      progresso: 100,
      secoes: [
        { id: 'geral', nome: 'Informações Gerais', icon: Calendar, campos: ['Localização', 'Área do terreno', 'Topografia'] },
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Topógrafo', 'Operador de máquinas', 'Ajudantes'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Limpeza', 'Demarcação', 'Nivelamento', 'Terraplanagem'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Retroescavadeira', 'Trator', 'Compactador'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'fundacao',
      nome: 'Fundação',
      icon: Wrench,
      progresso: 100,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Engenheiro', 'Mestre de obras', 'Pedreiros', 'Armadores'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Escavação', 'Armação', 'Concretagem', 'Impermeabilização'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Betoneira', 'Vibrador de concreto', 'Guindaste'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Nível', 'Prumo', 'Trena', 'Cortador de ferro'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'estrutura',
      nome: 'Estrutura',
      icon: Package,
      progresso: 65,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Engenheiro estrutural', 'Carpinteiro', 'Armador', 'Pedreiros'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Montagem de formas', 'Armação', 'Concretagem', 'Cura do concreto'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Betoneira', 'Vibrador', 'Guindaste', 'Elevador de carga'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Serra', 'Martelete', 'Dobrador de ferro'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'alvenaria',
      nome: 'Alvenaria',
      icon: Wrench,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Pedreiros', 'Ajudantes', 'Mestre de obras'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Levantamento de paredes', 'Marcação de vãos', 'Vergas e contravergas'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Betoneira', 'Andaimes', 'Guincho'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Colher de pedreiro', 'Nível', 'Prumo', 'Esquadro', 'Linha'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'cobertura',
      nome: 'Cobertura',
      icon: Package,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Carpinteiros', 'Ajudantes', 'Telhadistas'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Estrutura do telhado', 'Instalação de telhas', 'Calhas e rufos'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Andaimes', 'Guincho'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Serra', 'Furadeira', 'Martelo', 'Escada'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'instalacoes-hidraulicas',
      nome: 'Inst. Hidráulicas',
      icon: Wrench,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Encanador', 'Ajudantes'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Tubulações água fria/quente', 'Esgoto', 'Caixas d\'água', 'Registros', 'Testes de pressão'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Furadeira', 'Martelete', 'Serra copo'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Arco de serra', 'Lixadeira de tubo', 'Prumo'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'instalacoes-eletricas',
      nome: 'Inst. Elétricas',
      icon: Wrench,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Eletricista', 'Ajudantes'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Eletrodutos', 'Fiação', 'Quadros elétricos', 'Pontos de luz/tomadas'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Furadeira', 'Martelete', 'Dobrador de eletrodutos'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Alicate', 'Chave de fenda', 'Testador de voltagem'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'revestimentos',
      nome: 'Revestimentos',
      icon: Package,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Pedreiros', 'Azulejistas', 'Gesseiros'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Reboco interno/externo', 'Contrapiso', 'Azulejos áreas molhadas', 'Gesso'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Betoneira', 'Andaimes', 'Niveladora de piso (laser)'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Colher', 'Desempenadeira', 'Cortador de azulejo', 'Nível a laser'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'acabamentos',
      nome: 'Acabamentos',
      icon: Package,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Pintores', 'Instaladores de piso', 'Serralheiros', 'Vidraceiros', 'Marceneiros'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Pintura', 'Instalação de pisos', 'Portas e janelas', 'Louças', 'Metais'] },
        { id: 'maquinarios', nome: 'Maquinários', icon: Truck, campos: ['Compressor de ar', 'Serra elétrica'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'ferramentas', nome: 'Ferramentas', icon: Hammer, campos: ['Rolos', 'Pincéis', 'Espátulas', 'Cortador de piso'] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] }
      ]
    },
    {
      id: 'finalizacao',
      nome: 'Finalização',
      icon: CheckCircle,
      progresso: 0,
      secoes: [
        { id: 'equipe', nome: 'Equipe', icon: Users, campos: ['Equipe de limpeza', 'Paisagista', 'Eletricista (testes)'] },
        { id: 'servicos', nome: 'Serviços', icon: Wrench, campos: ['Limpeza final', 'Testes de instalações', 'Paisagismo'] },
        { id: 'materiais', nome: 'Materiais', icon: Package, campos: [] },
        { id: 'observacoes', nome: 'Observações', icon: AlertTriangle, campos: [] },
        { id: 'fotos', nome: 'Fotos', icon: Camera, campos: [] },
        { id: 'resumo', nome: 'Resumo Final', icon: TrendingUp, campos: [] }
      ]
    },
  ]);

  const updatePhaseProgress = (phaseId: string, progress: number) => {
    setPhases(prev => prev.map(phase =>
      phase.id === phaseId ? { ...phase, progresso: progress } : phase
    ));
  };

  return (
    <PhasesContext.Provider value={{ phases, updatePhaseProgress, currentPhase, setCurrentPhase }}>
      {children}
    </PhasesContext.Provider>
  );
};

const usePhases = () => useContext(PhasesContext);

const PhasesBreadcrumb = () => {
  const { phases, currentPhase, setCurrentPhase } = usePhases();

  return (
    <div className="bg-white shadow-md overflow-x-auto">
      <div className="flex items-center p-4 min-w-max">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const completed = phase.progresso === 100;
          const current = phase.id === currentPhase;

          return (
            <div key={phase.id} className="flex items-center">
              <button
                onClick={() => setCurrentPhase(phase.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${current
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : completed
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {completed && <CheckCircle size={16} />}
                <Icon size={18} />
                <div className="text-left">
                  <div className="text-sm font-semibold whitespace-nowrap">{phase.nome}</div>
                  <div className="text-xs">{phase.progresso}%</div>
                </div>
              </button>
              {index < phases.length - 1 && (
                <ChevronRight className="mx-2 text-gray-400" size={20} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SecaoConteudo = ({ secao, isReadOnly, faseId }: { secao: any, isReadOnly: boolean, faseId: string }) => {
  if (secao.id === 'fotos') {
    return (
      <div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
          <Camera className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-600">Clique para adicionar fotos</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Foto 1</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Foto 2</span>
          </div>
        </div>
      </div>
    );
  }

  if (secao.id === 'observacoes') {
    return (
      <div>
        <textarea
          className="w-full p-3 border rounded h-32 mb-4"
          placeholder="Adicione observações e pendências desta fase..."
          disabled={isReadOnly}
        />
        <div className="space-y-2">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <div className="font-semibold text-sm">Pendência exemplo</div>
            <div className="text-xs text-gray-600">Aguardando material chegar</div>
          </div>
        </div>
      </div>
    );
  }

  if (secao.id === 'resumo') {
    return <ResumoDashboard isReadOnly={isReadOnly} />;
  }

  if (secao.id === 'materiais') {
    return <MateriaisUtilizados isReadOnly={isReadOnly} faseId={faseId} />;
  }

  if (secao.id === 'ferramentas') {
    return <FerramentasUtilizadas isReadOnly={isReadOnly} faseId={faseId} />;
  }

  if (secao.id === 'maquinarios') {
    return <MaquinariosUtilizados isReadOnly={isReadOnly} faseId={faseId} />;
  }

  if (secao.id === 'equipe') {
    return <EquipeUtilizada isReadOnly={isReadOnly} faseId={faseId} />;
  }

  if (secao.id === 'servicos') {
    return <ServicosExecutados isReadOnly={isReadOnly} faseId={faseId} />;
  }

  if (secao.id === 'geral') {
    return <InformacoesGerais isReadOnly={isReadOnly} faseId={faseId} />;
  }

  return (
    <div className="space-y-4">
      {secao.campos.map((campo: string, idx: number) => (
        <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">{campo}</label>
            <input type="checkbox" className="w-5 h-5" disabled={isReadOnly} />
          </div>
        </div>
      ))}
    </div>
  );
};

const CurrentPhaseContent = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { phases, currentPhase, updatePhaseProgress } = usePhases();
  const [secaoAtiva, setSecaoAtiva] = useState(0);

  const phase = phases.find(p => p.id === currentPhase);
  if (!phase) return null;

  const secaoAtual = phase.secoes[secaoAtiva];

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Fase: {phase.nome}</h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{phase.progresso}%</div>
            <div className="text-sm text-gray-500">Conclusão</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso da Fase</span>
            <span className="font-semibold">{phase.progresso}% completo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${phase.progresso === 100 ? 'bg-green-500' : 'bg-blue-600'
                }`}
              style={{ width: `${phase.progresso}%` }}
            />
          </div>
        </div>

        {!isReadOnly && (
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Atualizar progresso:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={phase.progresso}
              onChange={(e) => updatePhaseProgress(phase.id, Number(e.target.value))}
              className="flex-1"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={phase.progresso}
              onChange={(e) => updatePhaseProgress(phase.id, Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </div>
        )}

        {phase.progresso === 100 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-green-700 font-medium">Fase concluída!</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {phase.secoes.map((secao, index) => {
          const Icon = secao.icon;
          return (
            <button
              key={secao.id}
              onClick={() => setSecaoAtiva(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${secaoAtiva === index
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
            >
              <Icon size={18} />
              {secao.nome}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          {(() => {
            const Icon = secaoAtual.icon;
            return <Icon size={24} />;
          })()}
          {secaoAtual.nome}
        </h3>
        <SecaoConteudo secao={secaoAtual} isReadOnly={isReadOnly} faseId={phase.id} />
      </div>
    </div>
  );
};

const ResumoDashboard = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { phases } = usePhases();
  const progressoGeral = Math.round(phases.reduce((acc, p) => acc + p.progresso, 0) / phases.length);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progresso Geral da Obra</span>
          <span className="text-2xl font-bold text-blue-600">{progressoGeral}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progressoGeral}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">
            {phases.filter(p => p.progresso === 100).length}
          </div>
          <div className="text-sm text-gray-600">Fases Concluídas</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {phases.filter(p => p.progresso > 0 && p.progresso < 100).length}
          </div>
          <div className="text-sm text-gray-600">Em Andamento</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-3xl font-bold text-gray-600">
            {phases.filter(p => p.progresso === 0).length}
          </div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </div>
      </div>

      <div className="p-4 bg-white border rounded-lg">
        <h4 className="font-semibold mb-3">Timeline das Fases</h4>
        <div className="space-y-2">
          {phases.map(phase => (
            <div key={phase.id} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${phase.progresso === 100 ? 'bg-green-500' :
                phase.progresso > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                }`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{phase.nome}</div>
                <div className="text-xs text-gray-500">{phase.progresso}% concluído</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isCustomer, loading } = useUserType();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Sistema de Gerenciamento de Obra</h1>
        <p className="text-center text-sm mt-1 opacity-90">Controle completo de todas as fases da construção</p>      </div>

      <PhasesBreadcrumb />

      <div className="container mx-auto p-4">
        <CurrentPhaseContent isReadOnly={isCustomer} />

        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition">
            Salvar Rascunho
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Enviar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export const App = () => (
  <UserTypeProvider>
    <PhasesProvider>
      <AppContent />
    </PhasesProvider>
  </UserTypeProvider>
);
