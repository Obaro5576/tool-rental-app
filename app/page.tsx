import React from 'react';
import RentalForm from './components/RentalForm';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tool Rental Application</h1>
            <div className="w-full max-w-md"> 
                <RentalForm />
            </div>
        </div>
    );
};

export default Home;