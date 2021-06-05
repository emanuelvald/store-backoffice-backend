export type FileData = {
    processId: number
}

export interface FileEvent {
    newFile: (fileData: FileData) => void,
}
