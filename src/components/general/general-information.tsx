import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface InformacoesGeraisData {
    nomeObra: string;
    endereco: string;
    data: string;
    periodo: string;
    clima: string;
    temperatura: string;
}

export const InformacoesGerais: React.FC = () => {
    const [dados, setDados] = useState<InformacoesGeraisData>({
        nomeObra: '',
        endereco: '',
        data: '',
        periodo: '',
        clima: '',
        temperatura: ''
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
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Data do Relatório</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            value={dados.data}
                            onChange={(e) => setDados({ ...dados, data: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Período</label>
                        <select
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            value={dados.periodo}
                            onChange={(e) => setDados({ ...dados, periodo: e.target.value })}
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
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Salvar Informações
                </button>
            </form>
        </div>
    );
};