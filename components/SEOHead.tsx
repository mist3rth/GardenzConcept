import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title: string;
    description: string;
    schema?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, schema }) => {
    const location = useLocation();

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

        // Update Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', window.location.href);

        // Inject Schema.org JSON-LD
        if (schema) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(schema);
        }

        // Cleanup function
        return () => {
            // Optional: Reset title or description on unmount if needed
        };
    }, [title, description, schema, location]);

    return null;
};
