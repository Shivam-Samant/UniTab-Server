import authRoutes from './auth.routes'
import applicationRoutes from './application.routes'

const APP_ROUTES = [
    {
        prefix: '/api/auth',
        route: authRoutes,
    },
    {
        prefix: '/api/applications',
        route: applicationRoutes,
    }
]

export default APP_ROUTES