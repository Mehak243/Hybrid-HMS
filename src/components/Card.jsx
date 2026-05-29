import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card({ title, subtitle, details, imageSource, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {imageSource && (
          <Image source={imageSource} style={styles.avatar} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {details && <Text style={styles.details}>{details}</Text>}
        </View>
      </View>
      {/* If there are buttons passed inside the card, they render here */}
      {children && <View style={styles.actionContainer}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9', // Very subtle border to make it pop
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 18, // Squircle shape
    backgroundColor: '#E0F2FE', // Light blue fallback background
    marginRight: 16,
  },
  textContainer: {
    flex: 1, // Takes up remaining space
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0EA5E9', // Modern vibrant blue
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  actionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9', // Clean divider line for buttons
    alignItems: 'flex-end',
  }
});