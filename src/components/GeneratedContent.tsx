import React, { useState } from 'react';
import { GeneratedContentData, CoreValue } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    </div>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-1.5 text-gray-500 bg-gray-100 rounded-bl-md rounded-tr-lg hover:bg-gray-200 hover:text-gray-800 transition"
            aria-label="Copy to clipboard"
        >
            <ClipboardIcon className="w-5 h-5" />
            {copied && <span className="absolute -top-7 right-0 text-xs bg-green-500 text-white px-2 py-0.5 rounded">Copied!</span>}
        </button>
    );
};


const GeneratedContent: React.FC<{ content: GeneratedContentData | null; isLoading: boolean; error: string | null; }> = ({ content, isLoading, error }) => {
    const formatCoreValuesForCopy = (values: CoreValue[]) => {
        return values.map(v => `${v.value}: ${v.description}`).join('\n');
    };

    return (
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg mt-8 lg:mt-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Your Strategic Foundation</h2>
            <div className="min-h-[300px] bg-gray-50/70 p-6 rounded-lg relative">
                {isLoading && <SkeletonLoader />}
                {error && <div className="text-red-500 text-center flex items-center justify-center h-full">{error}</div>}
                {!isLoading && !error && !content && (
                    <div className="text-gray-500 text-center flex flex-col items-center justify-center h-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Your generated mission and values will appear here.
                    </div>
                )}
                {content && (
                    <div className="space-y-6">
                        <div className="relative">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-2">Mission Statement</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">{content.missionStatement}</p>
                            <CopyButton textToCopy={content.missionStatement} />
                        </div>
                        <div className="relative">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-2">Core Values</h3>
                            <ul className="space-y-3">
                                {content.coreValues.map((coreValue, index) => (
                                    <li key={index} className="p-3 bg-white border border-gray-200 rounded-md">
                                        <p className="font-semibold text-gray-800">{coreValue.value}</p>
                                        <p className="text-gray-600">{coreValue.description}</p>
                                    </li>
                                ))}
                            </ul>
                            <CopyButton textToCopy={formatCoreValuesForCopy(content.coreValues)} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GeneratedContent;
