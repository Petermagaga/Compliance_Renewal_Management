import { routeRegistry } from "../routing/routeRegistry";

export const navigationRegistry = routeRegistry
    .filter(route => route.showInSidebar)
    .map(route => ({
        id: route.id,
        title: route.title,
        path: route.path,
        icon: route.icon,
        roles: route.roles,
        badge: route.badge,
        children: route.children || [],
    }));