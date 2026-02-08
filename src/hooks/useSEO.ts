import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
}

export const useSEO = ({ title, description }: SEOProps) => {
    useEffect(() => {
        // Update Title
        document.title = title;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);
    }, [title, description]);
};
