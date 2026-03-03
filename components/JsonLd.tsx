import React from 'react';

interface JsonLdProps {
  data: object;
}

/**
 * Helper component to inject JSON-LD schema into the head.
 * 
 * @param {object} data - The Schema.org data object.
 * @returns {null}
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
