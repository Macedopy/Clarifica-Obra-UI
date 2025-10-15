
import React, { useState, useEffect } from 'react';
import { ExecutedServices } from '../../services/executed-services.service';
import { Wrench, X } from 'lucide-react';


export interface ServicoItem {
    id: string;
    tipo: string;
    descricao: string;
    local: string;
    quantidade: number;
    unidade: string;
    percentual: number;
    status: string;
}

interface ServicosExecutadosProps {
    isReadOnly?: boolean;
}


export const ServicosExecutados: React.FC<ServicosExecutadosProps> = ({ isReadOnly = false }) => {
    const [servicos, setServicos] = useState<ServicoItem[]>([
        {
            id: '1',
            tipo: '',
            descricao: '',
            local: '',
            quantidade: 0,
            unidade: '',
            percentual: 0,
            status: ''
        }
    ]);

    isReadOnly ?? ExecutedServices.getAll()
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setServicos(data);
            }
        })
        .catch(() => {
            // Em caso de erro, mantém o estado padrão
        });

    const adicionarServico = () => {
        const novoId = Date.now().toString();
        setServicos([
            ...servicos,
            {
                id: novoId,
                tipo: '',
                descricao: '',
                local: '',
                quantidade: 0,
                unidade: '',
                percentual: 0,
                status: ''
            }
        ]);
    };

    const removerServico = (id: string) => {
        setServicos(servicos.filter(item => item.id !== id));
    };

    const atualizarServico = (id: string, campo: keyof ServicoItem, valor: string | number) => {
        setServicos(servicos.map(item =>
            item.id === id ? { ...item, [campo]: valor } : item
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Wrench className="mr-2 text-orange-600" />
                    <h2 className="text-2xl font-bold">Serviços Executados</h2>
                </div>
                    <button
                        onClick={adicionarServico}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                        disabled={isReadOnly}
                        unselectable={isReadOnly ? 'on' : 'off'}
                    >
                        + Adicionar Serviço
                    </button>
            </div>

            {servicos.map((servico) => (
                <div key={servico.id} className="border p-4 rounded mb-4 bg-gray-50 relative">
                        <button
                            onClick={() => removerServico(servico.id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                            disabled={isReadOnly}
                            unselectable={isReadOnly ? 'on' : 'off'}
                        >
                            <X size={20} />
                        </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Serviço</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                value={servico.tipo}
                                onChange={(e) => atualizarServico(servico.id, 'tipo', e.target.value)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            >
                                <option value="">Selecione</option>
                                <optgroup label="Fundação e Estrutura">
                                    <option value="escavacao">Escavação/Terraplanagem</option>
                                    <option value="fundacao">Fundação</option>
                                    <option value="concretagem">Concretagem</option>
                                    <option value="armacao">Armação</option>
                                    <option value="forma">Forma</option>
                                </optgroup>
                                <optgroup label="Alvenaria">
                                    <option value="alvenaria">Alvenaria de blocos</option>
                                    <option value="alvenaria_estrutural">Alvenaria estrutural</option>
                                    <option value="drywall">Drywall</option>
                                </optgroup>
                                <optgroup label="Revestimentos">
                                    <option value="chapisco">Chapisco</option>
                                    <option value="reboco">Emboço/Reboco</option>
                                    <option value="massa">Massa corrida</option>
                                    <option value="ceramica">Cerâmica/Porcelanato</option>
                                    <option value="pintura">Pintura</option>
                                    <option value="gesso">Gesso</option>
                                </optgroup>
                                <optgroup label="Instalações">
                                    <option value="hidraulica">Hidráulica</option>
                                    <option value="eletrica">Elétrica</option>
                                </optgroup>
                                <optgroup label="Esquadrias">
                                    <option value="portas">Portas</option>
                                    <option value="janelas">Janelas</option>
                                </optgroup>
                                <optgroup label="Cobertura">
                                    <option value="telhado">Estrutura telhado</option>
                                    <option value="telhas">Telhas</option>
                                    <option value="impermeabilizacao">Impermeabilização</option>
                                </optgroup>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Descrição Detalhada</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                placeholder="Ex: Alvenaria parede sala"
                                value={servico.descricao}
                                onChange={(e) => atualizarServico(servico.id, 'descricao', e.target.value)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Local/Ambiente</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                placeholder="Ex: Pavimento térreo - Sala"
                                value={servico.local}
                                onChange={(e) => atualizarServico(servico.id, 'local', e.target.value)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Quantidade Executada</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                placeholder="Ex: 25"
                                value={servico.quantidade || ''}
                                onChange={(e) => atualizarServico(servico.id, 'quantidade', parseFloat(e.target.value) || 0)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Unidade de Medida</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                value={servico.unidade}
                                onChange={(e) => atualizarServico(servico.id, 'unidade', e.target.value)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            >
                                <option value="">Selecione</option>
                                <option value="m2">m²</option>
                                <option value="m3">m³</option>
                                <option value="m">m</option>
                                <option value="unidade">Unidade</option>
                                <option value="vao">Vão</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                % Conclusão: <span className="font-bold">{servico.percentual}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full"
                                value={servico.percentual}
                                onChange={(e) => atualizarServico(servico.id, 'percentual', parseInt(e.target.value))}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                value={servico.status}
                                onChange={(e) => atualizarServico(servico.id, 'status', e.target.value)}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            >
                                <option value="">Selecione</option>
                                <option value="iniciado">Iniciado</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="concluido">Concluído</option>
                                <option value="paralisado">Paralisado</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};