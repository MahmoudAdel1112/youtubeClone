import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <button
                onClick={handleGoHome}
                className="px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default ErrorPage;
