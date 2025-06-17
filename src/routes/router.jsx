import { createBrowserRouter, Outlet} from 'react-router'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Artifacts from '../pages/Artifacts'
import AllArtifacts from '../pages/AllArtifacts'
import ArtifactDetails from '../pages/ArtifactDetails'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './PrivateRoute'
import MyArtifacts from '../pages/MyArtifacts'
import UpdateArtifact from '../pages/UpdateArtifact'
import LikedArtifacts from '../pages/LikedArtifacts'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "auth",
                element: <Outlet />,
                children: [
                    {
                        path: "register",
                        element: <Signup />
                    },
                    {
                        path: "login",
                        element: <Signin />
                    }
                ]
            },
            {
                path: 'artifacts',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <AllArtifacts />
                    },
                    {
                        path: 'add',
                        element: <PrivateRoute><Artifacts /></PrivateRoute>
                    },
                    {
                        path: ':id',
                        element: <PrivateRoute><ArtifactDetails /></PrivateRoute>
                    },
                    {
                        path: ':id/edit',
                        element: <PrivateRoute><UpdateArtifact /></PrivateRoute>
                    }
                ]
            },
            {
                path: 'liked',
                element: <PrivateRoute><LikedArtifacts /></PrivateRoute>
            },
            {
                path: 'my',
                element: <PrivateRoute><MyArtifacts /></PrivateRoute>
            }
        ]

    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router