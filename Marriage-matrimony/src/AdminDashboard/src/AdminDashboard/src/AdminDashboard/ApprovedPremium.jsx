onst PremiumCard = () => {Add commentMore actions
    const [biodata, setBiodata] = useState([]);
    const [premiumUsers, setPremiumUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        // Fetch biodata
        axios.get('http://localhost:5000/biodata')
        axios.get('https://find-partner-server.vercel.app/biodata')
            .then((response) => {
                setBiodata(response.data);
            })
            .catch((error) => console.error("Error fetching biodata:", error));
            .catch((error) => {});

        // Fetch premium users
        axios.get('http://localhost:5000/premium')
        axios.get('https://find-partner-server.vercel.app/premium')
            .then((response) => {
                const premiumData = response.data;

@@ -25,30 +27,54 @@

                // Sort premium users by age in descending order
                const sortedPremiumUsers = filteredPremiumUsers.sort((a, b) => {
                    const matchingBiodataA = biodata.find(bio => bio.contactEmail === a.email);
                    const matchingBiodataB = biodata.find(bio => bio.contactEmail === b.email);
                    const bioA = biodata.find(bio => bio.contactEmail === a.email);
                    const bioB = biodata.find(bio => bio.contactEmail === b.email);

                    if (matchingBiodataA && matchingBiodataB) {
                        return matchingBiodataB.age - matchingBiodataA.age; // Sorting in descending order by age
                    if (bioA && bioB) {
                        return bioB.age - bioA.age; // Descending order
                    }
                    return 0;
                });

                setPremiumUsers(sortedPremiumUsers); // Set sorted premium users
                setPremiumUsers(sortedPremiumUsers);
            })
            .catch((error) => console.error("Error fetching premium data:", error));
            .catch((error) => {});
    }, [biodata]);

    // Calculate the current page's items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = premiumUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(premiumUsers.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="container py-12 w-11/12 mx-auto">
            <h1 className="text-3xl pb-8 font-serif text-center text-gray-800">Premium Users</h1>
            <h1 className="text-3xl mb-8 font-serif text-center text-green-600 rounded-2xl md:w-2/12 mx-auto border bg-green-50 animated-border border-green-500">
                Premium Users
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {premiumUsers.map((user) => {
                {currentItems.map((user) => {
                    const matchingBiodata = biodata.find(bio => bio.contactEmail === user.email);

                    return matchingBiodata ? (
                        <div key={user.email} className="w-full bg-white  shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div
                            key={user.email}
                            className="w-full bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="relative">
                                {/* Image */}
                                <img
@@ -90,8 +116,26 @@
                    ) : null;
                })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mr-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PremiumCard;