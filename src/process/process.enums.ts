
export enum ProcessStatus {
    'pending' = 'pending',
    'in-progress' = 'in-progress',
    'cancelled' = 'cancelled',
    'failed' = 'failed',
    'complete' = 'complete'
}
export type ProcessStatusStrings = keyof typeof ProcessStatus;