"use client";

import React, { useState, useEffect, useRef } from 'react';

const RentalForm: React.FC = () => {
    const [toolCode, setToolCode] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [rentalAgreement, setRentalAgreement] = useState<any>(null);
    const [error, setError] = useState("");
    const [showMessages, setShowMessages] = useState(false);

    const messageContainerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const rentalData = {
            toolCode,
            checkoutDate,
            returnDate,
            discountPercent,
        };

        try {
            const response = await fetch("/api/rentals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rentalData),
            });

            if (!response.ok) {
                const errorResponse = (await response.json()) as Record<string, any>;
                throw new Error(errorResponse.error || "An unknown error occurred");
            }

            const agreement = await response.json();
            setRentalAgreement(agreement);
            setError("");
            setShowMessages(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            setRentalAgreement(null);
            setShowMessages(true);
        }
    };

    // Hide messages when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (messageContainerRef.current && !messageContainerRef.current.contains(event.target as Node)) {
                setShowMessages(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white py-8 p-4 rounded-lg shadow-md w-full max-w-md mx-auto relative">
            {showMessages && (
                <div
                    ref={messageContainerRef}
                    className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-4 rounded-md transition-opacity duration-300 w-11/12 max-w-[90%] animate-fade-in z-50"
                >
                    {error && (
                        <div
                            id="error-message"
                            className="bg-blue-600 text-white p-4 rounded-md mb-2"
                        >
                            {error}
                        </div>
                    )}
                    {rentalAgreement && (
                        <div
                            id="json-message"
                            className="bg-lime-400 text-black p-4 rounded-md"
                        >
                            <h3 className="font-semibold text-center">Rental Agreement</h3>
                            <pre>{JSON.stringify(rentalAgreement, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Rental Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>
                        Tool Code:
                        <input
                            type="text"
                            value={toolCode}
                            onChange={(e) => setToolCode(e.target.value)}
                            required
                            data-testid="toolCode"
                            className="border border-gray-300 p-2 w-full"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label>
                        Checkout Date:
                        <input
                            type="date"
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                            required
                            data-testid="checkoutDate"
                            className="border border-gray-300 p-2 w-full"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label>
                        Return Date:
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            required
                            data-testid="returnDate"
                            className="border border-gray-300 p-2 w-full"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label>
                        Discount Percent:
                        <input
                            type="number"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(Number(e.target.value))}
                            min="0"
                            max="110"
                            data-testid="discountPercent"
                            className="border border-gray-300 p-2 w-full"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded transition duration-300 hover:bg-blue-500 w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RentalForm;