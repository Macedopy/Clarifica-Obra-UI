import { InformacoesGeraisData } from "../components/general/general-information";

export const GeneralInformationService = {
    async get(): Promise<InformacoesGeraisData> {
        // Exemplo de fetch, ajuste a URL conforme sua API
        const response = await fetch("/api/general-information", {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Erro ao buscar informações gerais");
        return response.json();
    },
};
