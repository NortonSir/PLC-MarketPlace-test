import { Category, PLCModule } from './types';
import { CpuIcon } from './components/icons/CpuIcon';
import { PowerSupplyIcon } from './components/icons/PowerSupplyIcon';
import { IoModuleIcon } from './components/icons/IoModuleIcon';
import { CommunicationIcon } from './components/icons/CommunicationIcon';
import { HmiIcon } from './components/icons/HmiIcon';
import { MiscIcon } from './components/icons/MiscIcon';

export const CATEGORIES: Category[] = [
  { 
    id: 'cpu', 
    nameKey: 'category_cpu', 
    descriptionKey: 'category_cpu_desc',
    icon: CpuIcon,
    children: [
      {
        id: 'cpu_siemens',
        nameKey: 'category_cpu_siemens',
        descriptionKey: 'category_cpu_siemens_desc',
        icon: CpuIcon,
        children: [
          { id: 'cpu_s7_1500', nameKey: 'category_cpu_s7_1500', descriptionKey: 'category_cpu_s7_1500_desc', icon: CpuIcon },
          { id: 'cpu_s7_1200', nameKey: 'category_cpu_s7_1200', descriptionKey: 'category_cpu_s7_1200_desc', icon: CpuIcon },
        ]
      },
      {
        id: 'cpu_rockwell',
        nameKey: 'category_cpu_rockwell',
        descriptionKey: 'category_cpu_rockwell_desc',
        icon: CpuIcon,
        children: [
           { id: 'cpu_controllogix', nameKey: 'category_cpu_controllogix', descriptionKey: 'category_cpu_controllogix_desc', icon: CpuIcon },
           { id: 'cpu_compactlogix', nameKey: 'category_cpu_compactlogix', descriptionKey: 'category_cpu_compactlogix_desc', icon: CpuIcon },
        ]
      }
    ]
  },
  { 
    id: 'power', 
    nameKey: 'category_power', 
    descriptionKey: 'category_power_desc',
    icon: PowerSupplyIcon,
    children: [
      { id: 'power_ac_dc', nameKey: 'category_power_ac_dc', descriptionKey: 'category_power_ac_dc_desc', icon: PowerSupplyIcon },
      { id: 'power_dc_dc', nameKey: 'category_power_dc_dc', descriptionKey: 'category_power_dc_dc_desc', icon: PowerSupplyIcon },
    ]
  },
  { 
    id: 'io', 
    nameKey: 'category_io', 
    descriptionKey: 'category_io_desc',
    icon: IoModuleIcon,
     children: [
      {
        id: 'io_digital',
        nameKey: 'category_io_digital',
        descriptionKey: 'category_io_digital_desc',
        icon: IoModuleIcon,
        children: [
          { id: 'io_digital_in', nameKey: 'category_io_digital_in', descriptionKey: 'category_io_digital_in_desc', icon: IoModuleIcon },
          { id: 'io_digital_out', nameKey: 'category_io_digital_out', descriptionKey: 'category_io_digital_out_desc', icon: IoModuleIcon },
        ]
      },
      {
        id: 'io_analog',
        nameKey: 'category_io_analog',
        descriptionKey: 'category_io_analog_desc',
        icon: IoModuleIcon,
        children: [
           { id: 'io_analog_in', nameKey: 'category_io_analog_in', descriptionKey: 'category_io_analog_in_desc', icon: IoModuleIcon },
           { id: 'io_analog_out', nameKey: 'category_io_analog_out', descriptionKey: 'category_io_analog_out_desc', icon: IoModuleIcon },
        ]
      }
    ]
  },
  { 
    id: 'comm', 
    nameKey: 'category_comm', 
    descriptionKey: 'category_comm_desc',
    icon: CommunicationIcon,
  },
  { 
    id: 'hmi', 
    nameKey: 'category_hmi', 
    descriptionKey: 'category_hmi_desc',
    icon: HmiIcon,
  },
  { 
    id: 'misc', 
    nameKey: 'category_misc', 
    descriptionKey: 'category_misc_desc',
    icon: MiscIcon,
  },
];

export const MOCK_MODULES: PLCModule[] = [
  {
    id: '1',
    name: 'SIMATIC S7-1500 CPU 1516-3 PN/DP',
    manufacturer: 'Siemens',
    price: 1850,
    condition: 'Used - Like New',
    imageUrl: 'https://picsum.photos/seed/plc1/400/300',
    categoryId: 'cpu_s7_1500',
    description: 'Powerful CPU for demanding applications with large program and data memory.'
  },
  {
    id: '2',
    name: 'Allen-Bradley 1756-L83E',
    manufacturer: 'Rockwell Automation',
    price: 2500,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/plc2/400/300',
    categoryId: 'cpu_controllogix',
    description: 'ControlLogix 5580 controller with 10MB user memory and EtherNet/IP port.'
  },
  {
    id: '3',
    name: 'SITOP PSU8200 24 V/20 A',
    manufacturer: 'Siemens',
    price: 450,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/plc3/400/300',
    categoryId: 'power_ac_dc',
    description: 'Stabilized power supply with wide-range input and high efficiency.'
  },
  {
    id: '4',
    name: '1769-IQ16 Compact I/O',
    manufacturer: 'Rockwell Automation',
    price: 220,
    condition: 'New',
    imageUrl: 'https://picsum.photos/seed/plc4/400/300',
    categoryId: 'io_digital_in',
    description: '16-point 24VDC sink/source digital input module for CompactLogix systems.'
  },
  {
    id: '5',
    name: 'CP 1543-1 Communications Processor',
    manufacturer: 'Siemens',
    price: 780,
    condition: 'Used - Like New',
    imageUrl: 'https://picsum.photos/seed/plc5/400/300',
    categoryId: 'comm',
    description: 'For connecting SIMATIC S7-1500 to Industrial Ethernet networks. Features security functions.'
  },
  {
    id: '6',
    name: 'Panelview Plus 7 2711P-T10C22D9P',
    manufacturer: 'Rockwell Automation',
    price: 2100,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/plc6/400/300',
    categoryId: 'hmi',
    description: '10.4-inch color touch screen HMI with standard performance and Windows CE.'
  },
    {
    id: '7',
    name: 'Modicon M340 BMXP342020',
    manufacturer: 'Schneider Electric',
    price: 1200,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/plc7/400/300',
    categoryId: 'cpu_s7_1200',
    description: 'High-performance processor for Modicon M340 platform.'
  },
  {
    id: '8',
    name: '1756-PA75 Power Supply',
    manufacturer: 'Rockwell Automation',
    price: 600,
    condition: 'Used - Like New',
    imageUrl: 'https://picsum.photos/seed/plc8/400/300',
    categoryId: 'power_ac_dc',
    description: '85-265V AC input, 10A @ 5.1V DC output for ControlLogix chassis.'
  }
];