export function isAdminAuthorized(request, env) {
  const password = request.headers.get('x-admin-password');
  return Boolean(password) && password === env.ADMIN_PASSWORD;
}
