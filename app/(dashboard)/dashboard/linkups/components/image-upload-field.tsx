"use client";

import {
  AlertCircleIcon,
  ImageUpIcon,
  Loader2,
  XIcon,
  Crop,
} from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import { CropData } from "@/types";

interface ImageUploaderProps {
  label: string;
  initialUrl?: string | null;
  onUploadComplete: (url: string) => void;
  maxSizeMB?: number;
  cropType?: "avatar" | "background";
}

export default function ImageUploader({
  label,
  initialUrl,
  onUploadComplete,
  maxSizeMB = 5,
  cropType = "avatar",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [imageForCrop, setImageForCrop] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [cropData, setCropData] = useState<CropData | null>(null);
  const maxSize = maxSizeMB * 1024 * 1024;

  const aspectRatio = cropType === "avatar" ? 1 : 16 / 9;

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

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageForCrop(e.target?.result as string);
        setOriginalFileName(file.name);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    },
  });

  const previewUrl = files[0]?.preview || null;

  const handleRemoveFile = () => {
    if (files.length > 0) {
      removeFile(files[0].id);
      onUploadComplete("");
    }
  };

  const handleCropChange = useCallback((data: CropData | null) => {
    setCropData(data);
  }, []);

  const handleCropComplete = async () => {
    if (!cropData || !imageForCrop) return;

    try {
      setIsUploading(true);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.onload = async () => {
        const targetWidth = cropType === "avatar" ? 400 : 1600;
        const targetHeight = cropType === "avatar" ? 400 : 900;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const sourceX = cropData.x * scaleX;
        const sourceY = cropData.y * scaleY;
        const sourceWidth = cropData.width * scaleX;
        const sourceHeight = cropData.height * scaleY;

        ctx?.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        canvas.toBlob(
          async (blob) => {
            if (!blob) return;

            try {
              const response = await fetch(
                `/api/upload?filename=${originalFileName}`,
                {
                  method: "POST",
                  body: blob,
                }
              );

              if (!response.ok) {
                throw new Error("Falha no upload da imagem.");
              }

              const newBlob = await response.json();
              onUploadComplete(newBlob.url);
              setShowCropDialog(false);
              setImageForCrop(null);
              setCropData(null);
            } catch (error) {
              console.error("Erro no upload:", error);
            } finally {
              setIsUploading(false);
            }
          },
          "image/jpeg",
          0.9
        );
      };

      img.src = imageForCrop;
    } catch (error) {
      console.error("Erro no crop:", error);
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropDialog(false);
    setImageForCrop(null);
    setCropData(null);
    setIsUploading(false);
  };

  return (
    <>
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
                <p className="mt-2 text-sm">Processando...</p>
              </div>
            )}

            {previewUrl ? (
              <div className="absolute inset-0">
                <Image
                  src={previewUrl}
                  alt={files[0]?.file?.name || "Uploaded image"}
                  className={`size-full object-cover ${
                    cropType === "avatar" ? "rounded-full" : ""
                  }`}
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
                  {cropType === "avatar"
                    ? "Arraste uma foto de perfil ou clique para selecionar"
                    : "Arraste uma imagem de fundo ou clique para selecionar"}
                </p>
                <p className="text-muted-foreground text-xs">
                  Tamanho máximo: {maxSizeMB}MB •
                  {cropType === "avatar"
                    ? " Formato quadrado"
                    : " Formato 16:9"}
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

      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crop className="size-4" />
              {cropType === "avatar"
                ? "Ajustar Foto de Perfil"
                : "Ajustar Imagem de Fundo"}
            </DialogTitle>
          </DialogHeader>

          {imageForCrop && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {cropType === "avatar"
                  ? "Ajuste sua foto de perfil para que fique perfeitamente quadrada"
                  : "Ajuste sua imagem de fundo no formato 16:9 (paisagem)"}
              </div>

              <Cropper
                className="h-80 w-full"
                image={imageForCrop}
                aspectRatio={aspectRatio}
                onCropChange={handleCropChange}
              >
                <CropperDescription />
                <CropperImage />
                <CropperCropArea />
              </Cropper>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handleCropCancel}
                  disabled={isUploading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCropComplete}
                  disabled={isUploading || !cropData}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    "Aplicar Crop"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
