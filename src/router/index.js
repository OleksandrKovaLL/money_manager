import Posts from '../pages/Posts';
import CategoryDetail from '../pages/CategoryDetail';

export const privateRoutes = [
    {
        path: '/',
        element: <Posts />,
        exact: true,
    },
    {
        path: '/posts',
        element: <Posts />,
        exact: true,
    },

    {
        path: '/posts/:id',
        element: <CategoryDetail />,
        exact: true,
    },
];
