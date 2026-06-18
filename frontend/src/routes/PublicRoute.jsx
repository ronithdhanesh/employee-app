import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const accessToken = localStorage.getItem("accessToken");

    // Wait for auth initialization if a token exists but user isn't fetched yet
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    // Only redirect authenticated users if they both have a token AND loaded user profile
    if (accessToken && user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;