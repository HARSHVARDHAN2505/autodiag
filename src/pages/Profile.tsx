
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Car } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  lastScan: string;
}

const Profile = () => {
  const [owner] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    purchaseDate: "2023-05-15",
  });

  const [vehicles] = useState<Vehicle[]>([
    {
      id: "v1",
      name: "Honda Civic",
      model: "EX",
      year: 2020,
      licensePlate: "ABC-1234",
      lastScan: "2023-09-10",
    },
    {
      id: "v2",
      name: "Toyota Camry",
      model: "XLE",
      year: 2022,
      licensePlate: "XYZ-5678",
      lastScan: "2023-10-05",
    },
    {
      id: "v3",
      name: "Tesla Model 3",
      model: "Long Range",
      year: 2023,
      licensePlate: "EV-9101",
      lastScan: "2023-10-15",
    }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-1 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-diag-card border-zinc-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-zinc-700">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-zinc-800 text-diag-accent">{owner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-bold">{owner.name}</div>
                  <div className="text-sm text-zinc-400">{owner.email}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pt-2 border-t border-zinc-800 mt-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar size={16} className="text-diag-accent" />
                  <span className="text-sm">Purchase Date: {new Date(owner.purchaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Your Vehicles</h2>
        <div className="space-y-4">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
            >
              <Card className="bg-diag-card border-zinc-800 text-white hover:bg-diag-card/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-zinc-800">
                        <Car size={20} className="text-diag-accent" />
                      </div>
                      <div>
                        <div className="font-medium">{vehicle.name}</div>
                        <div className="text-sm text-zinc-400">
                          {vehicle.year} {vehicle.model} • {vehicle.licensePlate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-zinc-400">Last Scan</div>
                      <div className="text-sm">{new Date(vehicle.lastScan).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
