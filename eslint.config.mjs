import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    rules: {
      // framework policies (TestPilot): no hard waits, no focused tests
      'no-restricted-syntax': ['error', { selector: "CallExpression[callee.property.name='waitForTimeout']", message: 'Use web-first assertions or wait for a concrete signal instead of a fixed sleep.' }],
      'no-restricted-properties': ['error', { object: 'test', property: 'only', message: 'Do not commit focused tests.' }],
    },
  },
  { ignores: ['reports/**', 'test-results/**', 'node_modules/**', '.features-gen/**'] },
);
