// RailBook Pro - Premium Indian Railway Booking Application with 30+ Trains
class RailBookApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'landing';
        this.selectedTrain = null;
        this.bookingData = {};
        this.trains = [];
        this.stations = [];
        this.users = [];
        this.bookings = [];
        this.nextTrainId = 131;
        this.nextBookingId = 1;
        this.nextUserId = 3;
        this.currentSearchResults = null;
        this.popularRoutes = [];
        
        // Bind methods to ensure proper context
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleQuickSearch = this.handleQuickSearch.bind(this);
        this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
        this.handlePassengerDetails = this.handlePassengerDetails.bind(this);
        this.handleAddTrain = this.handleAddTrain.bind(this);
    }

    async init() {
        console.log('Initializing RailBook Pro with 30 trains...');
        this.showLoading(true);
        
        try {
            this.loadTrainsData();
            this.loadStationsData();
            this.initializeUserData();
            this.loadUserSession();
            this.initializeEventListeners();
            this.initializeAutocomplete();
            console.log(`RailBook Pro initialized successfully with ${this.trains.length} trains`);
        } catch (error) {
            console.error('Error during initialization:', error);
        }
        
        this.showLoading(false);
    }

    loadTrainsData() {
        console.log('Loading comprehensive train database...');
        
        // Complete 30 train database embedded directly
        this.trains = [
            {
                "train_id": 101,
                "train_number": "12951",
                "train_name": "Mumbai Rajdhani Express",
                "from_station": "New Delhi",
                "to_station": "Mumbai Central",
                "departure_time": "16:55",
                "arrival_time": "08:35",
                "total_seats": 400,
                "available_seats": 156,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1165,
                "price_ac2": 1665,
                "price_ac1": 2875,
                "duration": "15h 40m",
                "train_type": "Rajdhani"
            },
            {
                "train_id": 102,
                "train_number": "12301",
                "train_name": "Howrah Rajdhani Express",
                "from_station": "New Delhi",
                "to_station": "Kolkata",
                "departure_time": "17:00",
                "arrival_time": "10:10",
                "total_seats": 350,
                "available_seats": 89,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1320,
                "price_ac2": 1885,
                "price_ac1": 3150,
                "duration": "17h 10m",
                "train_type": "Rajdhani"
            },
            {
                "train_id": 103,
                "train_number": "12423",
                "train_name": "Dibrugarh Rajdhani Express",
                "from_station": "New Delhi",
                "to_station": "Dibrugarh",
                "departure_time": "21:10",
                "arrival_time": "10:10",
                "total_seats": 400,
                "available_seats": 167,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 2150,
                "price_ac2": 3180,
                "price_ac1": 5250,
                "duration": "37h 00m",
                "train_type": "Rajdhani"
            },
            {
                "train_id": 104,
                "train_number": "12432",
                "train_name": "Thiruvananthapuram Rajdhani Express",
                "from_station": "Thiruvananthapuram",
                "to_station": "New Delhi",
                "departure_time": "18:45",
                "arrival_time": "11:00",
                "total_seats": 400,
                "available_seats": 123,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 2195,
                "price_ac2": 3145,
                "price_ac1": 5345,
                "duration": "40h 15m",
                "train_type": "Rajdhani"
            },
            {
                "train_id": 105,
                "train_number": "12434",
                "train_name": "Chennai Rajdhani Express",
                "from_station": "Chennai Central",
                "to_station": "New Delhi",
                "departure_time": "15:50",
                "arrival_time": "07:15",
                "total_seats": 380,
                "available_seats": 145,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1895,
                "price_ac2": 2745,
                "price_ac1": 4595,
                "duration": "27h 25m",
                "train_type": "Rajdhani"
            },
            {
                "train_id": 106,
                "train_number": "12009",
                "train_name": "Amritsar Shatabdi Express",
                "from_station": "New Delhi",
                "to_station": "Amritsar",
                "departure_time": "07:20",
                "arrival_time": "13:45",
                "total_seats": 300,
                "available_seats": 78,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 895,
                "price_ac2": 1450,
                "price_ac1": 2350,
                "duration": "6h 25m",
                "train_type": "Shatabdi"
            },
            {
                "train_id": 107,
                "train_number": "12002",
                "train_name": "Bhopal Shatabdi Express",
                "from_station": "New Delhi",
                "to_station": "Bhopal",
                "departure_time": "06:00",
                "arrival_time": "14:35",
                "total_seats": 280,
                "available_seats": 95,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1245,
                "price_ac2": 1995,
                "price_ac1": 3245,
                "duration": "8h 35m",
                "train_type": "Shatabdi"
            },
            {
                "train_id": 108,
                "train_number": "12016",
                "train_name": "Ajmer Shatabdi Express",
                "from_station": "New Delhi",
                "to_station": "Ajmer",
                "departure_time": "06:05",
                "arrival_time": "12:45",
                "total_seats": 250,
                "available_seats": 67,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 745,
                "price_ac2": 1195,
                "price_ac1": 1945,
                "duration": "6h 40m",
                "train_type": "Shatabdi"
            },
            {
                "train_id": 109,
                "train_number": "12019",
                "train_name": "Howrah Shatabdi Express",
                "from_station": "Kolkata",
                "to_station": "New Delhi",
                "departure_time": "06:00",
                "arrival_time": "22:40",
                "total_seats": 300,
                "available_seats": 87,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1295,
                "price_ac2": 2045,
                "price_ac1": 3345,
                "duration": "16h 40m",
                "train_type": "Shatabdi"
            },
            {
                "train_id": 110,
                "train_number": "12059",
                "train_name": "Jan Shatabdi Express",
                "from_station": "New Delhi",
                "to_station": "Dehradun",
                "departure_time": "06:50",
                "arrival_time": "13:15",
                "total_seats": 280,
                "available_seats": 156,
                "price_general": 195,
                "price_sleeper": 0,
                "price_ac3": 395,
                "price_ac2": 695,
                "price_ac1": 0,
                "duration": "6h 25m",
                "train_type": "Jan Shatabdi"
            },
            {
                "train_id": 111,
                "train_number": "12621",
                "train_name": "Tamil Nadu Express",
                "from_station": "New Delhi",
                "to_station": "Chennai Central",
                "departure_time": "22:30",
                "arrival_time": "07:40",
                "total_seats": 450,
                "available_seats": 234,
                "price_general": 485,
                "price_sleeper": 485,
                "price_ac3": 1285,
                "price_ac2": 1840,
                "price_ac1": 3090,
                "duration": "33h 10m",
                "train_type": "Express"
            },
            {
                "train_id": 112,
                "train_number": "12626",
                "train_name": "Kerala Express",
                "from_station": "New Delhi",
                "to_station": "Thiruvananthapuram",
                "departure_time": "11:45",
                "arrival_time": "10:45",
                "total_seats": 520,
                "available_seats": 289,
                "price_general": 1145,
                "price_sleeper": 1145,
                "price_ac3": 2295,
                "price_ac2": 3345,
                "price_ac1": 5695,
                "duration": "47h 00m",
                "train_type": "Express"
            },
            {
                "train_id": 113,
                "train_number": "12295",
                "train_name": "Sangamitra Express",
                "from_station": "Bangalore",
                "to_station": "Patna",
                "departure_time": "17:15",
                "arrival_time": "03:20",
                "total_seats": 420,
                "available_seats": 198,
                "price_general": 695,
                "price_sleeper": 695,
                "price_ac3": 1545,
                "price_ac2": 2285,
                "price_ac1": 3895,
                "duration": "34h 05m",
                "train_type": "Express"
            },
            {
                "train_id": 114,
                "train_number": "12217",
                "train_name": "Kerala Sampark Kranti Express",
                "from_station": "Kochuveli",
                "to_station": "Chandigarh",
                "departure_time": "12:30",
                "arrival_time": "04:05",
                "total_seats": 480,
                "available_seats": 267,
                "price_general": 895,
                "price_sleeper": 895,
                "price_ac3": 1895,
                "price_ac2": 2745,
                "price_ac1": 4595,
                "duration": "39h 35m",
                "train_type": "Express"
            },
            {
                "train_id": 115,
                "train_number": "12649",
                "train_name": "Karnataka Sampark Kranti Express",
                "from_station": "Yesvantpur",
                "to_station": "Delhi Sarai Rohilla",
                "departure_time": "22:00",
                "arrival_time": "05:50",
                "total_seats": 450,
                "available_seats": 245,
                "price_general": 895,
                "price_sleeper": 895,
                "price_ac3": 1795,
                "price_ac2": 2595,
                "price_ac1": 4395,
                "duration": "31h 50m",
                "train_type": "Express"
            },
            {
                "train_id": 116,
                "train_number": "12723",
                "train_name": "Telangana Express",
                "from_station": "Hyderabad",
                "to_station": "New Delhi",
                "departure_time": "21:50",
                "arrival_time": "06:05",
                "total_seats": 380,
                "available_seats": 98,
                "price_general": 745,
                "price_sleeper": 745,
                "price_ac3": 1495,
                "price_ac2": 2195,
                "price_ac1": 3745,
                "duration": "32h 15m",
                "train_type": "Express"
            },
            {
                "train_id": 117,
                "train_number": "12049",
                "train_name": "Gatimaan Express",
                "from_station": "Hazrat Nizamuddin",
                "to_station": "Agra Cantt",
                "departure_time": "08:10",
                "arrival_time": "09:50",
                "total_seats": 180,
                "available_seats": 45,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 750,
                "price_ac2": 1125,
                "price_ac1": 1850,
                "duration": "1h 40m",
                "train_type": "Express"
            },
            {
                "train_id": 118,
                "train_number": "12290",
                "train_name": "Nagpur Duronto Express",
                "from_station": "Mumbai CSMT",
                "to_station": "Nagpur",
                "departure_time": "21:55",
                "arrival_time": "08:10",
                "total_seats": 360,
                "available_seats": 89,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1145,
                "price_ac2": 1645,
                "price_ac1": 2785,
                "duration": "10h 15m",
                "train_type": "Duronto"
            },
            {
                "train_id": 119,
                "train_number": "12283",
                "train_name": "Ernakulam Duronto Express",
                "from_station": "Ernakulam",
                "to_station": "Hazrat Nizamuddin",
                "departure_time": "08:30",
                "arrival_time": "05:25",
                "total_seats": 380,
                "available_seats": 145,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1695,
                "price_ac2": 2445,
                "price_ac1": 4145,
                "duration": "20h 55m",
                "train_type": "Duronto"
            },
            {
                "train_id": 120,
                "train_number": "12273",
                "train_name": "Howrah Duronto Express",
                "from_station": "New Delhi",
                "to_station": "Kolkata",
                "departure_time": "23:45",
                "arrival_time": "17:05",
                "total_seats": 400,
                "available_seats": 178,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1395,
                "price_ac2": 1995,
                "price_ac1": 3345,
                "duration": "17h 20m",
                "train_type": "Duronto"
            },
            {
                "train_id": 121,
                "train_number": "12215",
                "train_name": "Delhi Sarai Rohilla Garib Rath",
                "from_station": "Delhi Sarai Rohilla",
                "to_station": "Bandra Terminus",
                "departure_time": "11:35",
                "arrival_time": "15:20",
                "total_seats": 320,
                "available_seats": 142,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 895,
                "price_ac2": 1245,
                "price_ac1": 1995,
                "duration": "27h 45m",
                "train_type": "Garib Rath"
            },
            {
                "train_id": 122,
                "train_number": "12405",
                "train_name": "Saharsa Garib Rath Express",
                "from_station": "Saharsa",
                "to_station": "Amritsar",
                "departure_time": "20:15",
                "arrival_time": "06:05",
                "total_seats": 320,
                "available_seats": 187,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1345,
                "price_ac2": 1895,
                "price_ac1": 2945,
                "duration": "33h 50m",
                "train_type": "Garib Rath"
            },
            {
                "train_id": 123,
                "train_number": "12617",
                "train_name": "Mangala Lakshadweep Express",
                "from_station": "Hazrat Nizamuddin",
                "to_station": "Ernakulam",
                "departure_time": "11:15",
                "arrival_time": "06:30",
                "total_seats": 460,
                "available_seats": 234,
                "price_general": 965,
                "price_sleeper": 965,
                "price_ac3": 2145,
                "price_ac2": 3095,
                "price_ac1": 5245,
                "duration": "43h 15m",
                "train_type": "Express"
            },
            {
                "train_id": 124,
                "train_number": "12501",
                "train_name": "Poorva Express",
                "from_station": "New Delhi",
                "to_station": "Kolkata",
                "departure_time": "16:55",
                "arrival_time": "23:20",
                "total_seats": 480,
                "available_seats": 267,
                "price_general": 545,
                "price_sleeper": 545,
                "price_ac3": 1395,
                "price_ac2": 1995,
                "price_ac1": 3345,
                "duration": "30h 25m",
                "train_type": "Express"
            },
            {
                "train_id": 125,
                "train_number": "12615",
                "train_name": "Grand Trunk Express",
                "from_station": "New Delhi",
                "to_station": "Chennai Central",
                "departure_time": "19:15",
                "arrival_time": "06:20",
                "total_seats": 520,
                "available_seats": 298,
                "price_general": 485,
                "price_sleeper": 485,
                "price_ac3": 1285,
                "price_ac2": 1840,
                "price_ac1": 3090,
                "duration": "35h 05m",
                "train_type": "Express"
            },
            {
                "train_id": 126,
                "train_number": "12841",
                "train_name": "Coromandel Express",
                "from_station": "Kolkata",
                "to_station": "Chennai Central",
                "departure_time": "14:00",
                "arrival_time": "18:45",
                "total_seats": 440,
                "available_seats": 187,
                "price_general": 645,
                "price_sleeper": 645,
                "price_ac3": 1445,
                "price_ac2": 2095,
                "price_ac1": 3545,
                "duration": "28h 45m",
                "train_type": "Express"
            },
            {
                "train_id": 127,
                "train_number": "12925",
                "train_name": "Paschim Express",
                "from_station": "Amritsar",
                "to_station": "Mumbai Central",
                "departure_time": "05:40",
                "arrival_time": "11:30",
                "total_seats": 500,
                "available_seats": 278,
                "price_general": 745,
                "price_sleeper": 745,
                "price_ac3": 1645,
                "price_ac2": 2395,
                "price_ac1": 4045,
                "duration": "29h 50m",
                "train_type": "Express"
            },
            {
                "train_id": 128,
                "train_number": "12267",
                "train_name": "Mumbai Duronto Express",
                "from_station": "Mumbai Central",
                "to_station": "Hazrat Nizamuddin",
                "departure_time": "22:15",
                "arrival_time": "14:10",
                "total_seats": 380,
                "available_seats": 156,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 1295,
                "price_ac2": 1845,
                "price_ac1": 3145,
                "duration": "15h 55m",
                "train_type": "Duronto"
            },
            {
                "train_id": 129,
                "train_number": "12007",
                "train_name": "Chandigarh Shatabdi Express",
                "from_station": "New Delhi",
                "to_station": "Chandigarh",
                "departure_time": "07:40",
                "arrival_time": "11:15",
                "total_seats": 280,
                "available_seats": 89,
                "price_general": 0,
                "price_sleeper": 0,
                "price_ac3": 595,
                "price_ac2": 945,
                "price_ac1": 1545,
                "duration": "3h 35m",
                "train_type": "Shatabdi"
            },
            {
                "train_id": 130,
                "train_number": "12631",
                "train_name": "Nellore Express",
                "from_station": "Chennai Central",
                "to_station": "Hazrat Nizamuddin",
                "departure_time": "14:25",
                "arrival_time": "18:50",
                "total_seats": 420,
                "available_seats": 198,
                "price_general": 495,
                "price_sleeper": 495,
                "price_ac3": 1345,
                "price_ac2": 1945,
                "price_ac1": 3295,
                "duration": "28h 25m",
                "train_type": "Express"
            }
        ];
    }

    loadStationsData() {
        // Stations data from the provided JSON
        this.stations = [
            {"station_id": 1, "station_name": "New Delhi", "station_code": "NDLS"},
            {"station_id": 2, "station_name": "Mumbai Central", "station_code": "BCT"},
            {"station_id": 3, "station_name": "Chennai Central", "station_code": "MAS"},
            {"station_id": 4, "station_name": "Kolkata", "station_code": "HWH"},
            {"station_id": 5, "station_name": "Bangalore", "station_code": "SBC"},
            {"station_id": 6, "station_name": "Hyderabad", "station_code": "SC"},
            {"station_id": 7, "station_name": "Ahmedabad", "station_code": "ADI"},
            {"station_id": 8, "station_name": "Pune", "station_code": "PUNE"},
            {"station_id": 9, "station_name": "Jaipur", "station_code": "JP"},
            {"station_id": 10, "station_name": "Lucknow", "station_code": "LJN"},
            {"station_id": 11, "station_name": "Patna", "station_code": "PNBE"},
            {"station_id": 12, "station_name": "Bhopal", "station_code": "BPL"},
            {"station_id": 13, "station_name": "Nagpur", "station_code": "NGP"},
            {"station_id": 14, "station_name": "Thiruvananthapuram", "station_code": "TVC"},
            {"station_id": 15, "station_name": "Amritsar", "station_code": "ASR"},
            {"station_id": 16, "station_name": "Chandigarh", "station_code": "CDG"},
            {"station_id": 17, "station_name": "Dehradun", "station_code": "DDN"},
            {"station_id": 18, "station_name": "Agra Cantt", "station_code": "AGC"},
            {"station_id": 19, "station_name": "Ajmer", "station_code": "AII"},
            {"station_id": 20, "station_name": "Dibrugarh", "station_code": "DBRG"},
            {"station_id": 21, "station_name": "Kochuveli", "station_code": "KCVL"},
            {"station_id": 22, "station_name": "Yesvantpur", "station_code": "YPR"},
            {"station_id": 23, "station_name": "Delhi Sarai Rohilla", "station_code": "DEE"},
            {"station_id": 24, "station_name": "Bandra Terminus", "station_code": "BDTS"},
            {"station_id": 25, "station_name": "Mumbai CSMT", "station_code": "CSMT"},
            {"station_id": 26, "station_name": "Ernakulam", "station_code": "ERS"},
            {"station_id": 27, "station_name": "Hazrat Nizamuddin", "station_code": "NZM"},
            {"station_id": 28, "station_name": "Saharsa", "station_code": "SHC"}
        ];
    }

    initializeUserData() {
        // Initialize demo users with proper hashing simulation
        this.users = [
            {
                user_id: 1,
                name: "Admin User",
                email: "admin@railbook.com",
                phone: "+91 9876543210",
                password: "admin123", // Store plain text for demo purposes
                is_admin: true,
                created_at: new Date().toISOString()
            },
            {
                user_id: 2,
                name: "Demo User",
                email: "user@railbook.com",
                phone: "+91 9876543211",
                password: "user123", // Store plain text for demo purposes
                is_admin: false,
                created_at: new Date().toISOString()
            }
        ];

        this.bookings = [];
        this.generatePopularRoutes();
        this.loadFromStorage();
        this.setTodayDate();
        console.log('User data initialization complete');
    }

    generatePopularRoutes() {
        const routes = [
            { from: "New Delhi", to: "Mumbai Central", distance: "1384 km", trains: "8 trains" },
            { from: "New Delhi", to: "Chennai Central", distance: "2180 km", trains: "4 trains" },
            { from: "New Delhi", to: "Kolkata", distance: "1441 km", trains: "3 trains" },
            { from: "Mumbai Central", to: "Nagpur", distance: "825 km", trains: "2 trains" },
            { from: "Chennai Central", to: "Kolkata", distance: "1662 km", trains: "2 trains" },
            { from: "New Delhi", to: "Amritsar", distance: "449 km", trains: "2 trains" }
        ];
        this.popularRoutes = routes;
    }

    displayPopularRoutes() {
        const container = document.getElementById('popularRoutes');
        if (!container) return;

        container.innerHTML = this.popularRoutes.map(route => `
            <div class="route-card" onclick="app.selectPopularRoute('${route.from}', '${route.to}')">
                <div class="route-header">
                    <div class="route-name">${route.from} → ${route.to}</div>
                    <div class="route-distance">${route.distance}</div>
                </div>
                <div class="route-info">${route.trains} available</div>
            </div>
        `).join('');
    }

    selectPopularRoute(from, to) {
        const fromInput = document.getElementById('quickFromStation');
        const toInput = document.getElementById('quickToStation');
        if (fromInput) fromInput.value = from;
        if (toInput) toInput.value = to;
        
        // Automatically search
        this.searchTrains(from, to, new Date().toISOString().split('T')[0]);
        this.showSection('search');
    }

    setTodayDate() {
        const quickTravelDate = document.getElementById('quickTravelDate');
        if (quickTravelDate) {
            const today = new Date().toISOString().split('T')[0];
            quickTravelDate.setAttribute('min', today);
            quickTravelDate.value = today;
        }
    }

    initializeAutocomplete() {
        const autocompleteFields = [
            { input: 'quickFromStation', dropdown: 'fromStationDropdown' },
            { input: 'quickToStation', dropdown: 'toStationDropdown' },
            { input: 'trainFromStation', dropdown: 'trainFromStationDropdown' },
            { input: 'trainToStation', dropdown: 'trainToStationDropdown' }
        ];

        autocompleteFields.forEach(field => {
            const input = document.getElementById(field.input);
            const dropdown = document.getElementById(field.dropdown);
            
            if (input && dropdown) {
                this.setupAutocomplete(input, dropdown);
            }
        });
    }

    setupAutocomplete(input, dropdown) {
        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length < 2) {
                dropdown.classList.add('hidden');
                return;
            }

            const matches = this.stations.filter(station =>
                station.station_name.toLowerCase().includes(value) ||
                station.station_code.toLowerCase().includes(value)
            ).slice(0, 10);

            if (matches.length === 0) {
                dropdown.classList.add('hidden');
                return;
            }

            dropdown.innerHTML = matches.map(station => `
                <div class="autocomplete-item" onclick="app.selectStation('${input.id}', '${station.station_name}', '${dropdown.id}')">
                    <span>${station.station_name}</span>
                    <span class="station-code">${station.station_code}</span>
                </div>
            `).join('');

            dropdown.classList.remove('hidden');
        });

        input.addEventListener('blur', () => {
            setTimeout(() => dropdown.classList.add('hidden'), 200);
        });

        input.addEventListener('focus', (e) => {
            if (e.target.value.length >= 2) {
                e.target.dispatchEvent(new Event('input'));
            }
        });
    }

    selectStation(inputId, stationName, dropdownId) {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        
        if (input) input.value = stationName;
        if (dropdown) dropdown.classList.add('hidden');
    }

    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('railbook_data');
            if (savedData) {
                const data = JSON.parse(savedData);
                if (data.users) this.users = data.users;
                if (data.bookings) this.bookings = data.bookings;
                if (data.nextBookingId) this.nextBookingId = data.nextBookingId;
                if (data.nextUserId) this.nextUserId = data.nextUserId;
                console.log('Loaded data from storage');
            }
        } catch (e) {
            console.error('Error loading data from storage:', e);
        }
    }

    saveToStorage() {
        try {
            const data = {
                users: this.users,
                bookings: this.bookings,
                nextBookingId: this.nextBookingId,
                nextUserId: this.nextUserId
            };
            localStorage.setItem('railbook_data', JSON.stringify(data));
            console.log('Data saved to storage');
        } catch (e) {
            console.error('Error saving data to storage:', e);
        }
    }

    loadUserSession() {
        try {
            const savedUser = localStorage.getItem('railbook_current_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                this.showApp();
                this.updateUI();
                console.log('User session loaded:', this.currentUser.name);
            }
        } catch (e) {
            console.error('Error loading user session:', e);
        }
    }

    saveUserSession() {
        try {
            if (this.currentUser) {
                localStorage.setItem('railbook_current_user', JSON.stringify(this.currentUser));
                console.log('User session saved');
            }
        } catch (e) {
            console.error('Error saving user session:', e);
        }
    }

    initializeEventListeners() {
        console.log('Setting up event listeners...');
        
        // Authentication forms
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin);
        }
        
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister);
        }
        
        // Quick search form
        const quickSearchForm = document.getElementById('quickSearchForm');
        if (quickSearchForm) {
            quickSearchForm.addEventListener('submit', this.handleQuickSearch);
        }
        
        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', this.handleProfileUpdate);
        }
        
        // Passenger details form
        const passengerDetailsForm = document.getElementById('passengerDetailsForm');
        if (passengerDetailsForm) {
            passengerDetailsForm.addEventListener('submit', this.handlePassengerDetails);
        }
        
        // Add train form
        const addTrainForm = document.getElementById('addTrainForm');
        if (addTrainForm) {
            addTrainForm.addEventListener('submit', this.handleAddTrain);
        }
        
        // Password strength indicator
        const registerPassword = document.getElementById('registerPassword');
        if (registerPassword) {
            registerPassword.addEventListener('input', (e) => this.updatePasswordStrength(e.target.value));
        }
        
        // Filter changes
        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            sortBy.addEventListener('change', () => this.applyFiltersAndSort());
        }
        
        const classFilter = document.getElementById('classFilter');
        if (classFilter) {
            classFilter.addEventListener('change', () => this.applyFiltersAndSort());
        }

        const trainTypeFilter = document.getElementById('trainTypeFilter');
        if (trainTypeFilter) {
            trainTypeFilter.addEventListener('change', () => this.applyFiltersAndSort());
        }
        
        console.log('Event listeners setup complete');
    }

    handleLogin(e) {
        e.preventDefault();
        console.log('Handling login...');
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        console.log('Login attempt for email:', email);
        
        if (!email || !password) {
            this.showToast('Please enter both email and password', 'warning');
            return;
        }
        
        // Find user - simplified for demo
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            console.log('Login successful for user:', user.name);
            this.currentUser = user;
            this.saveUserSession();
            this.showApp();
            this.updateUI();
            this.showToast(`Welcome back, ${user.name}!`, 'success');
        } else {
            console.log('Invalid credentials provided');
            this.showToast('Invalid email or password. Try admin@railbook.com / admin123', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const password = document.getElementById('registerPassword').value;
        
        if (!name || !email || !phone || !password) {
            this.showToast('Please fill all registration fields', 'warning');
            return;
        }
        
        if (this.users.find(u => u.email === email)) {
            this.showToast('Email already exists', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters long', 'error');
            return;
        }
        
        const newUser = {
            user_id: this.nextUserId++,
            name,
            email,
            phone,
            password, // Store plain text for demo purposes
            is_admin: false,
            created_at: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveToStorage();
        this.currentUser = newUser;
        this.saveUserSession();
        this.showApp();
        this.updateUI();
        this.showToast(`Welcome to RailBook Pro, ${name}!`, 'success');
        console.log('User registered successfully:', name);
    }

    handleQuickSearch(e) {
        e.preventDefault();
        const from = document.getElementById('quickFromStation').value.trim();
        const to = document.getElementById('quickToStation').value.trim();
        const date = document.getElementById('quickTravelDate').value;
        
        if (!from || !to || !date) {
            this.showToast('Please fill all search fields', 'warning');
            return;
        }
        
        if (from === to) {
            this.showToast('From and To stations cannot be the same', 'error');
            return;
        }
        
        this.searchTrains(from, to, date);
        this.showSection('search');
    }

    searchTrains(from, to, date) {
        console.log('Searching trains:', from, to, date);
        console.log('Available trains in database:', this.trains.length);
        
        const results = this.trains.filter(train => {
            // Enhanced search logic - check both exact match and partial match
            const fromMatch = train.from_station === from || 
                             train.from_station.toLowerCase().includes(from.toLowerCase());
            const toMatch = train.to_station === to || 
                           train.to_station.toLowerCase().includes(to.toLowerCase());
            
            return fromMatch && toMatch && train.available_seats > 0;
        });
        
        console.log('Search results found:', results.length);
        this.currentSearchResults = results;
        this.updateSearchInfo(from, to, results.length);
        this.displaySearchResults(results);
    }

    updateSearchInfo(from, to, resultCount) {
        const searchInfo = document.getElementById('searchInfo');
        if (searchInfo) {
            searchInfo.innerHTML = `
                <p>Showing ${resultCount} trains from <strong>${from}</strong> to <strong>${to}</strong></p>
                <p>Total trains in database: ${this.trains.length}</p>
            `;
        }
    }

    displaySearchResults(trains) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (trains.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-train"></i>
                    <p>No trains found for this route.</p>
                    <p>Our database has ${this.trains.length} trains covering major Indian routes.</p>
                    <p>Try searching for different stations or check our popular routes.</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = trains.map(train => `
            <div class="train-card">
                <div class="train-header">
                    <div class="train-info">
                        <h3>${train.train_name}</h3>
                        <div class="train-number">${train.train_number}</div>
                    </div>
                    ${train.train_type ? `<div class="train-type-badge">${train.train_type}</div>` : ''}
                </div>
                
                <div class="train-route">
                    <div class="route-station">
                        <div class="station-name">${train.from_station}</div>
                        <div class="station-time">${train.departure_time}</div>
                    </div>
                    <div class="route-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="route-station">
                        <div class="station-name">${train.to_station}</div>
                        <div class="station-time">${train.arrival_time}</div>
                    </div>
                </div>
                
                <div class="train-details">
                    <div class="detail-item">
                        <div class="detail-value">${train.duration}</div>
                        <div class="detail-label">Duration</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${train.available_seats}</div>
                        <div class="detail-label">Available</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${train.total_seats}</div>
                        <div class="detail-label">Total Seats</div>
                    </div>
                </div>
                
                <div class="train-classes">
                    ${train.price_general > 0 ? `<div class="class-option">General: ₹${train.price_general}</div>` : ''}
                    ${train.price_sleeper > 0 ? `<div class="class-option">Sleeper: ₹${train.price_sleeper}</div>` : ''}
                    ${train.price_ac3 > 0 ? `<div class="class-option">AC 3T: ₹${train.price_ac3}</div>` : ''}
                    ${train.price_ac2 > 0 ? `<div class="class-option">AC 2T: ₹${train.price_ac2}</div>` : ''}
                    ${train.price_ac1 > 0 ? `<div class="class-option">AC 1T: ₹${train.price_ac1}</div>` : ''}
                </div>
                
                <div class="train-actions">
                    <div class="price-display">Starting from ₹${this.getLowestPrice(train)}</div>
                    <button class="btn btn--primary" onclick="app.selectTrain(${train.train_id})">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    getLowestPrice(train) {
        const prices = [train.price_general, train.price_sleeper, train.price_ac3, train.price_ac2, train.price_ac1]
            .filter(price => price > 0);
        return Math.min(...prices);
    }

    applyFiltersAndSort() {
        if (!this.currentSearchResults) return;
        
        let results = [...this.currentSearchResults];
        const sortBy = document.getElementById('sortBy').value;
        const classFilter = document.getElementById('classFilter').value;
        const trainTypeFilter = document.getElementById('trainTypeFilter').value;
        
        // Apply train type filter
        if (trainTypeFilter) {
            results = results.filter(train => train.train_type === trainTypeFilter);
        }
        
        // Apply class filter (check if the train has that class available)
        if (classFilter) {
            results = results.filter(train => {
                switch (classFilter) {
                    case 'GN': return train.price_general > 0;
                    case 'SL': return train.price_sleeper > 0;
                    case '3A': return train.price_ac3 > 0;
                    case '2A': return train.price_ac2 > 0;
                    case '1A': return train.price_ac1 > 0;
                    default: return true;
                }
            });
        }
        
        // Apply sorting
        results.sort((a, b) => {
            switch (sortBy) {
                case 'departure':
                    return a.departure_time.localeCompare(b.departure_time);
                case 'duration':
                    return parseFloat(a.duration) - parseFloat(b.duration);
                case 'price':
                    return this.getLowestPrice(a) - this.getLowestPrice(b);
                case 'availability':
                    return b.available_seats - a.available_seats;
                default:
                    return 0;
            }
        });
        
        this.displaySearchResults(results);
    }

    selectTrain(trainId) {
        this.selectedTrain = this.trains.find(t => t.train_id === trainId);
        if (!this.selectedTrain) {
            this.showToast('Train not found', 'error');
            return;
        }
        
        this.bookingData = {
            train: this.selectedTrain,
            passengers: 1,
            selectedClass: 'SL',
            passengerDetails: []
        };
        
        this.showBookingStep(1);
        this.showSection('booking');
        this.displaySelectedTrainInfo();
        this.displayClassOptions();
    }

    showBookingStep(step) {
        // Update progress indicators
        document.querySelectorAll('.progress-step').forEach((el, index) => {
            if (index + 1 <= step) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        
        // Show correct step
        document.querySelectorAll('.booking-step').forEach(el => el.classList.remove('active'));
        const stepEl = document.getElementById(`bookingStep${step}`);
        if (stepEl) {
            stepEl.classList.add('active');
        }
    }

    displaySelectedTrainInfo() {
        const train = this.selectedTrain;
        const infoEl = document.getElementById('selectedTrainInfo');
        if (!infoEl) return;
        
        infoEl.innerHTML = `
            <h3>${train.train_name} (${train.train_number})</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <strong>${train.from_station}</strong> ${train.departure_time} → 
                    <strong>${train.to_station}</strong> ${train.arrival_time}
                </div>
                <div><strong>Duration:</strong> ${train.duration}</div>
                ${train.train_type ? `<div><strong>Type:</strong> ${train.train_type}</div>` : ''}
            </div>
        `;
    }

    displayClassOptions() {
        const train = this.selectedTrain;
        const classData = [
            { code: 'GN', name: 'General', price: train.price_general, available: train.price_general > 0 },
            { code: 'SL', name: 'Sleeper', price: train.price_sleeper, available: train.price_sleeper > 0 },
            { code: '3A', name: 'AC 3-Tier', price: train.price_ac3, available: train.price_ac3 > 0 },
            { code: '2A', name: 'AC 2-Tier', price: train.price_ac2, available: train.price_ac2 > 0 },
            { code: '1A', name: 'AC 1-Tier', price: train.price_ac1, available: train.price_ac1 > 0 }
        ].filter(cls => cls.available);
        
        const classOptionsEl = document.getElementById('classOptions');
        if (!classOptionsEl) return;
        
        // Set default to first available class
        if (classData.length > 0) {
            this.bookingData.selectedClass = classData[0].code;
        }
        
        classOptionsEl.innerHTML = classData.map((cls, index) => `
            <div class="class-card ${index === 0 ? 'selected' : ''}" onclick="app.selectClass('${cls.code}')">
                <div class="class-name">${cls.name}</div>
                <div class="class-price">₹${cls.price}</div>
                <div class="class-availability">${Math.floor(train.available_seats * 0.25)} available</div>
            </div>
        `).join('');
    }

    selectClass(classCode) {
        this.bookingData.selectedClass = classCode;
        document.querySelectorAll('.class-card').forEach(el => el.classList.remove('selected'));
        event.target.closest('.class-card').classList.add('selected');
    }

    changePassengerCount(change) {
        const current = this.bookingData.passengers;
        const newCount = Math.max(1, Math.min(6, current + change));
        this.bookingData.passengers = newCount;
        const countEl = document.getElementById('passengerCount');
        if (countEl) {
            countEl.textContent = newCount;
        }
    }

    proceedToPassengerDetails() {
        this.showBookingStep(2);
        this.displayPassengerForms();
    }

    displayPassengerForms() {
        const container = document.getElementById('passengerForms');
        if (!container) return;
        
        const forms = [];
        
        for (let i = 0; i < this.bookingData.passengers; i++) {
            forms.push(`
                <div class="passenger-form">
                    <h4>Passenger ${i + 1}</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control" name="passenger_name_${i}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Age</label>
                            <input type="number" class="form-control" name="passenger_age_${i}" min="1" max="120" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Gender</label>
                            <select class="form-control" name="passenger_gender_${i}" required>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            `);
        }
        
        container.innerHTML = forms.join('');
    }

    handlePassengerDetails(e) {
        e.preventDefault();
        const passengers = [];
        
        for (let i = 0; i < this.bookingData.passengers; i++) {
            const name = document.querySelector(`[name="passenger_name_${i}"]`).value;
            const age = document.querySelector(`[name="passenger_age_${i}"]`).value;
            const gender = document.querySelector(`[name="passenger_gender_${i}"]`).value;
            
            if (!name || !age || !gender) {
                this.showToast('Please fill all passenger details', 'error');
                return;
            }
            
            passengers.push({ name, age: parseInt(age), gender });
        }
        
        this.bookingData.passengerDetails = passengers;
        this.showBookingStep(3);
        this.displayPaymentSummary();
    }

    displayPaymentSummary() {
        const train = this.selectedTrain;
        const classCode = this.bookingData.selectedClass;
        const passengers = this.bookingData.passengers;
        
        let price;
        let className;
        switch (classCode) {
            case 'GN': price = train.price_general; className = 'General'; break;
            case 'SL': price = train.price_sleeper; className = 'Sleeper'; break;
            case '3A': price = train.price_ac3; className = 'AC 3-Tier'; break;
            case '2A': price = train.price_ac2; className = 'AC 2-Tier'; break;
            case '1A': price = train.price_ac1; className = 'AC 1-Tier'; break;
            default: price = train.price_sleeper; className = 'Sleeper'; break;
        }
        
        const subtotal = price * passengers;
        const taxes = Math.round(subtotal * 0.05);
        const convenienceFee = Math.round(subtotal * 0.02);
        const total = subtotal + taxes + convenienceFee;
        
        const summaryEl = document.getElementById('paymentSummary');
        if (!summaryEl) return;
        
        summaryEl.innerHTML = `
            <h4>Booking Summary</h4>
            <div style="margin-bottom: 16px;">
                <strong>${train.train_name} (${train.train_number})</strong><br>
                ${train.from_station} → ${train.to_station}<br>
                Class: ${className} | Passengers: ${passengers}
            </div>
            <div style="border-top: 1px solid var(--color-card-border); padding-top: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Ticket Price (${passengers} × ₹${price})</span>
                    <span>₹${subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Service Tax (5%)</span>
                    <span>₹${taxes}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Convenience Fee (2%)</span>
                    <span>₹${convenienceFee}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; border-top: 1px solid var(--color-card-border); padding-top: 8px;">
                    <span>Total Amount</span>
                    <span style="color: var(--color-primary);">₹${total}</span>
                </div>
            </div>
        `;
        
        this.bookingData.totalAmount = total;
    }

    processPayment() {
        this.showLoading(true);
        
        // Simulate payment processing
        setTimeout(() => {
            this.showLoading(false);
            
            // Create booking
            const travelDateEl = document.getElementById('quickTravelDate');
            const travelDate = travelDateEl ? travelDateEl.value : new Date().toISOString().split('T')[0];
            
            const booking = {
                booking_id: this.nextBookingId++,
                user_id: this.currentUser.user_id,
                train_id: this.selectedTrain.train_id,
                pnr: this.generatePNR(),
                booking_date: new Date().toISOString(),
                travel_date: travelDate,
                passenger_count: this.bookingData.passengers,
                total_amount: this.bookingData.totalAmount,
                status: 'confirmed',
                class_type: this.bookingData.selectedClass,
                passengers: this.bookingData.passengerDetails
            };
            
            this.bookings.push(booking);
            
            // Update train availability
            const train = this.trains.find(t => t.train_id === this.selectedTrain.train_id);
            if (train) {
                train.available_seats = Math.max(0, train.available_seats - this.bookingData.passengers);
            }
            
            this.saveToStorage();
            this.showBookingStep(4);
            this.displayBookingConfirmation(booking);
            this.updateDashboardStats();
        }, 2000);
    }

    generatePNR() {
        return 'PNR' + Math.floor(Math.random() * 9000000000) + 1000000000;
    }

    displayBookingConfirmation(booking) {
        const train = this.trains.find(t => t.train_id === booking.train_id);
        const confirmEl = document.getElementById('bookingConfirmation');
        if (!confirmEl || !train) return;
        
        confirmEl.innerHTML = `
            <div style="background: var(--color-bg-3); border-radius: var(--radius-base); padding: var(--space-20); margin: var(--space-24) 0; border-left: 4px solid var(--color-success);">
                <h3>Booking Details</h3>
                <p><strong>PNR Number:</strong> ${booking.pnr}</p>
                <p><strong>Train:</strong> ${train.train_name} (${train.train_number})</p>
                <p><strong>Route:</strong> ${train.from_station} → ${train.to_station}</p>
                <p><strong>Date:</strong> ${new Date(booking.travel_date).toLocaleDateString()}</p>
                <p><strong>Class:</strong> ${this.getClassFullName(booking.class_type)}</p>
                <p><strong>Passengers:</strong> ${booking.passenger_count}</p>
                <p><strong>Total Amount:</strong> ₹${booking.total_amount}</p>
                <p><strong>Status:</strong> <span class="status status--success">Confirmed</span></p>
            </div>
        `;
    }

    getClassFullName(classCode) {
        const classNames = {
            'GN': 'General',
            'SL': 'Sleeper',
            '3A': 'AC 3-Tier',
            '2A': 'AC 2-Tier',
            '1A': 'AC 1-Tier'
        };
        return classNames[classCode] || classCode;
    }

    downloadTicket() {
        this.showToast('E-ticket download started', 'success');
        // In a real application, this would generate and download a PDF
    }

    goToBookingStep(step) {
        this.showBookingStep(step);
    }

    updatePasswordStrength(password) {
        const indicator = document.getElementById('passwordStrength');
        if (!indicator) return;
        
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        indicator.className = 'password-strength';
        if (strength >= 4) indicator.classList.add('strong');
        else if (strength >= 2) indicator.classList.add('medium');
        else if (strength >= 1) indicator.classList.add('weak');
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all sections
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
            sectionEl.classList.add('active');
        }
        this.currentSection = sectionId;
        
        // Load section-specific data
        if (sectionId === 'bookings') {
            this.loadBookings();
        } else if (sectionId === 'profile') {
            this.loadProfile();
        } else if (sectionId === 'admin') {
            this.loadAdminData();
        } else if (sectionId === 'dashboard') {
            this.updateDashboardStats();
            this.displayPopularRoutes();
        }
    }

    showApp() {
        console.log('Showing main app');
        const landing = document.getElementById('landing');
        const app = document.getElementById('app');
        
        if (landing) landing.classList.add('hidden');
        if (app) app.classList.remove('hidden');
        
        this.showSection('dashboard');
    }

    hideApp() {
        const landing = document.getElementById('landing');
        const app = document.getElementById('app');
        
        if (landing) landing.classList.remove('hidden');
        if (app) app.classList.add('hidden');
    }

    updateUI() {
        if (this.currentUser) {
            const userNameEl = document.getElementById('currentUserName');
            if (userNameEl) {
                userNameEl.textContent = this.currentUser.name;
            }
            
            if (this.currentUser.is_admin) {
                document.body.classList.add('admin-user');
            } else {
                document.body.classList.remove('admin-user');
            }
        }
    }

    updateDashboardStats() {
        if (!this.currentUser) return;
        
        const userBookings = this.bookings.filter(b => b.user_id === this.currentUser.user_id);
        const totalSpent = userBookings.reduce((sum, b) => sum + b.total_amount, 0);
        const upcomingTrips = userBookings.filter(b => 
            new Date(b.travel_date) > new Date() && b.status === 'confirmed'
        ).length;
        
        const totalBookingsEl = document.getElementById('totalBookings');
        const upcomingTripsEl = document.getElementById('upcomingTrips');
        const totalSpentEl = document.getElementById('totalSpent');
        const totalTrainsEl = document.getElementById('totalTrains');
        
        if (totalBookingsEl) totalBookingsEl.textContent = userBookings.length;
        if (upcomingTripsEl) upcomingTripsEl.textContent = upcomingTrips;
        if (totalSpentEl) totalSpentEl.textContent = `₹${totalSpent}`;
        if (totalTrainsEl) totalTrainsEl.textContent = `${this.trains.length}`;
    }

    loadBookings() {
        if (!this.currentUser) return;
        
        const userBookings = this.bookings.filter(b => b.user_id === this.currentUser.user_id);
        const container = document.getElementById('bookingsList');
        if (!container) return;
        
        if (userBookings.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-ticket-alt"></i>
                    <p>No bookings found. Book your first ticket now!</p>
                    <button class="btn btn--primary" onclick="app.showSection('search')">Search Trains</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = userBookings.map(booking => {
            const train = this.trains.find(t => t.train_id === booking.train_id);
            return `
                <div class="booking-card">
                    <div class="booking-header">
                        <div>
                            <div class="pnr-number">PNR: ${booking.pnr}</div>
                            <h3>${train ? train.train_name : 'Unknown Train'}</h3>
                        </div>
                        <div class="booking-status status-${booking.status}">
                            ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                    </div>
                    <div class="train-route">
                        <div class="route-station">
                            <div class="station-name">${train ? train.from_station : 'N/A'}</div>
                            <div class="station-time">${train ? train.departure_time : 'N/A'}</div>
                        </div>
                        <div class="route-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="route-station">
                            <div class="station-name">${train ? train.to_station : 'N/A'}</div>
                            <div class="station-time">${train ? train.arrival_time : 'N/A'}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; flex-wrap: wrap; gap: 16px;">
                        <div>
                            <strong>Travel Date:</strong> ${new Date(booking.travel_date).toLocaleDateString()}<br>
                            <strong>Class:</strong> ${this.getClassFullName(booking.class_type)} | 
                            <strong>Passengers:</strong> ${booking.passenger_count} | 
                            <strong>Amount:</strong> ₹${booking.total_amount}
                        </div>
                        <button class="btn btn--secondary btn--sm" onclick="app.downloadTicket()">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadProfile() {
        if (!this.currentUser) return;
        
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profilePhone = document.getElementById('profilePhone');
        
        if (profileName) profileName.value = this.currentUser.name;
        if (profileEmail) profileEmail.value = this.currentUser.email;
        if (profilePhone) profilePhone.value = this.currentUser.phone;
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        const name = document.getElementById('profileName').value;
        const phone = document.getElementById('profilePhone').value;
        
        this.currentUser.name = name;
        this.currentUser.phone = phone;
        
        // Update in users array
        const userIndex = this.users.findIndex(u => u.user_id === this.currentUser.user_id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.currentUser };
        }
        
        this.saveToStorage();
        this.saveUserSession();
        this.updateUI();
        this.showToast('Profile updated successfully', 'success');
    }

    loadAdminData() {
        this.loadTrainsTable();
        this.loadAllBookingsTable();
        this.loadUsersTable();
        this.loadAnalytics();
    }

    loadAnalytics() {
        const totalUsersEl = document.getElementById('totalUsers');
        const totalSystemTrainsEl = document.getElementById('totalSystemTrains');
        const totalStationsEl = document.getElementById('totalStations');
        const totalRevenueEl = document.getElementById('totalRevenue');
        
        const totalRevenue = this.bookings.reduce((sum, b) => sum + b.total_amount, 0);
        
        if (totalUsersEl) totalUsersEl.textContent = this.users.length;
        if (totalSystemTrainsEl) totalSystemTrainsEl.textContent = this.trains.length;
        if (totalStationsEl) totalStationsEl.textContent = this.stations.length;
        if (totalRevenueEl) totalRevenueEl.textContent = `₹${totalRevenue}`;
    }

    filterTrainsTable() {
        const searchInput = document.getElementById('trainSearchInput');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTrains = this.trains.filter(train =>
            train.train_name.toLowerCase().includes(searchTerm) ||
            train.train_number.toLowerCase().includes(searchTerm) ||
            train.from_station.toLowerCase().includes(searchTerm) ||
            train.to_station.toLowerCase().includes(searchTerm)
        );
        
        this.displayTrainsTable(filteredTrains);
    }

    displayTrainsTable(trains) {
        const container = document.getElementById('trainsTable');
        if (!container) return;
        
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Train Number</th>
                        <th>Name</th>
                        <th>Route</th>
                        <th>Type</th>
                        <th>Departure</th>
                        <th>Total Seats</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${trains.slice(0, 50).map(train => `
                        <tr>
                            <td>${train.train_number}</td>
                            <td>${train.train_name}</td>
                            <td>${train.from_station} → ${train.to_station}</td>
                            <td>${train.train_type || 'Express'}</td>
                            <td>${train.departure_time}</td>
                            <td>${train.total_seats}</td>
                            <td>${train.available_seats}</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn--secondary btn--sm" onclick="app.editTrain(${train.train_id})">Edit</button>
                                    <button class="btn btn--outline btn--sm" onclick="app.deleteTrain(${train.train_id})">Delete</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${trains.length > 50 ? `<p style="text-align: center; margin-top: 16px; color: var(--color-text-secondary);">Showing first 50 results of ${trains.length} trains</p>` : 
                `<p style="text-align: center; margin-top: 16px; color: var(--color-text-secondary);">Showing all ${trains.length} trains</p>`}
        `;
    }

    loadTrainsTable() {
        this.displayTrainsTable(this.trains);
        console.log(`Admin panel: Loading ${this.trains.length} trains`);
    }

    loadAllBookingsTable() {
        const container = document.getElementById('allBookingsTable');
        if (!container) return;
        
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>PNR</th>
                        <th>User</th>
                        <th>Train</th>
                        <th>Travel Date</th>
                        <th>Passengers</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.bookings.map(booking => {
                        const user = this.users.find(u => u.user_id === booking.user_id);
                        const train = this.trains.find(t => t.train_id === booking.train_id);
                        return `
                            <tr>
                                <td>${booking.pnr}</td>
                                <td>${user ? user.name : 'Unknown'}</td>
                                <td>${train ? train.train_name : 'Unknown'}</td>
                                <td>${new Date(booking.travel_date).toLocaleDateString()}</td>
                                <td>${booking.passenger_count}</td>
                                <td>₹${booking.total_amount}</td>
                                <td><span class="status status--${booking.status}">${booking.status}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    loadUsersTable() {
        const container = document.getElementById('usersTable');
        if (!container) return;
        
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Registered</th>
                        <th>Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.users.map(user => {
                        const userBookings = this.bookings.filter(b => b.user_id === user.user_id);
                        return `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td>${user.phone}</td>
                                <td>${user.is_admin ? 'Admin' : 'User'}</td>
                                <td>${new Date(user.created_at).toLocaleDateString()}</td>
                                <td>${userBookings.length}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    handleAddTrain(e) {
        e.preventDefault();
        
        const newTrain = {
            train_id: this.nextTrainId++,
            train_number: document.getElementById('trainNumber').value,
            train_name: document.getElementById('trainName').value,
            from_station: document.getElementById('trainFromStation').value,
            to_station: document.getElementById('trainToStation').value,
            departure_time: document.getElementById('departureTime').value,
            arrival_time: document.getElementById('arrivalTime').value,
            total_seats: parseInt(document.getElementById('totalSeats').value),
            available_seats: parseInt(document.getElementById('totalSeats').value),
            price_general: parseInt(document.getElementById('priceGeneral').value) || 0,
            price_sleeper: parseInt(document.getElementById('priceSleeper').value) || 0,
            price_ac3: parseInt(document.getElementById('priceAc3').value) || 0,
            price_ac2: parseInt(document.getElementById('priceAc2').value) || 0,
            price_ac1: parseInt(document.getElementById('priceAc1').value) || 0,
            train_type: document.getElementById('trainType').value,
            duration: this.calculateDuration(
                document.getElementById('departureTime').value, 
                document.getElementById('arrivalTime').value
            )
        };
        
        this.trains.push(newTrain);
        this.saveToStorage();
        this.hideModal('addTrainModal');
        this.loadTrainsTable();
        this.showToast('Train added successfully', 'success');
        
        // Clear form
        document.getElementById('addTrainForm').reset();
    }

    calculateDuration(departure, arrival) {
        const dep = new Date(`2000-01-01 ${departure}`);
        let arr = new Date(`2000-01-01 ${arrival}`);
        
        if (arr < dep) {
            arr.setDate(arr.getDate() + 1);
        }
        
        const diff = arr - dep;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
    }

    deleteTrain(trainId) {
        if (confirm('Are you sure you want to delete this train?')) {
            this.trains = this.trains.filter(t => t.train_id !== trainId);
            this.saveToStorage();
            this.loadTrainsTable();
            this.showToast('Train deleted successfully', 'success');
        }
    }

    editTrain(trainId) {
        this.showToast('Edit functionality will be available soon', 'info');
    }

    showAddTrainModal() {
        this.showModal('addTrainModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    switchTab(tab) {
        console.log('Switching to tab:', tab);
        document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        event.target.classList.add('active');
        
        const targetForm = document.getElementById(`${tab}Form`);
        if (targetForm) {
            targetForm.classList.add('active');
            console.log('Activated form:', `${tab}Form`);
        }
    }

    switchAdminTab(tab) {
        document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        
        const targetContent = document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Reload data when switching to analytics
        if (tab === 'analytics') {
            this.loadAnalytics();
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.currentUser = null;
            localStorage.removeItem('railbook_current_user');
            this.hideApp();
            document.body.classList.remove('admin-user');
            this.showToast('Logged out successfully', 'success');
        }
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            if (show) {
                loadingOverlay.classList.remove('hidden');
            } else {
                loadingOverlay.classList.add('hidden');
            }
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toastMessage');
        
        if (toast && messageEl) {
            toast.className = `toast ${type}`;
            messageEl.textContent = message;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
                this.hideToast();
            }, 4000);
        }
    }

    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('hidden');
        }
    }
}

// Initialize the application when DOM is loaded
let app;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing RailBook Pro...');
    app = new RailBookApp();
    app.init();
    
    // Make app globally available
    window.app = app;
});

// Global functions for event handlers
function switchTab(tab) {
    if (window.app) {
        window.app.switchTab(tab);
    }
}

function switchAdminTab(tab) {
    if (window.app) {
        window.app.switchAdminTab(tab);
    }
}

function showSection(section) {
    if (window.app) {
        window.app.showSection(section);
    }
}

function logout() {
    if (window.app) {
        window.app.logout();
    }
}

function showAddTrainModal() {
    if (window.app) {
        window.app.showAddTrainModal();
    }
}

function hideModal(modalId) {
    if (window.app) {
        window.app.hideModal(modalId);
    }
}

function changePassengerCount(change) {
    if (window.app) {
        window.app.changePassengerCount(change);
    }
}

function proceedToPassengerDetails() {
    if (window.app) {
        window.app.proceedToPassengerDetails();
    }
}

function goToBookingStep(step) {
    if (window.app) {
        window.app.goToBookingStep(step);
    }
}

function processPayment() {
    if (window.app) {
        window.app.processPayment();
    }
}

function downloadTicket() {
    if (window.app) {
        window.app.downloadTicket();
    }
}

function hideToast() {
    if (window.app) {
        window.app.hideToast();
    }
}

function filterTrainsTable() {
    if (window.app) {
        window.app.filterTrainsTable();
    }
}