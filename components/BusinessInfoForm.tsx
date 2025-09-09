import React from 'react';
import { BusinessInfo } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface BusinessInfoFormProps {
  businessInfo: BusinessInfo;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
  isFormValid: boolean;
}

const FormField: React.FC<{ label: string; name: keyof BusinessInfo; value: string; placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, name, value, placeholder, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
    </div>
);


const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  businessInfo,
  onFormChange,
  onGenerate,
  onReset,
  isLoading,
  isFormValid,
}) => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Tell Us About Your Business</h2>
      <form className="space-y-4">
        <FormField label="Company Name" name="name" value={businessInfo.name} placeholder="e.g., InnovateTech" onChange={onFormChange} />
        <FormField label="Industry / Field" name="industry" value={businessInfo.industry} placeholder="e.g., Sustainable Energy Solutions" onChange={onFormChange} />
        <FormField label="Target Audience / Customers" name="audience" value={businessInfo.audience} placeholder="e.g., Eco-conscious homeowners" onChange={onFormChange} />
        <FormField label="Key Products / Services" name="services" value={businessInfo.services} placeholder="e.g., Smart solar panels, energy consulting" onChange={onFormChange} />
        <FormField label="What makes you unique?" name="usp" value={businessInfo.usp} placeholder="e.g., AI-powered energy optimization" onChange={onFormChange} />
        <FormField label="Desired Culture (in adjectives)" name="culture" value={businessInfo.culture} placeholder="e.g., Innovative, collaborative, customer-obsessed" onChange={onFormChange} />
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!isFormValid || isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2.5 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default BusinessInfoForm;