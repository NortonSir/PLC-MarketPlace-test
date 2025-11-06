import { Category, PLCModule } from '../types';

// Mock data for Categories (for frontend fallback/development)
const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cpu',
    nameKey: 'category_cpu',
    descriptionKey: 'category_cpu_desc',
    icon: 'CpuIcon',
    children: [
      { id: 'cpu-siemens', nameKey: 'category_cpu_siemens', descriptionKey: 'category_cpu_siemens_desc', icon: 'CpuIcon', children: [
        { id: 'cpu-s7-1500', nameKey: 'category_cpu_s7_1500', descriptionKey: 'category_cpu_s7_1500_desc', icon: 'CpuIcon' },
        { id: 'cpu-s7-1200', nameKey: 'category_cpu_s7_1200', descriptionKey: 'category_cpu_s7_1200_desc', icon: 'CpuIcon' },
      ]},
      { id: 'cpu-rockwell', nameKey: 'category_cpu_rockwell', descriptionKey: 'category_cpu_rockwell_desc', icon: 'CpuIcon', children: [
        { id: 'cpu-controllogix', nameKey: 'category_cpu_controllogix', descriptionKey: 'category_cpu_controllogix_desc', icon: 'CpuIcon' },
        { id: 'cpu-compactlogix', nameKey: 'category_cpu_compactlogix', descriptionKey: 'category_cpu_compactlogix_desc', icon: 'CpuIcon' },
      ]},
    ],
  },
  {
    id: 'power',
    nameKey: 'category_power',
    descriptionKey: 'category_power_desc',
    icon: 'PowerSupplyIcon',
    children: [
      { id: 'power-ac-dc', nameKey: 'category_power_ac_dc', descriptionKey: 'category_power_ac_dc_desc', icon: 'PowerSupplyIcon' },
      { id: 'power-dc-dc', nameKey: 'category_power_dc_dc', descriptionKey: 'category_power_dc_dc_desc', icon: 'PowerSupplyIcon' },
    ],
  },
  {
    id: 'io',
    nameKey: 'category_io',
    descriptionKey: 'category_io_desc',
    icon: 'IoModuleIcon',
    children: [
      { id: 'io-digital', nameKey: 'category_io_digital', descriptionKey: 'category_io_digital_desc', icon: 'IoModuleIcon', children: [
        { id: 'io-digital-in', nameKey: 'category_io_digital_in', descriptionKey: 'category_io_digital_in_desc', icon: 'IoModuleIcon' },
        { id: 'io-digital-out', nameKey: 'category_io_digital_out', descriptionKey: 'category_io_digital_out_desc', icon: 'IoModuleIcon' },
      ]},
      { id: 'io-analog', nameKey: 'category_io_analog', descriptionKey: 'category_io_analog_desc', icon: 'IoModuleIcon', children: [
        { id: 'io-analog-in', nameKey: 'category_io_analog_in', descriptionKey: 'category_io_analog_in_desc', icon: 'IoModuleIcon' },
        { id: 'io-analog-out', nameKey: 'category_io_analog_out', descriptionKey: 'category_io_analog_out_desc', icon: 'IoModuleIcon' },
      ]},
    ],
  },
  {
    id: 'comm',
    nameKey: 'category_comm',
    descriptionKey: 'category_comm_desc',
    icon: 'CommunicationIcon',
  },
  {
    id: 'hmi',
    nameKey: 'category_hmi',
    descriptionKey: 'category_hmi_desc',
    icon: 'HmiIcon',
  },
  {
    id: 'misc',
    nameKey: 'category_misc',
    descriptionKey: 'category_misc_desc',
    icon: 'MiscIcon',
  },
];

// Mock data for PLC Modules (for frontend fallback/development)
const MOCK_MODULES: PLCModule[] = [
  {
    id: 'mod1',
    name: 'SIMATIC S7-1500 CPU 1511-1 PN',
    manufacturer: 'Siemens',
    price: 1200,
    condition: 'Used - Like New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?cpu,plc,siemens',
    categoryId: 'cpu-s7-1500',
    description: 'High-performance CPU for advanced control tasks. Integrated PROFINET interface.'
  },
  {
    id: 'mod2',
    name: 'Allen-Bradley ControlLogix 5580',
    manufacturer: 'Rockwell Automation',
    price: 3500,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?controllogix,plc,rockwell',
    categoryId: 'cpu-controllogix',
    description: 'Premium controller for large-scale applications. Redundancy capable.'
  },
  {
    id: 'mod3',
    name: 'SITOP PSU100C 24V/3A Stabilized Power Supply',
    manufacturer: 'Siemens',
    price: 150,
    condition: 'New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?power,supply,electronics',
    categoryId: 'power-ac-dc',
    description: 'Compact 24V DC power supply for industrial use. AC input.'
  },
  {
    id: 'mod4',
    name: 'Digital Input Module 16 DI 24VDC',
    manufacturer: 'Phoenix Contact',
    price: 90,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?digital,input,module',
    categoryId: 'io-digital-in',
    description: '16-channel digital input module, 24V DC compatible.'
  },
  {
    id: 'mod5',
    name: 'Analog Output Module 8 AO +/-10V',
    manufacturer: 'Schneider Electric',
    price: 220,
    condition: 'Used - Like New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?analog,output,module',
    categoryId: 'io-analog-out',
    description: '8-channel analog output module, +/-10V range.'
  },
  {
    id: 'mod6',
    name: 'Industrial Ethernet Switch SCALANCE X204-2',
    manufacturer: 'Siemens',
    price: 400,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?ethernet,switch,industrial',
    categoryId: 'comm',
    description: 'Managed Industrial Ethernet Switch with 4 ports.'
  },
  {
    id: 'mod7',
    name: 'HMI PanelView Plus 7 Standard',
    manufacturer: 'Rockwell Automation',
    price: 1800,
    condition: 'New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?hmi,display,panel',
    categoryId: 'hmi',
    description: '7-inch color display HMI for operator interface.'
  },
  {
    id: 'mod8',
    name: 'SIMATIC S7-1200 CPU 1214C DC/DC/Rly',
    manufacturer: 'Siemens',
    price: 650,
    condition: 'Used - Like New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?cpu,plc,siemens,s7-1200',
    categoryId: 'cpu-s7-1200',
    description: 'Compact controller for basic automation tasks.'
  },
  {
    id: 'mod9',
    name: 'Allen-Bradley CompactLogix 1769-L30ER',
    manufacturer: 'Rockwell Automation',
    price: 1500,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?compactlogix,plc,rockwell',
    categoryId: 'cpu-compactlogix',
    description: 'Integrated motion and safety capabilities.'
  },
  {
    id: 'mod10',
    name: 'DC/DC Converter 24V/5A',
    manufacturer: 'Murrelektronik',
    price: 80,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?dc,converter,electronics',
    categoryId: 'power-dc-dc',
    description: 'Efficient DC/DC converter for stable power.'
  },
  {
    id: 'mod11',
    name: 'Digital Output Module 8 DO 24VDC',
    manufacturer: 'Beckhoff',
    price: 70,
    condition: 'For Parts',
    imageUrl: 'https://source.unsplash.com/random/400x300/?digital,output,module',
    categoryId: 'io-digital-out',
    description: '8-channel digital output module, needs repair.'
  },
  {
    id: 'mod12',
    name: 'Analog Input Module 4 AI 4-20mA',
    manufacturer: 'ABB',
    price: 180,
    condition: 'New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?analog,input,module',
    categoryId: 'io-analog-in',
    description: '4-channel analog input module, 4-20mA current loop.'
  },
  {
    id: 'mod13',
    name: 'SITOP PSU300M 24V/10A Power Supply',
    manufacturer: 'Siemens',
    price: 250,
    condition: 'Used - Like New',
    imageUrl: 'https://source.unsplash.com/random/400x300/?power,supply,siemens',
    categoryId: 'power-ac-dc',
    description: 'Robust 24V DC power supply with wide input range.'
  },
  {
    id: 'mod14',
    name: 'SIMATIC S7-1500 Digital Input 32DI',
    manufacturer: 'Siemens',
    price: 180,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?digital,input,s7-1500',
    categoryId: 'io-digital-in',
    description: '32-channel digital input module for S7-1500 systems.'
  },
  {
    id: 'mod15',
    name: 'SIMATIC S7-1200 Digital Output 16DO',
    manufacturer: 'Siemens',
    price: 120,
    condition: 'Used - Good',
    imageUrl: 'https://source.unsplash.com/random/400x300/?digital,output,s7-1200',
    categoryId: 'io-digital-out',
    description: '16-channel digital output module for S7-1200 systems.'
  }
];


export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('/api/categories.php');
    const responseText = await response.text();

    if (!response.ok || !responseText.trim()) {
      const errorMessage = `Server responded with status: ${response.status} ${response.statusText || ''}. Response text: "${responseText.trim().substring(0, 100)}..."`;
      console.warn("Backend categories API failed, using mock categories. Error:", errorMessage);
      await new Promise(resolve => setTimeout(resolve, 500)); 
      return MOCK_CATEGORIES;
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError: any) {
      console.warn("Backend categories API returned invalid JSON, using mock categories. Error:", parseError.message, "Received text:", responseText.trim().substring(0, 100));
      await new Promise(resolve => setTimeout(resolve, 500)); 
      return MOCK_CATEGORIES;
    }
  } catch (error: any) {
    console.warn("Network error fetching categories, using mock categories. Error:", error.message);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return MOCK_CATEGORIES;
  }
};

export const fetchModules = async (categoryId?: string): Promise<PLCModule[]> => {
  try {
    const url = categoryId ? `/api/modules.php?categoryId=${categoryId}` : '/api/modules.php';
    const response = await fetch(url);
    const responseText = await response.text();

    if (!response.ok || !responseText.trim()) {
      const errorMessage = `Server responded with status: ${response.status} ${response.statusText || ''}. Response text: "${responseText.trim().substring(0, 100)}..."`;
      console.warn("Backend modules API failed, using mock modules. Error:", errorMessage);
      await new Promise(resolve => setTimeout(resolve, 500)); 
      if (categoryId) {
        return MOCK_MODULES.filter(module => module.categoryId === categoryId);
      }
      return MOCK_MODULES;
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError: any) {
      console.warn("Backend modules API returned invalid JSON, using mock modules. Error:", parseError.message, "Received text:", responseText.trim().substring(0, 100));
      await new Promise(resolve => setTimeout(resolve, 500)); 
      if (categoryId) {
        return MOCK_MODULES.filter(module => module.categoryId === categoryId);
      }
      return MOCK_MODULES;
    }
  } catch (error: any) {
    console.warn("Network error fetching modules, using mock modules. Error:", error.message);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    if (categoryId) {
      return MOCK_MODULES.filter(module => module.categoryId === categoryId);
    }
    return MOCK_MODULES;
  }
};

export const listModule = async (moduleData: Omit<PLCModule, 'id'>): Promise<PLCModule> => {
  try {
    const response = await fetch('/api/list-module.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleData),
    });
    const responseText = await response.text();

    if (!response.ok || !responseText.trim()) {
      const errorMessage = `Server responded with status: ${response.status} ${response.statusText || ''}. Response text: "${responseText.trim().substring(0, 100)}..."`;
      console.warn("Backend list module API failed, using mock listing. Error:", errorMessage);
      await new Promise(resolve => setTimeout(resolve, 500)); 
      const newModule: PLCModule = { ...moduleData, id: `mock-module-${Date.now()}` };
      return newModule;
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError: any) {
      console.warn("Backend list module API returned invalid JSON, using mock listing. Error:", parseError.message, "Received text:", responseText.trim().substring(0, 100));
      await new Promise(resolve => setTimeout(resolve, 500)); 
      const newModule: PLCModule = { ...moduleData, id: `mock-module-${Date.now()}` };
      return newModule;
    }
  } catch (error: any) {
    console.warn("Network error listing module, using mock listing. Error:", error.message);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const newModule: PLCModule = { ...moduleData, id: `mock-module-${Date.now()}` };
    return newModule;
  }
};