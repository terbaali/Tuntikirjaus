import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tuntikirjaus',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'duplicate-outline' : 'duplicate-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Kalenterinäkymä',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar-outline' : 'calendar-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
