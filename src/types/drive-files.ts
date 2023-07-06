export interface DriveFile {
  id: string;
  serviceId: string;
  mimeType: string;
  name: string;
  description: string;
  type: string;
  lastEditedUtc: number;
  iconUrl: string;
  url: string;
  embedUrl: string;
  sizeBytes: number;
  isShared: boolean;
}
