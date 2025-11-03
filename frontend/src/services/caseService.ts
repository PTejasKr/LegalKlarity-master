import api from "../utils/baseApi";

export const caseService = {
    async searchCase(query: string): Promise<any> {
        const response = await api.post("/api/v1/cases/search-cases", { query });
        return response.data;
    },

    async caseSummary(tid: string): Promise<any> {
        const response = await api.post("/api/v1/cases/case-summary", { tid });
        return response.data;
    }
};

