import React from 'react';

import { VStack } from '@suite-native/atoms';
import { Screen } from '@suite-native/navigation';

import { Assets } from '../components/Assets';
import { Transactions } from '../components/Transactions';
import { PortfolioGraph } from '../components/PortfolioGraph';
import { DashboardHeader } from '../components/DashboardHeader';

export const HomeScreen = () => (
    <Screen>
        <VStack spacing={40} padding="medium">
            <DashboardHeader />
            <PortfolioGraph />
            <Assets />
            <Transactions />
        </VStack>
    </Screen>
);
