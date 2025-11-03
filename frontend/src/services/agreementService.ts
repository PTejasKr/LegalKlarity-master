import type { AgreementProcess, AgreementSummary } from "../types";
import api from "../utils/baseApi";

export const agreementService = {
    async agreementProcess(data: AgreementProcess): Promise<AgreementProcess> {
        const response = await api.post('/api/v1/agreements/agreement-process', data);
        return response.data;
    },

    async agreementSummary(file: File, uid: string, targetGroup: string, language: string): Promise<AgreementSummary> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', uid);
        formData.append('targetGroup', targetGroup);
        formData.append('language', language);

        const response = await api.post('/api/v1/agreements/agreement-summary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    async enhancedDocumentAnalysis(file: File, uid: string, targetGroup: string, language: string): Promise<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', uid);
        formData.append('targetGroup', targetGroup);
        formData.append('language', language);

        // Call the enhanced analysis endpoint directly
        const response = await api.post('/api/v1/agreements/enhanced-analysis', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }
}

