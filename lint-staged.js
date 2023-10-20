export default {
    '*.{js,jsx,ts,tsx}': [
        'eslint src --max-warnings=0',
        'bash -c tsc --noEmit',
        // 'react-scripts test --silent --bail --watchAll=false --findRelatedTests --passWithNoTests',
    ],
    '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
}
