import React from 'react';
import {useState} from 'react'

const SearchFilters = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="bg-gray-800 xl:w-72">
            <div className="flex justify-between px-4 py-3 xl:hidden">
                <div className="relative max-w-xs w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-6 w-6 fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M14.32 12.906l1.096 1.096c.412-.023.83.123 1.145.437l3 3a1.5 1.5 0 01-2.122 2.122l-3-3a1.497 1.497 0 01-.437-1.145l-1.096-1.096a8 8 0 111.414-1.414zM8 14A6 6 0 108 2a6 6 0 000 12z" />
                        </svg>
                    </div>
                    <input
                        className="block w-full bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-white rounded-lg pl-10 pr-2 py-2 "
                        placeholder="Search by keywords"
                    />
                </div>

                <button onClick={() => { setIsOpen(!isOpen) }} className={`${!isOpen ? 'bg-gray-700' : 'bg-gray-600 '} inline-flex items-center   hover:bg-gray-600  focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 ml-4`}>
                    <svg
                        className="h-6 w-6 fill-current text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm4 5a1 1 0 100 2h4a1 1 0 100-2h-4z" />
                    </svg>
                    <span className="ml-1 font-medium text-white">Filters</span>
                </button>
            </div>
            <form className={`${!isOpen ? 'hidden' : ''} xl:h-full xl:flex xl:flex-col xl:justify-between`}>
                <div className="lg:flex xl:block xl:overflow-y-auto">
                    <div className="px-4 py-4 border-t border-gray-900 sm:flex sm:-mx-2 lg:block lg:w-1/3 xl:border-t-0 xl:w-full">
                        <div className="flex -mx-2 sm:w-1/2 sm:mx-0 lg:w-full">
                            <label className="block w-1/2 px-2 sm:w-1/2 lg:w-1/2 xl:w-full">
                                <span className="text-sm font-medium text-gray-500">Bedrooms</span>
                                <select className="mt-1 form-select block w-full bg-gray-900  text-white shadow">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </label>


                            <label className="block w-1/2 px-2 sm:w-1/2 lg:w-1/2 xl:w-full">
                                <span className="text-sm font-medium text-gray-500">Bathrooms</span>
                                <select className="mt-1 form-select block w-full bg-gray-900  text-white shadow">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </label>
                        </div>
                        <div className="mt-4 block w-full sm:mt-0 sm:px-2 sm:w-1/2 lg:w-full lg:mt-4">
                            <label className="">
                                <span className="text-sm font-medium text-gray-500 ">Price Range</span>
                                <select className="mt-1 form-select block w-full bg-gray-900  text-white shadow">
                                    <option>Up to $2,000 /wk</option>
                                    <option>Up to $1000 /wk</option>
                                    <option>Up to $100 /wk</option>

                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="px-4 py-4 border-t border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
                        <span className="text-sm font-medium text-gray-400 ">Property Type</span>
                        <div className="sm:flex lg:block lg:mx-0">
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-full lg:px-0">
                                <input className="form-radio bg-gray-900 " type="radio" name="propertyType" value="house" />
                                <span className="ml-2 text-white">House</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-full lg:px-0">
                                <input className="form-radio bg-gray-900 " type="radio" name="propertyType" value="apartment" />
                                <span className="ml-2 text-white">Apartment</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-full lg:px-0 ">
                                <input className="form-radio bg-gray-900 " type="radio" name="propertyType" value="loft" />
                                <span className="ml-2 text-white">Loft</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-full lg:px-0">
                                <input className="form-radio bg-gray-900 " type="radio" name="propertyType" value="townhouse" />
                                <span className="ml-2 text-white">Townhouse</span>
                            </label>
                        </div>
                    </div>
                    <div className="px-4 py-4 border-t border-gray-900 lg:border-l lg:w-1/3 xl:w-full">
                        <span className="text-sm font-medium text-gray-400">Amenities</span>
                        <div className="sm:flex sm:flex-wrap">
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="balcony" />
                                <span className="ml-2 text-white">Balcony</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="airConditioning" />
                                <span className="ml-2 text-white">Air conditioning</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="pool" />
                                <span className="ml-2 text-white">Pool</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="beach" />
                                <span className="ml-2 text-white">Beach</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="petFriendly" />
                                <span className="ml-2 text-white">Pet friendly</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="kidFriendly" />
                                <span className="ml-2 text-white">Kid friendly</span>
                            </label>
                            <label className="mt-3 sm:w-1/4 flex items-center lg:w-1/2 xl:w-full">
                                <input className="form-checkbox bg-gray-900 " type="checkbox" name="parking" />
                                <span className="ml-2 text-white ">Parking</span>
                            </label>
                        </div>
                    </div>

                </div>
                <div className="bg-gray-900 px-4 py-4 sm:text-right">
                    <button className="block w-full sm:w-auto sm:inline-block  bg-indigo-500 hover:bg-indigo-400 font-medium text-white px-4 py-2 rounded-lg xl:block xl:w-full">Update results</button>
                </div>
            </form>
        </section >
    );
};

export default SearchFilters;