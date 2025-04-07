
interface DetailReading {
  name: string;
  value: string;
  status: string;
}

export interface DiagnosticData {
  id: string;
  system: string;
  status: string;
  message: string;
  details: DetailReading[];
  description: string;
}

// Mock data for different diagnostic systems
export function getDiagnosticById(id: string | undefined): DiagnosticData {
  const diagnosticData: Record<string, DiagnosticData> = {
    'engine-performance': {
      id: 'engine-performance',
      system: 'Engine Performance',
      status: 'normal',
      message: 'Operating within normal parameters',
      details: [
        { name: 'Engine RPM', value: '2500 rpm', status: 'normal' },
        { name: 'Fuel Efficiency', value: '28 mpg', status: 'normal' },
        { name: 'Engine Temperature', value: '82°C', status: 'normal' },
        { name: 'Throttle Response', value: 'Optimal', status: 'normal' },
        { name: 'Air Flow', value: '14.2 g/s', status: 'normal' }
      ],
      description: 'The engine is functioning optimally with all parameters within normal operating ranges. Regular maintenance has been performed according to schedule.'
    },
    'brake-system': {
      id: 'brake-system',
      system: 'Brake System',
      status: 'warning',
      message: 'Brake pad replacement recommended',
      details: [
        { name: 'Front Brake Pads', value: '15% remaining', status: 'warning' },
        { name: 'Rear Brake Pads', value: '42% remaining', status: 'normal' },
        { name: 'Brake Fluid', value: 'Level OK', status: 'normal' },
        { name: 'ABS System', value: 'Functioning', status: 'normal' },
        { name: 'Brake Lines', value: 'No leaks detected', status: 'normal' }
      ],
      description: 'The front brake pads are showing significant wear and should be replaced soon. Estimated life remaining: 1,500 miles. Rear brake pads and other brake components are functioning normally.'
    }
  };
  
  return diagnosticData[id || ''] || {
    id: id || 'unknown',
    system: 'Unknown System',
    status: 'normal',
    message: 'No information available',
    details: [],
    description: 'No detailed information is available for this system.'
  };
}
