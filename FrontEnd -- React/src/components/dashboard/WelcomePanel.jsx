import React from 'react';
import { Plane, Calendar } from 'lucide-react';

const WelcomePanel = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
                        <p className="text-blue-100 text-lg">Ready for your next adventure?</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Plane className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePanel;

