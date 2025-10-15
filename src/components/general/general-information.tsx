import React, { useState, useEffect } from 'react';
import { GeneralInformationService } from '../../services/general-information.service';
import { Calendar } from 'lucide-react';

export interface InformacoesGeraisData {
    nomeObra: string;
    endereco: string;
    data: string;
    periodo: string;
    clima: string;
    temperatura: string;
}

interface InformacoesGeraisProps {
    isReadOnly?: boolean;
}

export const InformacoesGerais: React.FC<InformacoesGeraisProps> = ({ isReadOnly }) => {
    const [dados, setDados] = useState<InformacoesGeraisData>({
        nomeObra: '',
        endereco: '',
        data: '',
        periodo: '',
        clima: '',
        temperatura: ''
    });


    isReadOnly ?? GeneralInformationService.get()
        .then(data => {
            if (data) setDados(data);
        })
        .catch(() => {
            // Em caso de erro, mantém o estado padrão
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados salvos:', dados);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <Calendar className="mr-2 text-blue-600" />
                <h2 className="text-2xl font-bold">Informações Gerais da Obra</h2>
            </div>

            {isReadOnly ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nome da Obra</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.nomeObra || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Endereço</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.endereco || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Data do Relatório</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.data || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Período</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.periodo || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Condições Climáticas</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.clima || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Temperatura (°C)</label>
                        <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                            {dados.temperatura || <span className="text-gray-400">Não informado</span>}
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome da Obra</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.nomeObra}
                                onChange={(e) => setDados({ ...dados, nomeObra: e.target.value })}
                                placeholder="Ex: Edifício Residencial São Paulo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Endereço</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.endereco}
                                onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
                                placeholder="Rua, número, bairro"
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Data do Relatório</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.data}
                                onChange={(e) => setDados({ ...dados, data: e.target.value })}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Período</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.periodo}
                                onChange={(e) => setDados({ ...dados, periodo: e.target.value })}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            >
                                <option value="">Selecione</option>
                                <option value="manha">Manhã</option>
                                <option value="tarde">Tarde</option>
                                <option value="dia_completo">Dia Completo</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Condições Climáticas</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.clima}
                                onChange={(e) => setDados({ ...dados, clima: e.target.value })}
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            >
                                <option value="">Selecione</option>
                                <option value="sol">☀️ Sol</option>
                                <option value="nublado">⛅ Nublado</option>
                                <option value="chuva">🌧️ Chuva</option>
                                <option value="chuva_forte">⛈️ Chuva Forte</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Temperatura (°C)</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={dados.temperatura}
                                onChange={(e) => setDados({ ...dados, temperatura: e.target.value })}
                                placeholder="Ex: 28"
                                disabled={isReadOnly}
                                unselectable={isReadOnly ? 'on' : 'off'}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        disabled={isReadOnly}
                        unselectable={isReadOnly ? 'on' : 'off'}
                    >
                        Salvar Informações
                    </button>
                </form>
            )}
        </div>
    );
};