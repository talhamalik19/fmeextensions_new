import React, { useState } from 'react';

const CustomDropdown = ({ countriesData, fieldValues, handleFieldChange, fieldValidity, isOrderButtonClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(fieldValues.country);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (country) => {
        setSelectedCountry(country.id);
        setIsOpen(false);
        handleFieldChange({ target: { name: 'country', value: country.id } });
    };

    const filteredCountries = countriesData.filter(country =>
        country.full_name_locale.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`form_item ${fieldValidity.country ? '' : isOrderButtonClicked && 'err-red'} cursor-pointer relative w-full border border-gray-300 rounded-md`}
                style={{lineHeight:'28px'}}
            >
                {selectedCountry ? countriesData.find(country => country.id === selectedCountry)?.full_name_locale : 'Select Country'}
            </div>
            {isOpen && (
                <div className="absolute w-full border border-gray-300 rounded-md bg-white mt-1 z-10">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full p-2 border-b border-gray-300"
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredCountries.map((country) => (
                            <div
                                key={country.id}
                                onClick={() => handleSelect(country)}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                            >
                                {country.full_name_locale}
                            </div>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="p-2 text-gray-500">No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
