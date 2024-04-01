import { VscFilePdf, VscFileZip, VscFile } from "react-icons/vsc";
import type { CommonProps } from "@/types/common";

const BYTE = 1000;
const getKB = (bytes: number) => Math.round(bytes / BYTE);

const FileIcon = ({ children }: CommonProps) => {
  return <span className="text-4xl">{children}</span>;
};

export interface FileItemProps extends CommonProps {
  file: File;
}

const FileItem = (props: FileItemProps) => {
  const { file, children } = props;
  const { type, name, size } = file;

  const renderThumbnail = () => {
    const isImageFile = type.split("/")[0] === "image";

    if (isImageFile) {
      return (
        <img
          className="upload-file-image"
          src={URL.createObjectURL(file)}
          alt={`file preview ${name}`}
        />
      );
    }

    if (type === "application/zip") {
      return (
        <FileIcon>
          <VscFileZip />
        </FileIcon>
      );
    }

    if (type === "application/pdf") {
      return (
        <FileIcon>
          <VscFilePdf />
        </FileIcon>
      );
    }

    return (
      <FileIcon>
        <VscFile />
      </FileIcon>
    );
  };

  return (
    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg mb-2 justify-between">
      <div className="flex">
        <div className="h-16 w-16 p-2 flex justify-center items-center">
          {renderThumbnail()}
        </div>
        <div className="min-h-16 flex flex-col justify-center ltr:ml-3 rtl:mr-3">
          <h6 className="text-lg font-medium">{name}</h6>
          <span className="text-sm">{getKB(size)} kb</span>
        </div>
      </div>
      {children}
    </div>
  );
};

FileItem.displayName = "UploadFileItem";

export default FileItem;
