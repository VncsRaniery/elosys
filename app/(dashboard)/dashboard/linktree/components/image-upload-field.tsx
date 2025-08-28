"use client";

import { AlertCircleIcon, ImageUpIcon, Loader2, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  label: string;
  initialUrl?: string | null;
  onUploadComplete: (url: string) => void;
  maxSizeMB?: number;
}

export default function ImageUploader({
  label,
  initialUrl,
  onUploadComplete,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, errors, isDragging },
    {
      removeFile,
      getInputProps,
      openFileDialog,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    multiple: false,
    initialFiles: initialUrl
      ? [
          {
            id: "initial",
            name: "initial-image",
            size: 0,
            type: "image",
            url: initialUrl,
          },
        ]
      : [],
    onFilesAdded: async (addedFiles) => {
      if (addedFiles.length === 0) return;

      const file = addedFiles[0].file;
      if (!(file instanceof File)) return;

      setIsUploading(true);
      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        if (!response.ok) {
          throw new Error("Falha no upload da imagem.");
        }

        const newBlob = await response.json();
        onUploadComplete(newBlob.url);
      } catch (error) {
        console.error("Erro no upload:", error);
      } finally {
        setIsUploading(false);
      }
    },
  });

  const previewUrl = files[0]?.preview || null;

  const handleRemoveFile = () => {
    if (files.length > 0) {
      removeFile(files[0].id);
      onUploadComplete("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input {...getInputProps()} className="sr-only" />

          {isUploading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <Loader2 className="size-8 animate-spin" />
              <p className="mt-2 text-sm">Enviando...</p>
            </div>
          )}

          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-muted-foreground text-xs">
                Tamanho máximo: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
        {previewUrl && !isUploading && (
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-20 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={handleRemoveFile}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
