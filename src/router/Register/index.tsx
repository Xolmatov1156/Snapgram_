import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../../utils";

const Login: LazyExoticComponent<any> = lazy(() => new Promise(resolve => {
    setTimeout(() => resolve(import('../../pages/RegisterUser/Login/Login')), 1000);
  }));
const Register : LazyExoticComponent<any> = lazy(() => import('../../pages/RegisterUser/Register/Register'))

const RegisterRoutes = () => {
    return useRoutes ([
        {
            path: '/',
            element: <Suspense><Login/></Suspense>
        },
        {
            path: '/register',
            element: <Suspense><Register/></Suspense>,
        },
    ])
}

export default RegisterRoutes