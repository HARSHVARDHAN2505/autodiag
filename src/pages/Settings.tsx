
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    autoScan: false,
    darkMode: true,
    advancedMode: false,
    metricUnits: true,
    saveScans: true,
    autoConnect: true,
    debugMode: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = () => {
    // Here we would typically save settings to persistent storage
    // For now just show a toast
    toast({
      title: "Settings saved",
      description: "Your diagnostic settings have been updated"
    });
  };

  return (
    <motion.div
      className="space-y-6 pb-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">Diagnostic Settings</h1>
        <div className="ml-auto">
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSaveSettings}
            className="bg-diag-accent hover:bg-diag-accent/80"
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
        </div>
      </div>
      
      <Card className="bg-diag-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <SettingsIcon size={18} className="mr-2" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="font-medium">Notifications</Label>
              <p className="text-sm text-diag-muted">Receive alerts about diagnostic issues</p>
            </div>
            <Switch 
              id="notifications" 
              checked={settings.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoScan" className="font-medium">Auto-Scan</Label>
              <p className="text-sm text-diag-muted">Automatically scan when vehicle connects</p>
            </div>
            <Switch 
              id="autoScan" 
              checked={settings.autoScan}
              onCheckedChange={() => handleToggle('autoScan')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
              <p className="text-sm text-diag-muted">Use dark theme interface</p>
            </div>
            <Switch 
              id="darkMode" 
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="metricUnits" className="font-medium">Metric Units</Label>
              <p className="text-sm text-diag-muted">Use metric system (°C, km, kPa)</p>
            </div>
            <Switch 
              id="metricUnits" 
              checked={settings.metricUnits}
              onCheckedChange={() => handleToggle('metricUnits')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-diag-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="advancedMode" className="font-medium">Advanced Mode</Label>
              <p className="text-sm text-diag-muted">Show detailed technical information</p>
            </div>
            <Switch 
              id="advancedMode" 
              checked={settings.advancedMode}
              onCheckedChange={() => handleToggle('advancedMode')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="saveScans" className="font-medium">Save Scan History</Label>
              <p className="text-sm text-diag-muted">Keep record of all diagnostic scans</p>
            </div>
            <Switch 
              id="saveScans" 
              checked={settings.saveScans}
              onCheckedChange={() => handleToggle('saveScans')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoConnect" className="font-medium">Auto-Connect</Label>
              <p className="text-sm text-diag-muted">Automatically connect to recognized vehicles</p>
            </div>
            <Switch 
              id="autoConnect" 
              checked={settings.autoConnect}
              onCheckedChange={() => handleToggle('autoConnect')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="debugMode" className="font-medium">Debug Mode</Label>
              <p className="text-sm text-diag-muted">Enable advanced debugging features</p>
            </div>
            <Switch 
              id="debugMode" 
              checked={settings.debugMode}
              onCheckedChange={() => handleToggle('debugMode')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-diag-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <h3 className="font-medium">RenaultDiag+</h3>
            <p className="text-sm text-diag-muted">Version 1.2.0</p>
          </div>
          <p className="text-sm text-diag-muted">
            An advanced diagnostic system for Renault vehicles.
            All data is processed according to vehicle manufacturer specifications.
          </p>
        </CardContent>
      </Card>
      
      <Button 
        variant="outline" 
        className="w-full border-diag-muted/30 hover:bg-diag-muted/10"
        onClick={() => navigate('/dashboard')}
      >
        Return to Dashboard
      </Button>
    </motion.div>
  );
};

export default Settings;
