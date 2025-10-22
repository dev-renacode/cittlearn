import React, { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/api";
import { useAvatarUpdate } from "../hooks/useAvatarUpdate";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TrackBadge from "../components/ui/TrackBadge";

const Profile = () => {
  const { user, updateUser, error, clearError } = useAuth();
  const { avatarKey } = useAvatarUpdate();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [avatarRefreshKey, setAvatarRefreshKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Solo se permiten archivos JPG, PNG, GIF y WebP";
    }

    if (file.size > maxSize) {
      return "El archivo debe ser menor a 5MB";
    }

    return null;
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      setPreviewUrl(null);
      setSelectedFile(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewDataUrl = e.target?.result as string;
      setPreviewUrl(previewDataUrl);
    };
    reader.readAsDataURL(file);

    setSelectedFile(file);
    setUploadError(null);
  };
  const cancelFileSelection = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;
    await uploadAvatar(selectedFile);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  // Subir avatar
  const uploadAvatar = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      clearError();

      const response = await authService.uploadAvatar(file);

      if (response.success && response.data) {
        // Actualizar el usuario con el filename del avatar (no la URL completa)
        const filename = response.data.filename || response.data.avatarUrl;
        const updatedUser = {
          ...user!,
          avatar: filename,
        };

        updateUser(updatedUser);
        setAvatarRefreshKey((prev) => prev + 1);
        setPreviewUrl(null);
        setSelectedFile(null);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(response.message || "Error al subir el avatar");
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Error al subir el avatar. Inténtalo de nuevo."
          : "Error al subir el avatar. Inténtalo de nuevo.";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
      // Limpiar el input solo si no hay archivo seleccionado
      if (fileInputRef.current && !selectedFile) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Eliminar avatar
  const deleteAvatar = async () => {
    if (!user?.avatar) return;

    try {
      setIsDeleting(true);
      setUploadError(null);
      clearError();

      const response = await authService.deleteAvatar();

      if (response.success) {
        // Actualizar el usuario removiendo el avatar (volver al por defecto)
        const updatedUser = {
          ...user!,
          avatar: undefined,
        };
        updateUser(updatedUser);
      } else {
        setUploadError(response.message || "Error al eliminar el avatar");
      }
    } catch (error: unknown) {
      console.error("Delete error:", error);
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message ||
            "Error al eliminar el avatar. Inténtalo de nuevo."
          : "Error al eliminar el avatar. Inténtalo de nuevo.";
      setUploadError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">
            Gestiona tu información personal y avatar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="text-center">
              <h2 className="text-xl font-semibold mb-6">Avatar</h2>

              <div className="flex justify-center mb-6">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={user?.name || "Usuario"}
                    className="w-16 h-16 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <Avatar
                    key={`profile-avatar-${avatarKey}-${avatarRefreshKey}`}
                    src={user?.avatar}
                    fallback={user?.name || ""}
                    size="xl"
                    alt={user?.name || "Usuario"}
                    forceRefresh={true}
                  />
                )}
              </div>

              {previewUrl && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-600 text-sm font-medium">
                    Vista previa de tu nuevo avatar
                  </p>
                  <p className="text-blue-500 text-xs mt-1">
                    Haz clic en "Confirmar" para guardar los cambios
                  </p>
                </div>
              )}

              {uploadSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm font-medium">
                    ✅ Avatar actualizado exitosamente
                  </p>
                  <p className="text-green-500 text-xs mt-1">
                    Tu nueva foto de perfil se ha guardado
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!previewUrl ? (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isDeleting}
                  >
                    {isUploading ? "Subiendo..." : "Cambiar Avatar"}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={confirmUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Subiendo..." : "Confirmar Cambio"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={cancelFileSelection}
                      disabled={isUploading}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}

                {user?.avatar && !previewUrl && (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={deleteAvatar}
                    disabled={isDeleting || isUploading}
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar Avatar"}
                  </Button>
                )}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>Formatos: JPG, PNG, GIF, WebP</p>
                <p>Tamaño máximo: 5MB</p>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-6">
                Información del Perfil
              </h2>

              {(error || uploadError) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{uploadError || error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Track de Especialización
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <TrackBadge track={user?.track} size="lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Verificado
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user?.emailVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user?.emailVerified ? "Verificado" : "Pendiente"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Dates */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Información de la Cuenta
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miembro desde
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">
                        {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Última actualización
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">
                        {user?.updatedAt ? formatDate(user.updatedAt) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="primary">Editar Perfil</Button>
                <Button variant="outline">Cambiar Contraseña</Button>
                <Button variant="secondary">Configuración de Privacidad</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
