import { UserRoutes } from './user.routes';
import { AuthRoutes } from './auth.routes';
import { PostRoutes } from './post.routes';

export const Routes = [...UserRoutes, ...AuthRoutes, ...PostRoutes];
