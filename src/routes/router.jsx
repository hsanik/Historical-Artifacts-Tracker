import { createBrowserRouter, Outlet} from 'react-router'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Artifacts from '../pages/Artifacts'
import MainLayout from '../layouts/MainLayout'


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
                        element: <p>AllArtifacts</p>
                    },
                    {
                        path: 'add',
                        element: <Artifacts />
                    },
                    {
                        path: ':id',
                        element: <p>ArtifactDetails</p>
                    },
                    {
                        path: ':id/edit',
                        element: <p>UpdateArtifact</p>
                    }
                ]
            },
            {
                path: 'liked',
                element: <p>LikedArtifacts</p>
            },
            {
                path: 'my',
                element: <p>MyArtifacts</p>
            }
        ]

    },
    {
        path: "*",
        element: <p>ErrorLayout</p>
    }
])

export default router