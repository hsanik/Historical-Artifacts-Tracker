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


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <p>Home</p>
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
                        element: <Artifacts />
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
        element: <p>ErrorLayout</p>
    }
])

export default router