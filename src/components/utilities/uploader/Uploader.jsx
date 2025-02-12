import React from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  customRequest({ file, onSuccess }) {
    // Simular el éxito de la subida después de un retraso de 1 segundo
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Uploader = () => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
      <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">Haz clic o arrastra un archivo a esta área para subirlo</p>
      <p className="ant-upload-hint">
        Soporte para carga de archivos individual o múltiple.
      </p>
    </Dragger>
  );
};

export default Uploader;
