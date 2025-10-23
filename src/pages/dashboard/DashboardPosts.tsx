const DashboardPosts = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6">🚧</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Gestión de Posts
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Esta funcionalidad estará disponible próximamente
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800 mb-4">
            <strong>Próximas funcionalidades:</strong>
          </p>
          <ul className="text-left text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Ver todos los posts del sistema</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Moderar y eliminar posts inapropiados</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Ver estadísticas de engagement</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Filtrar posts por track y fecha</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Gestionar reportes de usuarios</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPosts;
