import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  DemoScenario,
  SubView,
  CustomerParcelInfo,
  UleoEvent,
} from '../types/logistics';
import {
  initialUleoEvents,
  mockCustomerParcels,
} from '../lib/mockData';

interface LogisticsContextType {
  role: UserRole | null;
  userEmail: string;
  scenario: DemoScenario;
  subView: SubView;
  isResolved: boolean;
  diagnosticMode: boolean;
  sidebarCollapsed: boolean;
  selectedNodeId: string | null;
  selectedParcelId: string;
  customerParcels: Record<string, CustomerParcelInfo>;
  uleoEvents: UleoEvent[];
  activeCrisesCount: number;
  slaHealth: number;
  worldModelNodesCount: number;
  notificationMessage: string | null;
  
  // Actions
  login: (email: string) => void;
  logout: () => void;
  setScenario: (scenario: DemoScenario) => void;
  setSubView: (view: SubView) => void;
  toggleDiagnosticMode: () => void;
  toggleSidebar: () => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setSelectedParcelId: (id: string) => void;
  resetDemo: () => void;
  approveAndExecuteRecovery: (optionId: string) => void;
  selectCustomerPivot: (parcelId: string, optionTitle: string) => void;
  dismissNotification: () => void;
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(undefined);

export const LogisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication & Role
  const [role, setRole] = useState<UserRole | null>('OPERATIONS_MANAGER');
  const [userEmail, setUserEmail] = useState<string>('ops.director@company.com');

  // Navigation & UI
  const [scenario, setScenarioState] = useState<DemoScenario>('scenario-2');
  const [subView, setSubView] = useState<SubView>('health_hub');
  const [diagnosticMode, setDiagnosticMode] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Resolution & Graph state
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Customer state
  const [selectedParcelId, setSelectedParcelId] = useState<string>('PARCEL#87');
  const [customerParcels, setCustomerParcels] = useState<Record<string, CustomerParcelInfo>>(
    JSON.parse(JSON.stringify(mockCustomerParcels))
  );

  // ULEO live feed state
  const [uleoEvents, setUleoEvents] = useState<UleoEvent[]>(initialUleoEvents);

  // System notification banner
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Compute metrics based on Scenario and Resolution
  let activeCrisesCount = 0;
  let slaHealth = 99.2;
  const worldModelNodesCount = 1450;

  if (scenario === 'scenario-1') {
    activeCrisesCount = 0;
    slaHealth = 99.4;
  } else if (scenario === 'scenario-2') {
    if (isResolved) {
      activeCrisesCount = 0;
      slaHealth = 98.6;
    } else {
      activeCrisesCount = 4;
      slaHealth = 62.0;
    }
  } else if (scenario === 'scenario-3') {
    activeCrisesCount = 2;
    slaHealth = 84.1;
  }

  // Auth
  const login = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    setUserEmail(trimmed);
    if (trimmed.endsWith('@company.com')) {
      setRole('OPERATIONS_MANAGER');
    } else {
      setRole('CUSTOMER');
    }
  };

  const logout = () => {
    setRole(null);
    setUserEmail('');
  };

  const setScenario = (newScenario: DemoScenario) => {
    setScenarioState(newScenario);
    setIsResolved(false);
    setSelectedNodeId(null);
    if (newScenario === 'scenario-3') {
      setSubView('validation_logger');
    } else if (newScenario === 'scenario-2') {
      setSubView('health_hub');
    }
    setNotificationMessage(`Demo switched to ${newScenario.replace('-', ' ').toUpperCase()}`);
  };

  const toggleDiagnosticMode = () => {
    setDiagnosticMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const resetDemo = () => {
    setScenarioState('scenario-2');
    setIsResolved(false);
    setSelectedNodeId(null);
    setCustomerParcels(JSON.parse(JSON.stringify(mockCustomerParcels)));
    setUleoEvents(initialUleoEvents);
    setSelectedParcelId('PARCEL#87');
    setDiagnosticMode(false);
    setNotificationMessage('Demo state successfully reset to default baseline.');
  };

  const approveAndExecuteRecovery = (optionId: string) => {
    setIsResolved(true);
    // Add resolution ULEO event
    const recoveryEvent: UleoEvent = {
      id: `uleo-${Date.now()}`,
      timestamp: new Date().toTimeString().split(' ')[0],
      legacySystem: 'Oracle-TMS',
      legacyRawString: `DISPATCH_BACKUP_VEHICLE_T08_RELAY_KM142_AUTH_EXEC[${optionId}]`,
      uleoEventName: 'EMERGENCY_DIVERSION_EXECUTED',
      entityId: 'TRUCK_T08',
      entityType: 'VEHICLE',
      preConditions: 'FLEET_T08_STAGED == TRUE && DRIVER_D18_CLEARED == TRUE',
      postConditions: 'ROUTE_RECALCULATED && PARCEL#87_SECURED',
      status: 'VALIDATED',
    };

    setUleoEvents(prev => [recoveryEvent, ...prev]);

    // Update customer parcel #87 status
    setCustomerParcels(prev => {
      const updated = { ...prev };
      if (updated['PARCEL#87']) {
        updated['PARCEL#87'] = {
          ...updated['PARCEL#87'],
          currentStepIndex: 4, // Delivery Resolved checkpoint
          plainStatusTitle: 'Recovery Vehicle T08 Dispatched — On Schedule',
          plainStatusBody: 'Backup refrigerated fleet vehicle T08 has secured your shipment at KM 142. Final delivery ETA confirmed for 5:15 PM.',
          whyCardExplanation: 'Thermal envelope strictly protected (4.2°C maintained). Transshipment executed in 18 minutes by automated fleet coordination.',
          isRecalculated: false,
        };
      }
      return updated;
    });

    setNotificationMessage('Action Executed: Backup Fleet Truck T08 dispatched. Network SLA recovered to 98.6%.');
  };

  const selectCustomerPivot = (parcelId: string, optionTitle: string) => {
    setCustomerParcels(prev => {
      const current = prev[parcelId];
      if (!current) return prev;
      return {
        ...prev,
        [parcelId]: {
          ...current,
          selectedPivotOption: optionTitle,
          plainStatusBody: `Update Confirmed: "${optionTitle}". Instructions routed directly to field dispatch.`,
        },
      };
    });

    // Add ULEO event for customer feedback loop
    const pivotEvent: UleoEvent = {
      id: `uleo-${Date.now()}`,
      timestamp: new Date().toTimeString().split(' ')[0],
      legacySystem: 'Shopify-Sync',
      legacyRawString: `CUST_PIVOT_REQUEST_${parcelId}_OPT[${optionTitle.substring(0, 20)}]`,
      uleoEventName: 'CUSTOMER_DESTINATION_MODIFIED',
      entityId: parcelId,
      entityType: 'PARCEL',
      preConditions: 'PARCEL_CAN_BE_REDIRECTED == TRUE',
      postConditions: 'DELIVERY_GEOFENCE_UPDATED',
      status: 'VALIDATED',
    };

    setUleoEvents(prev => [pivotEvent, ...prev]);
    setNotificationMessage(`Customer preference applied: ${optionTitle}`);
  };

  const dismissNotification = () => setNotificationMessage(null);

  return (
    <LogisticsContext.Provider
      value={{
        role,
        userEmail,
        scenario,
        subView,
        isResolved,
        diagnosticMode,
        sidebarCollapsed,
        selectedNodeId,
        selectedParcelId,
        customerParcels,
        uleoEvents,
        activeCrisesCount,
        slaHealth,
        worldModelNodesCount,
        notificationMessage,
        login,
        logout,
        setScenario,
        setSubView,
        toggleDiagnosticMode,
        toggleSidebar,
        setSelectedNodeId,
        setSelectedParcelId,
        resetDemo,
        approveAndExecuteRecovery,
        selectCustomerPivot,
        dismissNotification,
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics = () => {
  const context = useContext(LogisticsContext);
  if (!context) {
    throw new Error('useLogistics must be used within a LogisticsProvider');
  }
  return context;
};
