import { useState } from 'react';
import XSDUploader, { UploadedFile } from '../XSDUploader';

export default function XSDUploaderExample() {
  const [file, setFile] = useState<UploadedFile | null>(null);

  return <XSDUploader file={file} onFileChange={setFile} />;
}
