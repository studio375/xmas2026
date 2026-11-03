import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
    ...nextVitals,
    globalIgnores(['dist/**', 'out/**', 'next-env.d.ts', 'src/addons/**']),
]);
