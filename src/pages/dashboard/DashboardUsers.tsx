import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  adminService,
  captainService,
  type User as ApiUser,
} from "../../services/api";
import { useTrackResolution } from "../../hooks/useTrackResolution";
import { TrackBadge } from "../../components/common/ui";

// Ícono de corona para admin
const CrownIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className="mr-1"
  >
    <path d="M20.33 3.06a1 1 0 0 0-1.11.32L16 7.4l-3.22-4.02c-.38-.47-1.18-.47-1.56 0L8 7.4 4.78 3.38c-.27-.33-.71-.46-1.11-.32S3 3.58 3 4v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-.42-.27-.8-.67-.94M7.22 9.63c.38.47 1.18.47 1.56 0L12 5.61l3.22 4.02c.38.47 1.18.47 1.56 0L19 6.86v8.15H5V6.85l2.22 2.77ZM5 19.01v-2h14v2z"></path>
  </svg>
);

// Ícono de estrella para capitán
const CaptainIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className="mr-1"
  >
    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.988.988 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
  </svg>
);

// Modal de edición
interface EditModalProps {
  user: ApiUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, updates: UpdateUserData) => Promise<void>;
  onDelete: (userId: string) => Promise<void>;
  isAdmin: boolean;
}

interface UpdateUserData {
  name: string;
  email: string;
  password?: string;
  track?: string;
  role?: string;
  captainOf?: string | null; // String único para el backend
  isActive?: boolean;
}

const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isAdmin,
}: EditModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    track: "",
    role: "",
    captainOf: "",
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { tracks, loadTracks } = useTrackResolution();

  // Cargar tracks cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      loadTracks();
    }
  }, [isOpen, loadTracks]);

  // Debug: Log tracks cuando cambien
  useEffect(() => {
    if (tracks.length > 0) {
      console.log("Tracks loaded in modal:", tracks);
    }
  }, [tracks]);

  useEffect(() => {
    if (user) {
      const trackId =
        typeof user.track === "string" ? user.track : user.track?._id || "";

      // Construir nombre completo desde firstName/lastName o usar name directamente
      const fullName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name || "";

      // Manejar captainOf: puede ser string o array del backend
      let captainOfValue = "";
      if (user.captainOf) {
        if (typeof user.captainOf === "string") {
          captainOfValue = user.captainOf;
        } else if (Array.isArray(user.captainOf) && user.captainOf.length > 0) {
          captainOfValue = user.captainOf[0]; // Tomar el primer elemento
        }
      }

      setFormData({
        name: fullName,
        email: user.email,
        password: "",
        track: trackId,
        role: user.role,
        captainOf: captainOfValue,
        isActive: user.isActive,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captain necesita track asignado
    if (formData.role === "captain" && !formData.captainOf) {
      alert("Por favor selecciona un track para el rol de Capitán");
      return;
    }

    setIsSaving(true);
    try {
      const updates: UpdateUserData = {
        name: formData.name,
        email: formData.email,
        track: formData.track,
        isActive: formData.isActive,
      };

      // Solo admins cambian roles
      if (isAdmin && formData.role !== user.role) {
        updates.role = formData.role;

        // Si se asigna rol "captain", incluir captainOf como string
        if (formData.role === "captain") {
          updates.captainOf = formData.captainOf || null;
        }
        // Si se asigna rol "admin", no incluir captainOf (los admins tienen permisos automáticos)
        else if (formData.role === "admin") {
          // No incluir captainOf para admins
        }
        // Si se asigna rol "user", limpiar captainOf
        else if (formData.role === "user") {
          updates.captainOf = null;
        }
      }

      if (formData.password.trim() !== "") {
        updates.password = formData.password;
      }

      await onSave(user._id, updates);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar el usuario");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await onDelete(user._id);
      onClose();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error al eliminar el usuario");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Editar Usuario
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña (opcional)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          {/* Track */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Track
            </label>
            <select
              value={formData.track}
              onChange={(e) =>
                setFormData({ ...formData, track: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">
                {tracks.length === 0
                  ? "Cargando tracks..."
                  : "Seleccionar track"}
              </option>
              {tracks.map((track) => (
                <option key={track._id} value={track._id}>
                  {track.name}
                </option>
              ))}
            </select>
            {tracks.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Los tracks se están cargando...
              </p>
            )}
          </div>

          {/* Role (solo admin puede cambiar) */}
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                value={formData.role}
                onChange={(e) => {
                  const newRole = e.target.value;

                  // Si cambia a captain, mantener captainOf vacío para que el usuario seleccione
                  if (newRole === "captain") {
                    setFormData({ ...formData, role: newRole });
                  }
                  // Si cambia a user o admin, limpiar captainOf
                  else if (newRole === "user" || newRole === "admin") {
                    setFormData({
                      ...formData,
                      role: newRole,
                      captainOf: "",
                    });
                  }
                  // Mantener captainOf existente para otros casos
                  else {
                    setFormData({ ...formData, role: newRole });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Usuario</option>
                <option value="captain">Capitán</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Nota: Los usuarios con captainOf mostrarán también el badge de
                Capitán
              </p>
            </div>
          )}

          {/* CaptainOf (solo cuando el rol es captain) */}
          {isAdmin && formData.role === "captain" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Track como Capitán
              </label>
              <select
                value={formData.captainOf}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    captainOf: e.target.value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar track</option>
                {tracks.length === 0 ? (
                  <option disabled>Cargando tracks...</option>
                ) : (
                  tracks.map((track) => (
                    <option key={track._id} value={track._id}>
                      {track.name}
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Selecciona el track donde este usuario será capitán
              </p>
            </div>
          )}

          {/* Estado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Usuario activo
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              {isAdmin && !showDeleteConfirm && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  Eliminar Usuario
                </button>
              )}
              {showDeleteConfirm && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">¿Confirmar?</span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSaving}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const DashboardUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("todos");
  const [selectedTrack, setSelectedTrack] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tracks, loadTracks } = useTrackResolution();

  const isAdmin = currentUser?.role === "admin";

  // Cargar tracks al montar el componente
  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  // Fetch usuarios
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        role: selectedRole !== "todos" ? selectedRole : undefined,
        track: selectedTrack !== "todos" ? selectedTrack : undefined,
        search: searchTerm || undefined,
      };

      console.log("Fetching users with params:", params);
      console.log("Current user role:", currentUser?.role);
      console.log(
        "Using endpoint:",
        isAdmin ? "adminService.getUsers" : "captainService.getUsers"
      );

      const response = isAdmin
        ? await adminService.getUsers(params)
        : await captainService.getUsers(params);

      console.log("Response:", response);

      if (response.success && response.data) {
        const fetchedUsers = response.data.users || [];
        console.log("Total users fetched:", fetchedUsers.length);
        console.log(
          "User roles:",
          fetchedUsers.map((u) => u.role)
        );
        console.log(
          "All users:",
          fetchedUsers.map((u) => ({
            name: u.name,
            role: u.role,
            email: u.email,
          }))
        );

        setUsers(fetchedUsers);
        setTotalUsers(response.data.pagination.total);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error al cargar usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  // Effect para cargar usuarios
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedRole, selectedTrack]);

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchUsers();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleEditUser = (user: ApiUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userId: string, updates: UpdateUserData) => {
    try {
      // Cambios de rol van por admin endpoint
      const isRoleUpdate = updates.role !== undefined;

      const response =
        isRoleUpdate || isAdmin
          ? await adminService.updateUser(userId, updates)
          : await captainService.updateUser(userId, updates);

      if (response.success) {
        await fetchUsers();
        alert("Usuario actualizado exitosamente");
      } else {
        console.error("❌ Backend returned success: false", response);
        alert("Error: El servidor no pudo actualizar el usuario");
      }
    } catch (error: unknown) {
      console.error("❌ Error updating user:", error);
      const axiosError = error as AxiosError;
      console.error("❌ Error response:", axiosError.response?.data);
      throw new Error(
        axiosError.response?.data?.message || "Error al actualizar usuario"
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!isAdmin) return;

    try {
      const response = await adminService.deleteUser(userId);
      if (response.success) {
        await fetchUsers();
        alert("Usuario eliminado exitosamente");
      }
    } catch (error: unknown) {
      console.error("Error deleting user:", error);
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.response?.data?.message || "Error al eliminar usuario"
      );
    }
  };

  const getRoleBadge = (user: ApiUser) => {
    const badges = [];

    // Admin badge
    if (user.role === "admin") {
      badges.push({
        text: "Admin",
        icon: <CrownIcon size={12} />,
        className: "bg-red-100 text-red-800 border-red-300",
      });
    }

    // Captain badge
    const hasCaptainOf =
      user.captainOf &&
      ((typeof user.captainOf === "string" && user.captainOf.trim() !== "") ||
        (Array.isArray(user.captainOf) && user.captainOf.length > 0));

    if (user.role === "captain" || hasCaptainOf) {
      badges.push({
        text: "Capitán",
        icon: <CaptainIcon size={12} />,
        className: "bg-blue-100 text-blue-800 border-blue-300",
      });
    }

    // Usuarios normales no tienen badges
    if (badges.length === 0) {
      return null;
    }

    // Retornamos todos los badges que apliquen
    return (
      <div className="flex flex-wrap gap-1">
        {badges.map((badge, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.className}`}
          >
            <span className="mr-1">
              {typeof badge.icon === "string" ? badge.icon : badge.icon}
            </span>
            {badge.text}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Usuarios
            </h2>
            <p className="text-gray-600 mt-1">
              {isAdmin
                ? "Administra todos los usuarios del sistema"
                : "Administra los usuarios de tu track"}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los roles</option>
                <option value="admin">Admin</option>
                <option value="captain">Capitán</option>
                <option value="user">Usuario</option>
              </select>
            </div>

            {/* Track Filter (solo para admin) */}
            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Track
                </label>
                <select
                  value={selectedTrack}
                  onChange={(e) => {
                    setSelectedTrack(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos los tracks</option>
                  {tracks.length === 0 ? (
                    <option disabled>Cargando tracks...</option>
                  ) : (
                    tracks.map((track) => (
                      <option key={track._id} value={track._id}>
                        {track.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            {/* Clear Filters */}
            <div className="flex justify-end items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRole("todos");
                  setSelectedTrack("todos");
                  setCurrentPage(1);
                }}
                className="px-6 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 hover:text-red-800 transition-colors font-medium"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {users.length} de {totalUsers} usuarios
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando usuarios...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron usuarios
              </h3>
              <p className="text-gray-600 mb-2">
                Intenta ajustar los filtros o la búsqueda
              </p>
              {selectedRole !== "todos" && (
                <p className="text-sm text-gray-500">
                  Filtro actual:{" "}
                  <span className="font-semibold">{selectedRole}</span>
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Track
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                                {user.firstName?.[0] || "?"}
                                {user.lastName?.[0] || "?"}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName && user.lastName
                                  ? `${user.firstName} ${user.lastName}`
                                  : user.name || "Sin nombre"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(user)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TrackBadge track={user.track} size="sm" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Página{" "}
                        <span className="font-medium">{currentPage}</span> de{" "}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ←
                        </button>
                        {Array.from(
                          { length: Math.min(totalPages, 5) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNum
                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          →
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default DashboardUsers;
