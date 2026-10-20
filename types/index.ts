/** Shared types for the framework. */
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export interface TestMeta { id: string; source: string; priority: Priority; tags: string[] }
