import {Route, Routes} from 'react-router-dom';
import {privateRoutes} from "../router"

const AppRouter = () => {
    return (
        <Routes>
            {privateRoutes.map((route, i) => 
                <Route 
                    element={route.element} 
                    path={route.path}  
                    exact={route.exact} 
                    key={i}
                />
            )} 
        </Routes> 
    );
};

export default AppRouter;