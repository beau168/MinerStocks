import { useCompanyFilterContext } from '../context/CompanyFilterContext';

export const useCompanyFilter = () => {
    return useCompanyFilterContext();
};
