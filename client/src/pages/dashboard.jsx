    import React, { useEffect, useState } from 'react';
    import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card";
    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table";
    import { Button } from "@/components/ui/button";
    import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

    const DashboardPage = () => {
    const [role, setRole] = useState('participant'); // Default role
    
    useEffect(() => {
        // Get role from URL query parameter
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        if (roleParam && ['admin', 'auctioneer', 'participant'].includes(roleParam)) {
        setRole(roleParam);
        }
    }, []);

    // Sample data
    const players = [
        {
        id: 1,
        name: "Xyz player",
        domain: "Baller/Batsman all rounder wicketkeeper",
        country: "Domestic Foreign",
        price: "₹xxxx"
        }
    ];

    const teams = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
    }));

    const renderParticipantView = () => (
        <>
        
        <div className="flex justify-between items-center mb-8">
            
            
            <h1 className="text-4xl font-bold">Participants</h1>
            <Card className="bg-gray-800/40 border-none backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
                <span className="text-lg text-gray-300">Available Balance :</span>
            </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white rounded-xl overflow-hidden shadow-xl transition-transform transform hover:scale-105">
            <CardContent className="flex items-center justify-center min-h-[400px] p-0">
                <p className="text-xl font-medium text-gray-800">
                Current player auctioning poster
                </p>
            </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-none backdrop-blur-sm shadow-xl transition-transform transform hover:scale-105">
            <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-xl text-gray-200">
                List of players bought by the team
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                        <TableHead className="text-gray-400 font-medium">S.no</TableHead>
                        <TableHead className="text-gray-400 font-medium">Player name</TableHead>
                        <TableHead className="text-gray-400 font-medium">Domain</TableHead>
                        <TableHead className="text-gray-400 font-medium">Country</TableHead>
                        <TableHead className="text-gray-400 font-medium">Bought at price</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell className="text-gray-300">{player.id}</TableCell>
                        <TableCell className="text-gray-300">{player.name}</TableCell>
                        <TableCell className="text-gray-300">{player.domain}</TableCell>
                        <TableCell className="text-gray-300">{player.country}</TableCell>
                        <TableCell className="text-gray-300">{player.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            </Card>
        </div>
        </>
    );

    const renderAuctioneerView = () => (
        <>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Auctioneer</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
            <Card className="bg-white rounded-xl overflow-hidden shadow-xl transition-transform transform hover:scale-105">
                <CardContent className="flex items-center justify-center min-h-[400px] p-0">
                <p className="text-xl font-medium text-gray-800">
                    Current player auctioning poster
                </p>
                </CardContent>
            </Card>
            <div className="flex justify-center space-x-4">
                <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 h-12 w-12 p-0">
                <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 h-12 w-12 p-0">
                <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
            </div>

            <Card className="bg-gray-900/50 border-none backdrop-blur-sm shadow-xl transition-transform transform hover:scale-105">
            <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-xl text-gray-200">Team Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="relative">
                <Input 
                    placeholder="Search team" 
                    className="bg-gray-800/50 border-gray-700 pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Team name</h3>
                <div className="flex justify-between items-center">
                    <span>Available Balance:</span>
                    <span className="text-blue-400">₹XXXXX</span>
                </div>
                </div>

                <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                    Confirm Bid
                </Button>
                <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500/10">
                    Cancel Auction
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>
        </>
    );

        const renderAdminView = () => (
            <>
            <h1 className="text-4xl font-bold mb-10 text-white ">Admin</h1>
        
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {teams.map((team) => (
                <Card
                    key={team.id}
                    className="bg-gray-900/60 border border-gray-700 shadow-lg backdrop-blur-md 
                            hover:bg-gray-800/60 cursor-pointer group transition-all duration-300 
                            transform hover:scale-105 rounded-2xl overflow-hidden"
                >
                    <CardContent className="p-6 flex items-center justify-center min-h-[150px]">
                    <h2 className="text-xl font-semibold text-gray-300 group-hover:text-white 
                                    transition-colors duration-300 tracking-wide text-center">
                        {team.name}
                    </h2>
                    </CardContent>
                </Card>
                ))}
            </div>
            </>
        );
        

    return (
        <div className="min-h-screen bg-[#0c1629] text-white relative overflow-hidden py-14" >
        {/* Background gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 pt-12 pb-8 relative z-10">
            {role === 'participant' && renderParticipantView()}
            {role === 'auctioneer' && renderAuctioneerView()}
            {role === 'admin' && renderAdminView()}
        </main>
        </div>
    );
    };

    export default DashboardPage;
