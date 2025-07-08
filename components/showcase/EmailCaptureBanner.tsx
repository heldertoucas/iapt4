/**
 * @license
 * SPDX-License-identifier: Apache-2.0
*/
import React from 'react';

const EmailCaptureBanner = () => {
    return (
        <div className="bg-pcd-card-bg p-8 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Text Content */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 font-lexend">Wait a minute...</h2>
                    <p className="mt-2 text-xl font-medium text-gray-800">Subscribe to our newsletter!</p>
                    <p className="mt-1 text-base text-gray-500">
                        You will never miss important product updates, latest news and community QA sessions. Our newsletter is once a week, every Sunday.
                    </p>
                    <div className="mt-6 flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            aria-label="Email"
                            className="flex-grow w-full px-4 py-2 text-gray-700 bg-pcd-card-bg border border-gray-300 rounded-l-md focus:ring-pcd-accent focus:border-pcd-accent focus:outline-none text-base"
                        />
                        <button className="px-6 py-2 bg-pcd-accent text-white font-semibold rounded-r-md hover:bg-opacity-90 transition-colors border border-pcd-accent -ml-px">
                            Subscribe
                        </button>
                    </div>
                </div>
                {/* Image */}
                <div className="flex-shrink-0 md:w-1/3">
                    <img 
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/docs/src/components/EmailBanner/image.svg" 
                        alt="Illustration of people sitting on a giant envelope" 
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};
export default EmailCaptureBanner;