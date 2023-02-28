import Posts from "../pages/Posts"

export const privateRoutes = [{
    path: '/',
    element: <Posts />,
    exact: true,
},
{
    path: '/posts', 
    element: <Posts />, 
    exact: true
},

] 
