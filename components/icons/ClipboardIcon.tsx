
import React from 'react';

const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.042m-7.332 0c-.055-.194-.084-.4-.084-.612v-3.042M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5M4.5 20.25h15A2.25 2.25 0 0021.75 18V9.75A2.25 2.25 0 0019.5 7.5h-15A2.25 2.25 0 002.25 9.75v8.25A2.25 2.25 0 004.5 20.25z" />
    </svg>
);

export default ClipboardIcon;
